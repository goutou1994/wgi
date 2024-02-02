import { deserializeString, serializeString } from "../common/serialize";
import { DataStream, brandMap } from "../common/utils";
import wgi_GPU from "../recorder/driver/GPU";
import ReplayProfile from "../replay/profile";
import TrackedBase from "./tracked";

interface GPUSnapshot {
    features: Set<string>
}

export default class TrackedGPU extends TrackedBase<TrackedGPU> {
    readonly __kind: number = brandMap["GPU"];
    __authentic?: GPU;
    __snapshot?: GPUSnapshot;

    public fromAuthentic(authentic: wgi_GPU): TrackedGPU {
        return this.fastFromAuthentic(authentic, TrackedGPU);
    }

    public serialize(ds: DataStream) {
        console.assert(!!this.__snapshot);
        const features = this.__snapshot!.features;
        ds.write(DataStream.Type.UInt32, features.size);
        features.forEach(feature => {
            serializeString(ds, feature);
        });
    }

    public deserialize(ds: DataStream) {
        const size = ds.read<number>(DataStream.Type.UInt32);
        const features = new Set<string>();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }
        this.__snapshot = {
            features
        };
    }
    
    public async restore(profile: ReplayProfile) {
        // TODO: compare snapshot features with current env, log warning if different

        this.__authentic = navigator.gpu;
    }
    public takeSnapshot(): void {
        const features = new Set<string>();
        this.__authentic?.wgslLanguageFeatures.forEach(f => features.add(f));
        this.__snapshot = {
            features
        };
    }

    public getSnapshotDepIds(): number[] {
        return [];
    }
}