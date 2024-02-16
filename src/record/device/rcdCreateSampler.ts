import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUSampler from "../../tracked/GPUSampler";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateSampler extends RcdBase<TrackedGPUDevice, [GPUSamplerDescriptor?], TrackedGPUSampler> {
    __kind = RecordKind.CreateSampler;
    public play(): TrackedGPUSampler {
        const sampler = this.caller!.__authentic!.createSampler(...this.args);
        this.ret!.__authentic = sampler;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [(GPUSamplerDescriptor | undefined)?], TrackedGPUSampler> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = deserializeObject(ds) as GPUSamplerDescriptor | undefined;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUSampler;
        return new RcdCreateSampler([ desc ], device, ret);
    }
}