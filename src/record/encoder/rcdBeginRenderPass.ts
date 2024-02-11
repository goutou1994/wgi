import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import TrackedGPUTextureView from "../../tracked/GPUTextureView";
import TrackedBase from "../../tracked/tracked";
import RcdBase, { RecordKind } from "../rcd";

type GPUBeginRenderPassArgs = [{
    colorAttachments: Array<GPURenderPassColorAttachment & {
        view: TrackedGPUTextureView;
        resolveTarget?: TrackedGPUTextureView;
    }>;
    depthStencilAttachment?: GPURenderPassDepthStencilAttachment & {
        view: TrackedGPUTextureView;
    };
    occlusionQuerySet: undefined; // not supported
    timestampWrites: undefined; // not supported
    maxDrawCount?: number;
}];

export default class RcdBeginRenderPass extends RcdBase<TrackedGPUCommandEncoder, GPUBeginRenderPassArgs, TrackedGPURenderPassEncoder> {
    __kind = RecordKind.BeginRenderPass;
    public play(): TrackedGPURenderPassEncoder {
        const desc = this.transformArgs(this.args, (tracked: TrackedBase<any>) => tracked.__authentic!) as [GPURenderPassDescriptor];
        const pass = this.caller!.__authentic!.beginRenderPass(desc[0]);
        this.ret!.__authentic = pass;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        const desc = this.transformArgs(this.args, (tracked: TrackedBase<any>) => tracked.__id);

        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, desc);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUCommandEncoder, GPUBeginRenderPassArgs, TrackedGPURenderPassEncoder> {
        const encoder_id = ds.read<number>(DataStream.Type.UInt32);
        const rawDesc = deserializeObject(ds) as any;
        const ret_id = ds.read<number>(DataStream.Type.UInt32);
        const tracked = new TrackedGPURenderPassEncoder();
        tracked.__id = ret_id;

        const desc = this.transformArgs(rawDesc, (id: UniversalResourceId) => profile.get(id)) as any;

        return new RcdBeginRenderPass(
            desc,
            profile.get<TrackedGPUCommandEncoder>(encoder_id),
            profile.get<TrackedGPURenderPassEncoder>(ret_id)
        );
    }
    
    public transformArgs(args: any, transformer: (obj: any) => any): GPUBeginRenderPassArgs {
        const desc = {
            ...args[0],
            colorAttachments: []
        } as any;
        args[0].colorAttachments.forEach((att: any) => {
            desc.colorAttachments.push({
                ...att,
                view: transformer(att.view)
            });
            if (att.resolveTarget) {
                desc.colorAttachments[desc.colorAttachments.length - 1].resolveTarget = transformer(att.resolveTarget);
            }
        });
        if (args[0].depthStencilAttachment) {
            desc.depthStencilAttachment = {
                ...args[0].depthStencilAttachment,
                view: transformer(args[0].depthStencilAttachment.view)
            };
        }
        return [desc];
    }
}
