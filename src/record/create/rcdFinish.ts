import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandBuffer from "../../tracked/GPUCommandBuffer";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdFinish extends RcdBase<TrackedGPUCommandEncoder, [], TrackedGPUCommandBuffer> {
    __kind = RecordKind.Finish;
    public play(): TrackedGPUCommandBuffer {
        const cb = this.caller!.__authentic!.finish();
        this.ret!.__authentic = cb;
        this.ret!.__creator = this.caller!;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUCommandEncoder, [], TrackedGPUCommandBuffer> {
        const encoder = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandEncoder;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandBuffer;
        return new RcdFinish([], encoder, ret);
    }
    
}
