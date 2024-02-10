import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreateRenderPipeline from "../record/create/rcdCreateRenderPipeline";
import wgi_GPURenderPipeline from "../recorder/driver/GPURenderPipeline";
import wgi_GPUShaderModule from "../recorder/driver/GPUShaderModule";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedGPUShaderModule from "./GPUShaderModule";
import TrackedBase from "./tracked";

interface GPURenderPipelineSnapshotStencil {
    compare: GPUCompareFunction;
    failOp: GPUStencilOperation;
    depthFailOp: GPUStencilOperation;
    passOp: GPUStencilOperation;
}

interface GPURenderPipelineSnapshotBlend {
    operation: GPUBlendOperation;
    srcFactor: GPUBlendFactor;
    dstFactor: GPUBlendFactor;
}

interface GPURenderPipelineSnapshot {
    label: string;
    device: UniversalResourceId;
    layout: GPUAutoLayoutMode | UniversalResourceId;

    // shaders
    vsModule: UniversalResourceId;
    vsEntryPoint?: string;
    vsConstants?: {[key: string]: any};
    fsModule?: UniversalResourceId;
    fsEntryPoint?: string;
    fsConstants?: {[key: string]: any};

    // vb
    vbs: Array<{
        arrayStride: number;
        stepMode: GPUVertexStepMode;
        attributes: Array<{
            format: GPUVertexFormat;
            offset: number;
            shaderLocation: number;
        }>;
    }>;

    // targets
    targets: Array<{
        blend: {
            alpha: GPURenderPipelineSnapshotBlend;
            color: GPURenderPipelineSnapshotBlend;
        },
        format: GPUTextureFormat;
        writeMask: number;
    }>;

    // depthStencil
    depthBias: number;
    depthBiasClamp: number;
    depthBiasSlopeScale: number;
    depthCompare: GPUCompareFunction;
    depthWriteEnabled: boolean;
    depthStencilFormat: GPUTextureFormat; // depthStencil texture format this pipeline will be compatible with
    stencilBack: GPURenderPipelineSnapshotStencil;
    stencilFront: GPURenderPipelineSnapshotStencil;
    stencilReadMask: number;
    stencilWriteMask: number;

    // primitive
    topology: GPUPrimitiveTopology;
    cullMode: GPUCullMode;
    frontFace: GPUFrontFace;
    stripIndexFormat?: GPUIndexFormat;

    // multisample
    sampleCount: number;
    sampleMask: number;
    alphaToCoverageEnabled: boolean;
}

