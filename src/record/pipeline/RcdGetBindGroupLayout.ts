import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBindGroupLayout from "../../tracked/GPUBindGroupLayout";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdGetBindGroupLayout extends RcdBase<TrackedGPURenderPipeline, [number], TrackedGPUBindGroupLayout> {
    __kind = RecordKind.GetBindGroupLayout;
    public play(): TrackedGPUBindGroupLayout {
        const pipeline = this.caller!.__authentic!.getBindGroupLayout(...this.args);
        this.ret!.__authentic = pipeline;
        this.ret!.__creator = this.caller!;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPipeline, [number], TrackedGPUBindGroupLayout> {
        const pipeline = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPipeline;
        const index = ds.read<number>(DataStream.Type.UInt32);
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUBindGroupLayout;
        return new RcdGetBindGroupLayout([ index ], pipeline, ret);
    }

}
