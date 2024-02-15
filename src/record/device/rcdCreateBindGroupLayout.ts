import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBindGroupLayout from "../../tracked/GPUBindGroupLayout";
import type TrackedGPUDevice from "../../tracked/GPUDevice";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateBindGroupLayout extends RcdBase<TrackedGPUDevice, [GPUBindGroupLayoutDescriptor], TrackedGPUBindGroupLayout> {
    __kind = RecordKind.CreateBindGroupLayout;
    public play(): TrackedGPUBindGroupLayout {
        const device = this.caller!.__authentic!.createBindGroupLayout(...this.args);
        this.ret!.__authentic = device;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [GPUBindGroupLayoutDescriptor], TrackedGPUBindGroupLayout> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = deserializeObject(ds) as GPUBindGroupLayoutDescriptor;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUBindGroupLayout;
        return new RcdCreateBindGroupLayout([ desc ], device, ret);
    }
}