import { DataStream, brandMap } from "../common/utils";
import wgi_GPUDevice from "../recorder/driver/GPUDevice";
import wgi_GPUBase from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";
import TrackedGPUAdapter from "./GPUAdapter";
import TrackedBase from "./tracked";

interface GPUDeviceSnapshot {
    adapter: UniversalResourceId
}

export default class TrackedGPUDevice extends TrackedBase<TrackedGPUDevice> {
    readonly __kind: number = brandMap.GPUDevice;
    __authentic?: GPUDevice;
    __snapshot?: GPUDeviceSnapshot;
    __initialSnapshot?: GPUDeviceSnapshot;
    __creator?: TrackedGPUAdapter;
    public fromAuthentic(authentic: wgi_GPUDevice): TrackedGPUDevice {
        return this.fastFromAuthentic(authentic, TrackedGPUDevice);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.__snapshot!.adapter);
    }
    public deserialize(ds: DataStream) {
        const adapter_id = ds.read<number>(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            adapter: adapter_id
        };
    }
    public async restore(profile: ReplayProfile) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.adapter, null as any) as TrackedGPUAdapter;
        const device = await this.__creator.__authentic!.requestDevice();
        if (!device) throw "Restore GPUDevice failed.";
        this.__authentic = device;
    }
    public takeSnapshotBeforeSubmit(_: any) {
        const adapter_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUDevice).adapter.__id;
        this.__snapshot = {
            adapter: adapter_id
        }
    }

    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic as wgi_GPUDevice).adapter ];
    }
    
}