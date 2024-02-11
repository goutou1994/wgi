import { brandMap } from "../common/brand";
import { DataStream } from "../common/utils";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUCommandEncoder from "./GPUCommandEncoder";
import TrackedBase from "./tracked";

interface GPURenderPassEncoderSnapshot {
    encoder: UniversalResourceId;
}

export default class TrackedGPURenderPassEncoder extends TrackedBase<TrackedGPURenderPassEncoder> {
    __kind = brandMap.GPURenderPassEncoder;
    __authentic?: GPURenderPassEncoder;
    __snapshot?: GPURenderPassEncoderSnapshot;
    __initialSnapshot?: GPURenderPassEncoderSnapshot;
    __creator?: TrackedGPUCommandEncoder;
    __creatorRcd?: any;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPURenderPassEncoder {
        throw new Error("Method not implemented.");
    }
    public serialize(ds: DataStream): void {
        throw new Error("Method not implemented.");
    }
    public deserialize(ds: DataStream): void {
        throw new Error("Method not implemented.");
    }
    public restore(profile: ReplayProfile, encoder?: GPUCommandEncoder | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        throw new Error("Method not implemented.");
    }
    public getDeps(): wgi_GPUBase[] {
        throw new Error("Method not implemented.");
    }
}