export default class TrackedGPURenderPipeline extends TrackedBase<TrackedGPURenderPipeline> {
    __kind = brandMap.GPURenderPipeline;
    __authentic?: GPURenderPipeline;
    __snapshot?: GPURenderPipelineSnapshot;
    __initialSnapshot?: GPURenderPipelineSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: RcdCreateRenderPipeline;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPURenderPipeline {
        return this.fastFromAuthentic(authentic, TrackedGPURenderPipeline);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPURenderPipelineSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.device, encoder) as TrackedGPUDevice;
        this.__authentic = this.__creator!.__authentic!.createRenderPipeline({
            label: s.label,
            layout: "auto", // FIXME: use real layout
            vertex: {
                module: (await profile.getOrRestore<TrackedGPUShaderModule>(s.vsModule, encoder)).__authentic!,
                entryPoint: s.vsEntryPoint,
                constants: s.vsConstants,
                buffers: s.vbs
            },
            fragment: s.fsModule ? {
                module: (await profile.getOrRestore<TrackedGPUShaderModule>(s.fsModule, encoder)).__authentic!,
                entryPoint: s.fsEntryPoint,
                constants: s.fsConstants,
                targets: s.targets
            } : undefined,
            depthStencil: {
                depthBias: s.depthBias,
                depthBiasClamp: s.depthBiasClamp,
                depthBiasSlopeScale: s.depthBiasSlopeScale,
                depthCompare: s.depthCompare,
                depthWriteEnabled: s.depthWriteEnabled,
                format: s.depthStencilFormat,
                stencilBack: s.stencilBack,
                stencilFront: s.stencilFront,
                stencilReadMask: s.stencilReadMask,
                stencilWriteMask: s.stencilWriteMask
            },
            primitive: {
                topology: s.topology,
                cullMode: s.cullMode,
                frontFace: s.frontFace,
                stripIndexFormat: s.stripIndexFormat
            },
            multisample: {
                count: s.sampleCount,
                mask: s.sampleMask,
                alphaToCoverageEnabled: s.alphaToCoverageEnabled
            }
        });
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        let desc!: GPURenderPipelineDescriptor;
        if (this.isReplayMode()) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            } else {
                desc = this.__creatorRcd!.args[0];
            }
        } else {
            desc = (this.__authentic as wgi_GPURenderPipeline).desc;
        }
        const s: Partial<GPURenderPipelineSnapshot> = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPURenderPipeline).device.__id,
            layout: "auto", // FIXME: use real layout
            vsModule: (desc.vertex.module as wgi_GPUShaderModule).__id,
            vsEntryPoint: desc.vertex.entryPoint,
            vsConstants: desc.vertex.constants
        };

        const vbs: GPURenderPipelineSnapshot["vbs"] = [];
        if (desc.vertex.buffers) {
            for (const buffer of desc.vertex.buffers) {
                if (buffer !== null) {
                    vbs.push({
                        arrayStride: buffer.arrayStride,
                        stepMode: buffer.stepMode ?? "vertex",
                        attributes: []
                    });
                    for (const attr of buffer.attributes) {
                        vbs[vbs.length - 1].attributes.push(attr);
                    }
                }
            }
        }
        s.vbs = vbs;

        if (desc.fragment) {
            s.fsModule = (desc.fragment.module as wgi_GPUShaderModule).__id;
            s.fsEntryPoint = desc.fragment.entryPoint;
            s.fsConstants = desc.fragment.constants;
            const targets: GPURenderPipelineSnapshot["targets"] = [];
            for (const target of desc.fragment.targets) {
                if (target) {
                    const defaultBlendComp: GPURenderPipelineSnapshot["targets"]["0"]["blend"]["alpha"] = {
                        operation: "add",
                        srcFactor: "one",
                        dstFactor: "zero"
                    };
                    targets.push({
                        format: target.format,
                        writeMask: target.writeMask ?? GPUColorWrite.ALL,
                        blend: target.blend ? {
                            alpha: {
                                ...defaultBlendComp,
                                ...(target.blend.alpha ?? {})
                            },
                            color: {
                                ...defaultBlendComp,
                                ...(target.blend.color ?? {})
                            },
                        } : {
                            alpha: defaultBlendComp,
                            color: defaultBlendComp,
                        }
                    });
                }
            }
            s.targets = targets;
        } else {
            s.targets = [];
        }

        const defaultStacilState: GPURenderPipelineSnapshotStencil = {
            compare: "always",
            failOp: "keep",
            depthFailOp: "keep",
            passOp: "keep"
        };
        const defaultDepthStencil: Partial<GPURenderPipelineSnapshot> = {
            depthBias: 0,
            depthBiasClamp: 0,
            depthBiasSlopeScale: 0,
            depthWriteEnabled: false,
            depthCompare: "always",
            stencilReadMask: 0xFFFFFFFF,
            stencilWriteMask: 0xFFFFFFFF
        };
        if (desc.depthStencil) {
            const ds = desc.depthStencil;
            
            Object.assign(s, defaultDepthStencil, ds);
            
            s.stencilBack = {
                ...defaultStacilState,
                ...(ds.stencilBack ?? {})
            };
            s.stencilFront = {
                ...defaultStacilState,
                ...(ds.stencilBack ?? {})
            }
        } else {
            Object.assign(s, defaultDepthStencil);
        }

        const defaultPrimive: Partial<GPURenderPipelineSnapshot> = {
            topology: "triangle-list",
            frontFace: "ccw",
            cullMode: "none"
        };
        if (desc.primitive) {
            Object.assign(s, defaultPrimive, desc.primitive);
        } else {
            Object.assign(s, defaultPrimive);
        }

        const defaultMultisample: Partial<GPURenderPipelineSnapshot> = {
            sampleCount: 1,
            sampleMask: 0xFFFFFFFF,
            alphaToCoverageEnabled: false
        };

        if (desc.multisample) {
            Object.assign(s, defaultMultisample, desc.multisample);
        } else {
            Object.assign(s, defaultMultisample);
        }
        this.__snapshot = s as GPURenderPipelineSnapshot;
    }
    public getDeps(): wgi_GPUBase[] {
        const authentic = this.__authentic! as wgi_GPURenderPipeline;
        const deps = [ authentic.device, authentic.desc.vertex.module as wgi_GPUShaderModule ];
        if (authentic.desc.fragment) {
            deps.push(authentic.desc.fragment.module as wgi_GPUShaderModule)
        }
        return deps;
    }
}
