import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateCommandEncoder extends RcdBase<TrackedGPUDevice, [GPUCommandEncoderDescriptor?], TrackedGPUCommandEncoder> {
    __kind = RecordKind.CreateCommandEncoder;
    public play(): TrackedGPUCommandEncoder {
        const encoder = this.caller!.__authentic!.createCommandEncoder(...this.args);
        this.ret!.__authentic = encoder;
        this.ret!.__creator = this.caller!;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [GPUObjectDescriptorBase?], TrackedGPUCommandEncoder> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandEncoder;
        return new RcdCreateCommandEncoder([], device, ret);
    }
}