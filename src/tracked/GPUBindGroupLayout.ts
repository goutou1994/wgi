import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import type RcdCreateBindGroupLayout from "../record/device/rcdCreateBindGroupLayout";
import type RcdGetBindGroupLayout from "../record/pipeline/RcdGetBindGroupLayout";
import wgi_GPUBindGroupLayout from "../recorder/driver/GPUBindGroupLayout";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import type TrackedGPUDevice from "./GPUDevice";
import type TrackedGPURenderPipeline from "./GPURenderPipeline";
import TrackedBase from "./tracked";

interface GPUBindGroupLayoutSnapshot {
    label: string;
    creator: UniversalResourceId;
    source: "device" | "pipeline";
    pipelineBindGroupIndex?: number;
    entries: Array<{
        binding: number;
        visibility: GPUShaderStageFlags;
        type: "buffer" | "externalTexture" | "sampler" | "storageTexture" | "texture";
        resourceLayout: /*buffer*/{
            hasDynamicOffset: boolean;
            minBindingSize: number;
            type: GPUBufferBindingType;
        } |
        /*externalTexture*/ {} |
        /*sampler*/ {
            type: GPUSamplerBindingType;
        } |
        /*storageTexture*/ {
            access: GPUStorageTextureAccess;
            format: GPUTextureFormat;
            viewDimension: GPUTextureViewDimension;
        } |
        /*texture*/ {
            sampleType: GPUTextureSampleType;
            viewDimension: GPUTextureViewDimension;
            multisampled: boolean;
        }
    }>
};

export default class TrackedGPUBindGroupLayout extends TrackedBase<TrackedGPUBindGroupLayout> {
    __kind = brandMap.GPUBindGroupLayout;
    __authentic?: GPUBindGroupLayout;
    __snapshot?: GPUBindGroupLayoutSnapshot;
    __initialSnapshot?: GPUBindGroupLayoutSnapshot;
    __creator?: TrackedGPUDevice | TrackedGPURenderPipeline;
    __creatorRcd?: RcdCreateBindGroupLayout | RcdGetBindGroupLayout;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUBindGroupLayout {
        return this.fastFromAuthentic(authentic, TrackedGPUBindGroupLayout);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPUBindGroupLayoutSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        if (s.source === "device") {
            this.__creator = await profile.getOrRestore(s.creator, encoder) as TrackedGPUDevice;
            this.__authentic = this.__creator!.__authentic!.createBindGroupLayout({
                label: s.label,
                entries: s.entries.map(e => ({
                    binding: e.binding,
                    visibility: e.visibility,
                    buffer: e.type === "buffer" ? e.resourceLayout as GPUBufferBindingLayout : undefined,
                    externalTexture: e.type === "externalTexture" ? e.resourceLayout as GPUExternalTextureBindingLayout : undefined,
                    sampler: e.type === "sampler" ? e.resourceLayout as GPUSamplerBindingLayout : undefined,
                    storageTexture: e.type === "storageTexture" ? e.resourceLayout as GPUStorageTextureBindingLayout : undefined,
                    texture: e.type === "texture" ? e.resourceLayout as GPUTextureBindingLayout : undefined,
                }))
            });
        } else {
            this.__creator = await profile.getOrRestore(s.creator, encoder) as TrackedGPURenderPipeline;
            this.__authentic = this.__creator!.__authentic!.getBindGroupLayout(s.pipelineBindGroupIndex!);
        }
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        let desc!: GPUBindGroupLayoutDescriptor | number;
        if (this.isReplayMode()) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            } else {
                desc = this.__creatorRcd!.args[0];
            }
        } else {
            desc = (this.__authentic as wgi_GPUBindGroupLayout).desc;
        }

        this.__snapshot = {
            label: this.__authentic!.label,
            creator: this.__creator?.__id ?? (this.__authentic as wgi_GPUBindGroupLayout).creator.__id,
            source: "device",
            entries: []
        };

        if (typeof desc === "number") {
            // created by pipeline.getBindGroupLayout()
            this.__snapshot.source = "pipeline";
            this.__snapshot.pipelineBindGroupIndex = desc;
            return;
        }

        // created by device.createBindGroupLayout()
        for (const e of desc.entries) {
            const type: any = ["buffer", "externalTexture", "sampler", "storageTexture", "texture"].find(t => (e as any)[t]);
            if (!type) continue;
            let resourceLayout!: GPUBindGroupLayoutSnapshot["entries"][0]["resourceLayout"];
            if (type === "buffer") {
                resourceLayout= {
                    hasDynamicOffset: e.buffer!.hasDynamicOffset ?? false,
                    minBindingSize: e.buffer!.minBindingSize ?? 0,
                    type: e.buffer!.type ?? "uniform"
                };
            } else if (type === "externalTexture") {
                resourceLayout = {};
            } else if (type === "sampler") {
                resourceLayout = {
                    type: e.sampler!.type ?? "filtering"
                };
            } else if (type === "storageTexture") {
                resourceLayout = {
                    access: e.storageTexture!.access ?? "write-only",
                    format: e.storageTexture!.format,
                    viewDimension: e.storageTexture!.viewDimension ?? "2d"
                };
            } else if (type === "texture") {
                resourceLayout = {
                    multisampled: e.texture!.multisampled ?? false,
                    sampleType: e.texture!.sampleType ?? "float",
                    viewDimension: e.texture!.viewDimension ?? "2d"
                };
            }
            this.__snapshot!.entries.push({
                binding: e.binding,
                visibility: e.visibility,
                type,
                resourceLayout
            });
        }
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUBindGroupLayout).creator ];
    }
}
