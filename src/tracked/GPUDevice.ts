import { DataStream } from "../common/utils";
import wgi_GPUDevice from "../recorder/driver/GPUDevice";
import { brandMap } from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";
import TrackedGPUAdapter from "./GPUAdapter";
import TrackedBase from "./tracked";

interface GPUDeviceSnapshot {
    adapter: UniversalResourceId
}

export default class TrackedGPUDevice extends TrackedBase<TrackedGPUDevice> {
    readonly __kind: number = brandMap["GPUDevice"];
    __authentic?: GPUDevice;
    __snapshot?: GPUDeviceSnapshot;
    private adapter?: TrackedGPUAdapter;
    public fromAuthentic(authentic: wgi_GPUDevice): TrackedGPUDevice {
        return this.fastFromAuthentic(authentic, TrackedGPUDevice);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.__snapshot!.adapter);
    }
    public deserialize(id: number, ds: DataStream): TrackedGPUDevice {
        const adapter_id = ds.read<number>(DataStream.Type.UInt32);

        const device = new TrackedGPUDevice();
        device.__id = id;
        device.__snapshot = {
            adapter: adapter_id
        };
        return device;
    }
    public async restore(profile: ReplayProfile) {
        this.adapter = await profile.getOrRestore(this.__snapshot!.adapter) as TrackedGPUAdapter;
        const device = await this.adapter.__authentic!.requestDevice();
        if (!device) throw "Restore GPUDevice failed.";
        this.__authentic = device;
    }
    public takeSnapshot(): void {
        const wgi_adapter = (this.__authentic as wgi_GPUDevice).adapter;
        this.__snapshot = {
            adapter: wgi_adapter.__id
        }
    }
    public getSnapshotDepIds(): number[] {
        return [this.__snapshot!.adapter];
    }
    
}