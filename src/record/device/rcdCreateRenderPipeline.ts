import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import wgi_GPUShaderModule from "../../recorder/driver/GPUShaderModule";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUPipelineLayout from "../../tracked/GPUPipelineLayout";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import TrackedGPUShaderModule from "../../tracked/GPUShaderModule";
import TrackedBase from "../../tracked/tracked";
import RcdBase, { RecordKind } from "../rcd";

type RcdCreateRenderPipelineArgs = [GPURenderPipelineDescriptor & {
    layout: "auto" | TrackedGPUPipelineLayout,
    vertex: GPURenderPipelineDescriptor["vertex"] & {
        module: TrackedGPUShaderModule
    },
    fragment?: GPURenderPipelineDescriptor["fragment"] & {
        module: TrackedGPUShaderModule
    }
}];

export default class RcdCreateRenderPipeline extends RcdBase<TrackedGPUDevice, RcdCreateRenderPipelineArgs, TrackedGPURenderPipeline> {
    __kind = RecordKind.CreateRenderPipeline;
    public play(): TrackedGPURenderPipeline {
        const a = this.args[0];
        const pipeline = this.caller!.__authentic!.createRenderPipeline(this.transformArgs(
            this.args,
            tracked => tracked.__authentic
        )[0]);
        this.ret!.__authentic = pipeline;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.transformArgs(
            this.args,
            tracked => tracked.__id
        )[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, RcdCreateRenderPipelineArgs, TrackedGPURenderPipeline> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const rawDesc = deserializeObject(ds) as any;
        const desc = this.transformArgs(
            [rawDesc],
            id => profile.get(id)
        )[0];
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPipeline;
        return new RcdCreateRenderPipeline([ desc ], device, ret);
    }

    public transformArgs(args: any, transformer: (obj: any) => any): [any] {
        const desc = {
            ...args[0],
            layout: args[0].layout === "auto" ? "auto" : transformer(args[0].layout),
            vertex: {
                ...args[0].vertex,
                module: transformer(args[0].vertex.module)
            },
            fragment: args[0].fragment ? {
                ...args[0].fragment,
                module: transformer(args[0].fragment.module)
            } : undefined
        }
        if (!desc.fragment) {
            delete desc.fragment;
        }
        return [desc as any];
    }
}