import { brandMap, DataStream } from "../common/utils";
import wgi_GPUCommandBuffer from "../recorder/driver/GPUComandBuffer";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUCommandEncoder from "./GPUCommandEncoder";
import TrackedBase from "./tracked";

interface GPUCommandBufferSnapshot {
    encoder: UniversalResourceId;
}

export default class TrackedGPUCommandBuffer extends TrackedBase<TrackedGPUCommandBuffer> {
    __kind = brandMap.GPUCommandBuffer;
    __authentic?: GPUCommandBuffer;
    __snapshot?: GPUCommandBufferSnapshot;
    __initialSnapshot?: GPUCommandBufferSnapshot;
    __creator?: TrackedGPUCommandEncoder;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUCommandBuffer {
        return this.fastFromAuthentic(authentic, TrackedGPUCommandBuffer);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.__snapshot!.encoder);
    }
    public deserialize(ds: DataStream): void {
        const encoder_id = ds.read<number>(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            encoder: encoder_id
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        this.__creator = await profile.getOrRestore(this.__initialSnapshot!.encoder, encoder) as TrackedGPUCommandEncoder;
        this.__authentic = this.__creator!.__authentic!.finish();
    }
    public takeSnapshotBeforeSubmit(): void {
        this.__snapshot = {
            encoder: this.__creator!.__id
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUCommandBuffer).encoder ]
    }
}