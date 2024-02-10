import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import wgi_GPUShaderModule from "../../recorder/driver/GPUShaderModule";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import TrackedGPUShaderModule from "../../tracked/GPUShaderModule";
import TrackedBase from "../../tracked/tracked";
import RcdBase, { RecordKind } from "../rcd";

type RcdCreateRenderPipelineArgs = [GPURenderPipelineDescriptor & {
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
        const pipeline = this.caller!.__authentic!.createRenderPipeline({
            ...a,
            vertex: {
                ...a.vertex,
                module: a.vertex.module.__authentic!
            },
            fragment: a.fragment ? {
                ...a.fragment,
                module: a.fragment.module.__authentic!
            } : undefined
        });
        this.ret!.__authentic = pipeline;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        const a = this.args[0];
        const desc = {
            ...a,
            vertex: {
                ...a.vertex,
                module: a.vertex.module.__id
            },
            fragment: a.fragment ? {
                ...a.fragment,
                module: a.fragment.module.__id
            } : undefined
        };
        serializeObject(ds, desc);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, RcdCreateRenderPipelineArgs, TrackedGPURenderPipeline> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = deserializeObject(ds) as any;
        desc.vertex.module = profile.get<TrackedGPUShaderModule>(desc.vertex.module);
        if (desc.fragment) {
            desc.fragment.module = profile.get<TrackedGPUShaderModule>(desc.fragment.module);
        }
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPipeline;
        return new RcdCreateRenderPipeline([ desc ], device, ret);
    }

    public transformArgs(args: [GPURenderPipelineDescriptor], transformer: (obj: any) => TrackedBase<any>): RcdCreateRenderPipelineArgs {
        const desc = {
            ...args[0],
            vertex: {
                ...args[0].vertex,
                module: transformer(args[0].vertex.module)
            },
            fragment: args[0].fragment ? {
                ...args[0].fragment,
                module: transformer(args[0].fragment.module)
            } : undefined
        }
        return [desc as any];
    }
}