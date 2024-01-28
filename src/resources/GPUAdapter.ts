import { serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUAdapter from "../recorder/driver/GPUAdapter";
import { brandMap } from "../recorder/driver/base";
import ReplayProfile from "../replay/profile";
import ResGPU from "./GPU";
import BaseResource, { DepsHolder } from "./res";

export default class ResGPUAdapter extends BaseResource<ResGPUAdapter> {
    readonly __kind: number = brandMap["GPUAdapter"];
    __authentic!: GPUAdapter;
    private gpu?: DepsHolder<ResGPU>;
    public fromAuthentic(authentic: wgi_GPUAdapter): ResGPUAdapter {
        return this.fastFromAuthentic(authentic, ResGPUAdapter);
    }
    public serialize(ds: DataStream): void {
        const wgi_gpu = (this.__authentic as wgi_GPUAdapter).gpu;
        ds.write(DataStream.Type.UInt32, wgi_gpu.__id);
        const features = this.__authentic.features;
        ds.write(DataStream.Type.UInt32, features.size);
        for (const feature of features) {
            serializeString(ds, feature);
        }
    }
    public deserialize(id: number, ds: DataStream): ResGPUAdapter {
        const gpu_id = ds.read<number>(DataStream.Type.UInt32);

        const adapter = new ResGPUAdapter();
        adapter.__id = id;
        adapter.gpu = new DepsHolder<ResGPU>(gpu_id);;
        return adapter;
    }
    public async restore(profile: ReplayProfile) {
        const gpu = await profile.getOrRestore(this.gpu!.id) as ResGPU;
        const adapter = await gpu.__authentic.requestAdapter();
        if (adapter === null) throw "Restore GPUAdapter failed.";
        this.__authentic = adapter;
    }
    public takeSnapshot(): void {
        // do nothing
    }
    public getDepIds(): number[] {
        return [this.gpu!.id];
    }
   
}