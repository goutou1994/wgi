import { deserializeString, serializeString } from "../common/serialize";
import { DataStream, brandMap } from "../common/utils";
import wgi_GPUAdapter from "../recorder/driver/GPUAdapter";
import type ReplayProfile from "../replay/profile";
import TrackedGPU from "./GPU";
import TrackedBase from "./tracked";

interface GPUAdapterSnapshot {
    gpu: UniversalResourceId;
    features: Set<string>;
}

export default class TrackedGPUAdapter extends TrackedBase<TrackedGPUAdapter> {
    readonly __kind: number = brandMap.GPUAdapter;
    __authentic?: GPUAdapter;
    __snapshot?: GPUAdapterSnapshot;
    private gpu?: TrackedGPU;
    public fromAuthentic(authentic: wgi_GPUAdapter): TrackedGPUAdapter {
        return this.fastFromAuthentic(authentic, TrackedGPUAdapter);
    }
    public serialize(ds: DataStream): void {
        console.assert(!!this.__snapshot);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.gpu);
        const features = this.__snapshot!.features;
        ds.write(DataStream.Type.UInt32, features.size);
        for (const feature of features) {
            serializeString(ds, feature);
        }
    }
    public deserialize(ds: DataStream) {
        const gpu_id = ds.read<number>(DataStream.Type.UInt32);
        const size = ds.read<number>(DataStream.Type.UInt32);
        const features = new Set<string>();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }

        this.__snapshot = {
            gpu: gpu_id,
            features
        }
    }
    public async restore(profile: ReplayProfile) {
        this.gpu = await profile.getOrRestore(this.__snapshot!.gpu) as TrackedGPU;
        const adapter = await this.gpu.__authentic!.requestAdapter();
        if (adapter === null) throw "Restore GPUAdapter failed.";
        
        // TODO: compare features
        this.__authentic = adapter;
    }
    public takeSnapshot(): void {
        const wgi_gpu = (this.__authentic as wgi_GPUAdapter).gpu;
        const features = new Set<string>();
        this.__authentic?.features.forEach(f => features.add(f));
        this.__snapshot = {
            gpu: wgi_gpu.__id,
            features
        };
    }
    public getSnapshotDepIds(): number[] {
        return [this.__snapshot!.gpu];
    }
   
}