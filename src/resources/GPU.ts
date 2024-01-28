import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPU from "../recorder/driver/GPU";
import { brandMap } from "../recorder/driver/base";
import ReplayProfile from "../replay/profile";
import BaseResource from "./res";

export default class ResGPU extends BaseResource<ResGPU> {
    readonly __kind: number = brandMap["GPU"];
    __authentic!: GPU;

    public fromAuthentic(authentic: wgi_GPU): ResGPU { 
        return this.fastFromAuthentic(authentic, ResGPU);
    }

    public serialize(ds: DataStream) {
        const features = this.__authentic.wgslLanguageFeatures;
        ds.write(DataStream.Type.UInt32, features.size);
        features.forEach(feature => {
            serializeString(ds, feature);
        });
    }

    public deserialize(id: number, ds: DataStream): ResGPU {
        const size = ds.read<number>(DataStream.Type.UInt32);
        const features = [];
        for (let i = 0; i < size; i++) {
            features.push(deserializeString(ds));
        }
        const gpu = new ResGPU();
        gpu.__id = id;
        return gpu;
    }
    
    public async restore(profile: ReplayProfile) {
        this.__authentic = navigator.gpu;
    }
    public takeSnapshot(): void {
        // do nothing
    }

    public getDepIds(): number[] {
        return [];
    }
}