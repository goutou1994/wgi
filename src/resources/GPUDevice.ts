import { serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUAdapter from "../recorder/driver/GPUAdapter";
import wgi_GPUDevice from "../recorder/driver/GPUDevice";
import wgi_GPUBase, { brandMap } from "../recorder/driver/base";
import ReplayProfile from "../replay/profile";
import ResGPU from "./GPU";
import ResGPUAdapter from "./GPUAdapter";
import BaseResource, { DepsHolder } from "./res";

export default class ResGPUDevice extends BaseResource<ResGPUDevice> {
    readonly __kind: number = brandMap["GPUDevice"];
    __authentic!: GPUDevice;
    private adapter?: DepsHolder<ResGPUAdapter>;
    public fromAuthentic(authentic: wgi_GPUDevice): ResGPUDevice {
        return this.fastFromAuthentic(authentic, ResGPUDevice);
    }
    public serialize(ds: DataStream): void {
        const wgi_adapter = (this.__authentic as wgi_GPUDevice).adapter;
        ds.write(DataStream.Type.UInt32, wgi_adapter.__id);
    }
    public deserialize(id: number, ds: DataStream): ResGPUDevice {
        const adapter_id = ds.read<number>(DataStream.Type.UInt32);

        const device = new ResGPUDevice();
        device.__id = id;
        device.adapter = new DepsHolder<ResGPUAdapter>(adapter_id);
        return device;
    }
    public async restore(profile: ReplayProfile) {
        const adapter = await profile.getOrRestore(this.adapter!.id) as ResGPUAdapter;
        const device = await adapter.__authentic.requestDevice();
        if (!device) throw "Restore GPUDevice failed.";
        this.__authentic = device;
    }
    public takeSnapshot(): void {
        // do nothing
    }
    public getDepIds(): number[] {
        return [this.adapter!.id];
    }
    
}