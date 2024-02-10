import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUQueue from "../recorder/driver/GPUQueue";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUQueueSnapshot {
    label: string;
    device: UniversalResourceId;
}

export default class TrackedGPUQueue extends TrackedBase<TrackedGPUQueue> {
    __kind = brandMap.GPUQueue;
    __authentic?: GPUQueue;
    __snapshot?: GPUQueueSnapshot;
    __initialSnapshot?: GPUQueueSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: void;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUQueue {
        return this.fastFromAuthentic(authentic, TrackedGPUQueue);
    }
    public serialize(ds: DataStream): void {
        serializeString(ds, this.__snapshot!.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.device);
    }
    public deserialize(ds: DataStream): void {
        const label = deserializeString(ds);
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            device: device_id
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.device, encoder) as TrackedGPUDevice;
        this.__authentic = this.__creator.__authentic!.queue;
        this.__authentic.label = this.__initialSnapshot!.label;
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        this.__snapshot = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUQueue).device.__id
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUQueue).device ];
    }
}