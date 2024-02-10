import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateRenderPipeline extends RcdBase<TrackedGPUDevice, [GPURenderPipelineDescriptor], TrackedGPURenderPipeline> {
    __kind = RecordKind.CreateRenderPipeline;
    public play(): TrackedGPURenderPipeline {
        const pipeline = this.caller!.__authentic!.createRenderPipeline(...this.args);
        this.ret!.__authentic = pipeline;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [GPURenderPipelineDescriptor], TrackedGPURenderPipeline> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = deserializeObject(ds) as GPURenderPipelineDescriptor;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPipeline;
        return new RcdCreateRenderPipeline([ desc ], device, ret);
    }
}