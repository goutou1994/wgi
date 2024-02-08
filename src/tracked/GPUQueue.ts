import { brandMap, DataStream } from "../common/utils";
import wgi_GPUQueue from "../recorder/driver/GPUQueue";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUQueueSnapshot {
    device: UniversalResourceId;
}

export default class TrackedGPUQueue extends TrackedBase<TrackedGPUQueue> {
    __kind = brandMap.GPUQueue;
    __authentic?: GPUQueue;
    __snapshot?: GPUQueueSnapshot;
    __initialSnapshot?: GPUQueueSnapshot;
    __creator?: TrackedGPUDevice;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUQueue {
        return this.fastFromAuthentic(authentic, TrackedGPUQueue);
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
        this.__authentic = this.__creator.__authentic!.queue;
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        this.__snapshot = {
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUQueue).device.__id
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUQueue).device ];
    }
}