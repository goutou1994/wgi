import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdBeginRenderPass from "../record/encoder/rcdBeginRenderPass";
import type wgi_GPURenderPassEncoder from "../recorder/driver/GPURenderPassEncoder";
import type wgi_GPUTextureView from "../recorder/driver/GPUTextureView";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUBindGroup from "./GPUBindGroup";
import type TrackedGPUBuffer from "./GPUBuffer";
import TrackedGPUCommandEncoder from "./GPUCommandEncoder";
import TrackedGPURenderPipeline from "./GPURenderPipeline";
import TrackedBase from "./tracked";

interface GPURenderPassEncoderSnapshot {
    label: string;
    encoder: UniversalResourceId;

    // desc
    colorAttachments: Array<GPURenderPassColorAttachment & {
        view: UniversalResourceId;
        resolveTarget?: UniversalResourceId;
    }>;
    depthStencilAttachment?: GPURenderPassDepthStencilAttachment & {
        view: UniversalResourceId;
    };
    occlusionQuerySet: undefined; // not supported
    timestampWrites: undefined; // not supported
    maxDrawCount: number;
}

/**
 * Used by replay.
 */
export interface GPURenderPassEncoderRuntime {
    pipeline?: TrackedGPURenderPipeline;
    vbs: {
        [binding: number]: {
            buffer: TrackedGPUBuffer;
            offset: number;
            size: number;
        }
    };
    ib?: {
        buffer: TrackedGPUBuffer;
        format: GPUIndexFormat;
        offset: number;
        size: number;
    };
    bindGroups: {
        [index: number]: {
            bindGroup: TrackedGPUBindGroup,
            dynamicOffsets: Array<number> | undefined;
        }
    };
}

export default class TrackedGPURenderPassEncoder extends TrackedBase<TrackedGPURenderPassEncoder> {
    __kind = brandMap.GPURenderPassEncoder;
    __authentic?: GPURenderPassEncoder;
    __snapshot?: GPURenderPassEncoderSnapshot;
    __initialSnapshot?: GPURenderPassEncoderSnapshot;
    __creator?: TrackedGPUCommandEncoder;
    __creatorRcd?: RcdBeginRenderPass;
    __runtime?: GPURenderPassEncoderRuntime;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPURenderPassEncoder {
        return this.fastFromAuthentic(authentic, TrackedGPURenderPassEncoder);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPURenderPassEncoderSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        // it's impossible to restore a RenderPassEncoder.
        console.assert(false);

        // const s = this.__initialSnapshot!;
        // this.__creator = await profile.getOrRestore(s.encoder, encoder);

        // const colors = [];
        // for (const color of s.colorAttachments) {
        //     const view = (await profile.getOrRestore(color.view, encoder)).__authentic!;
        //     const resolveTarget = color.resolveTarget ? (await profile.getOrRestore(color.resolveTarget, encoder)).__authentic! : undefined;
        //     colors.push({
        //         ...color,
        //         view,
        //         resolveTarget
        //     });
        // }
        // let depth = undefined;
        // if (s.depthStencilAttachment) {
        //     depth = {
        //         ...s.depthStencilAttachment,
        //         view: (await profile.getOrRestore(s.depthStencilAttachment.view, encoder)).__authentic!
        //     };
        // }

        // this.__authentic = this.__creator.__authentic!.beginRenderPass({
        //     ...s,
        //     colorAttachments: colors,
        //     depthStencilAttachment: depth,
        //     occlusionQuerySet: undefined,
        //     timestampWrites: undefined
        // });
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        let encoder_id: UniversalResourceId;
        let desc: any;
        if (profile) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            encoder_id = this.__creator!.__id;
            desc = this.__creatorRcd!.args[0];
        } else {
            encoder_id = (this.__authentic as wgi_GPURenderPassEncoder).__id;
            desc = (this.__authentic as wgi_GPURenderPassEncoder).desc;
        }
        desc = RcdBeginRenderPass.prototype.transformArgs(
            [desc],
            (tracked: TrackedBase<any>) => tracked.__id
        )[0];

        for (const att of desc.colorAttachments) {
            att.clearValue = att.clearValue ?? [0, 0, 0, 0];
            if (att.clearValue.r !== undefined) {
                att.clearValue = [att.clearValue.r, att.clearValue.g, att.clearValue.b, att.clearValue.a];
            }
        }

        this.__snapshot = {
            ...desc,
            label: this.__authentic!.label,
            encoder: encoder_id,
            maxDrawCount: desc.maxDrawCount ?? 50000000
        };
    }
    public getDeps(): wgi_GPUBase[] {
        const deps: wgi_GPUBase[] = [(this.__authentic! as wgi_GPURenderPassEncoder).encoder];
        const desc = (this.__authentic! as wgi_GPURenderPassEncoder).desc;
        for (const color of desc.colorAttachments) {
            if (color) {
                deps.push(color.view as wgi_GPUTextureView);
                if (color.resolveTarget) {
                    deps.push(color.resolveTarget as wgi_GPUTextureView);
                }
            }
        }
        if (desc.depthStencilAttachment) {
            deps.push(desc.depthStencilAttachment.view as wgi_GPUTextureView);
        }
        return deps;
    }

    public override deleteSnapshot(): void {
        this.__snapshot = undefined;
        this.__runtime = {
            vbs: {},
            bindGroups: {}
        };
    }
}
