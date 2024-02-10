import { deserializeObject, deserializeString, serializeObject, serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUShaderModule from "../../tracked/GPUShaderModule";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateShaderModule extends RcdBase<TrackedGPUDevice, [GPUShaderModuleDescriptor], TrackedGPUShaderModule> {
    __kind = RecordKind.CreateShaderModule;
    public play(): TrackedGPUShaderModule {
        const sm = this.caller!.__authentic!.createShaderModule(this.args[0]);
        this.ret!.__authentic = sm;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [GPUShaderModuleDescriptor], TrackedGPUShaderModule> {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const desc = deserializeObject(ds) as GPUShaderModuleDescriptor;
        const ret_id = ds.read<number>(DataStream.Type.UInt32);
        return new RcdCreateShaderModule(
            [ desc ],
            profile.get<TrackedGPUDevice>(device_id),
            profile.get<TrackedGPUShaderModule>(ret_id)
        );
    }

}