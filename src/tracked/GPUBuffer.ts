import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import wgi_GPUBuffer from "../recorder/driver/GPUBuffer";
import wgi_GPUBase, { brandMap } from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUBufferSnapshot {
    device: number;
    label: string;
    size: number;
    usage: number;
    content: ArrayBuffer;
};

export default class TrackedGPUBuffer extends TrackedBase<TrackedGPUBuffer> {
    readonly __kind: number = brandMap["GPUBuffer"];
    __authentic?: GPUBuffer;
    __snapshot?: GPUBufferSnapshot;
    private device?: TrackedGPUDevice;

    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUBuffer {
        return this.fastFromAuthentic(authentic, TrackedGPUBuffer);
    }
    public serialize(ds: DataStream): void {
        console.assert(!!this.__snapshot);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.device);
        serializeString(ds, this.__snapshot!.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.size);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.usage);
    }
    public deserialize(id: number, ds: DataStream): TrackedGPUBuffer {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const label = deserializeString(ds);
        const size = ds.read<number>(DataStream.Type.UInt32);
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const content = new ArrayBuffer(4);
        const snapshot: GPUBufferSnapshot = {
            device: device_id,
            label,
            size,
            usage,
            content
        };
        const tracked = new TrackedGPUBuffer();
        tracked.__id = id;
        tracked.__snapshot = snapshot;
        return tracked;
    }
    public async restore(profile: ReplayProfile): Promise<void> {
        this.device = await profile.getOrRestore(this.__snapshot!.device);
        this.__authentic = this.device.__authentic!.createBuffer({
            size: this.__snapshot!.size,
            usage: this.__snapshot!.usage
        });
        this.__authentic.label = this.__snapshot!.label;
    }
    public takeSnapshot(): void {
        const wgi_device = (this.__authentic as wgi_GPUBuffer).device;
        this.__snapshot = {
            device: wgi_device.__id,
            label: this.__authentic!.label,
            size: this.__authentic!.size,
            usage: this.__authentic!.usage,
            content: new ArrayBuffer(4) // FIXME: retrieve real content
        };
    }
    public getSnapshotDepIds(): number[] {
        throw new Error("Method not implemented.");
    }
}