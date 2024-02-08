import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUAdapter from "../recorder/driver/GPUAdapter";
import wgi_GPUBase from "../recorder/driver/gpubase";
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
    __initialSnapshot?: GPUAdapterSnapshot;
    __creator?: TrackedGPU;
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

        this.__initialSnapshot = {
            gpu: gpu_id,
            features
        }
    }
    public async restore(profile: ReplayProfile) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.gpu, null as any) as TrackedGPU;
        const adapter = await this.__creator.__authentic!.requestAdapter();
        if (adapter === null) throw "Restore GPUAdapter failed.";
        
        // TODO: compare features
        this.__authentic = adapter;
    }
    public takeSnapshotBeforeSubmit(_: any) {
        const gpu_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUAdapter).gpu.__id;
        const features = new Set<string>();
        this.__authentic?.features.forEach(f => features.add(f));
        this.__snapshot = {
            gpu: gpu_id,
            features
        };
    }
   
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUAdapter).gpu ];
    }
}