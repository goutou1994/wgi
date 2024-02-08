import { brandMap, DataStream } from "../common/utils";
import wgi_GPUCommandEncoder from "../recorder/driver/GPUCommandEncoder";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUCommandEncoderSnapshot {
    device: UniversalResourceId;
}

export default class TrackedGPUCommandEncoder extends TrackedBase<TrackedGPUCommandEncoder> {
    __kind = brandMap.GPUCommandEncoder;
    __authentic?: GPUCommandEncoder;
    __snapshot?: GPUCommandEncoderSnapshot;
    __initialSnapshot?: GPUCommandEncoderSnapshot;
    __creator?: TrackedGPUDevice;

    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUCommandEncoder {
        return this.fastFromAuthentic(authentic, TrackedGPUCommandEncoder);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.__snapshot!.device);
    }
    public deserialize(ds: DataStream): void {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            device: device_id
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.device, encoder) as TrackedGPUDevice;
        this.__authentic = this.__creator!.__authentic!.createCommandEncoder();
    }
    public takeSnapshotBeforeSubmit(_: any): void {
        const device_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUCommandEncoder).device.__id;

        this.__snapshot = {
            device: device_id
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUCommandEncoder).device ];
    }

}
