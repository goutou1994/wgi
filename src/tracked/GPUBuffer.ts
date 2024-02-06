import { deserializeString, serializeString } from "../common/serialize";
import { DataStream, brandMap } from "../common/utils";
import wgi_GPUBuffer from "../recorder/driver/GPUBuffer";
import wgi_GPUBase from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";
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
    readonly __kind: number = brandMap.GPUBuffer;
    __authentic?: GPUBuffer;
    __snapshot?: GPUBufferSnapshot;
    __initialSnapshot?: GPUBufferSnapshot;
    __creator?: TrackedGPUDevice;

    public fromAuthentic(authentic: wgi_GPUBuffer): TrackedGPUBuffer {
        const tracked = this.fastFromAuthentic(authentic, TrackedGPUBuffer);
        tracked.realUsage = authentic.desc.usage;
        return tracked;
    }
    public serialize(ds: DataStream): void {
        console.assert(!!this.__snapshot);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.device);
        serializeString(ds, this.__snapshot!.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.size);
        ds.write(DataStream.Type.UInt32, this.__snapshot!.usage);
    }
    public deserialize(ds: DataStream) {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const label = deserializeString(ds);
        const size = ds.read<number>(DataStream.Type.UInt32);
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const content = new ArrayBuffer(4);
        this.__initialSnapshot = {
            device: device_id,
            label,
            size,
            usage,
            content
        };
    }
    public realUsage?: GPUBufferUsageFlags;
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder): Promise<void> {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder);
        this.__authentic = this.__creator.__authentic!.createBuffer({
            size: s.size,
            usage: s.usage | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
        });
        this.__authentic.label = s.label;
        this.realUsage = s.usage;

        const stagingBuffer = this.__creator.__authentic!.createBuffer({
            size: s.size,
            usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
        })
        await stagingBuffer.mapAsync(GPUMapMode.WRITE);
        const ab = stagingBuffer.getMappedRange();
        new Uint8Array(ab).set(new Uint8Array(s.content));
        stagingBuffer.unmap();

        encoder.copyBufferToBuffer(stagingBuffer, 0, this.__authentic!, 0, s.size);
    }

    private stagingBuffer?: GPUBuffer;
    public async takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile) {
        let device: GPUDevice;
        if (profile) {
            // PROBLEM: cannot retrieve device id under replay if no initialSnapshot is available.
            device = this.__creator!.__authentic!;
        } else {
            // PROBLEM: cannot call createBuffer directly using wgi_device.
            const wgi_device = (this.__authentic as wgi_GPUBuffer).device;
            device = wgi_device.next;
        }
        const stagingBuffer = device.createBuffer({
            size: this.__authentic!.size,
            usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        });
        encoder.copyBufferToBuffer(
            this.__authentic!, 0,
            stagingBuffer, 0,
            this.__authentic!.size
        );
        this.stagingBuffer = stagingBuffer;
    }
    public async takeSnapshotAfterSubmit() {
        await this.stagingBuffer!.mapAsync(GPUMapMode.READ);
        const ab = this.stagingBuffer!.getMappedRange();

        let creator_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUBuffer).device.__id;

        this.__snapshot = {
            device: creator_id,
            label: this.__authentic!.label,
            size: this.__authentic!.size,
            usage: this.realUsage ?? this.__authentic!.usage,
            content: ab.slice(0)
        };

        this.stagingBuffer!.unmap();
        this.stagingBuffer = undefined;
    }

    public getSnapshotDepIds(): number[] {
        throw new Error("Method not implemented.");
    }
}