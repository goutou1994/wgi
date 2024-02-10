import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUDevice from "../recorder/driver/GPUDevice";
import wgi_GPUBase from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";
import TrackedGPUAdapter from "./GPUAdapter";
import TrackedBase from "./tracked";

interface GPUDeviceSnapshot {
    label: string,
    adapter: UniversalResourceId,
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
        serializeString(ds, this.__snapshot!.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.adapter);
    }
    public deserialize(ds: DataStream) {
        const label = deserializeString(ds);
        const adapter_id = ds.read<number>(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            adapter: adapter_id
        };
    }
    public async restore(profile: ReplayProfile) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.adapter, null as any) as TrackedGPUAdapter;
        const device = await this.__creator.__authentic!.requestDevice();
        if (!device) throw "Restore GPUDevice failed.";
        this.__authentic = device;
        this.__authentic.label = this.__initialSnapshot!.label;
    }
    public takeSnapshotBeforeSubmit(_: any) {
        const adapter_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUDevice).adapter.__id;
        this.__snapshot = {
            label: this.__authentic!.label,
            adapter: adapter_id
        }
    }

    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic as wgi_GPUDevice).adapter ];
    }
    
}