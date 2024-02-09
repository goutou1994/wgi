import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import type wgi_GPUTexture from "../recorder/driver/GPUTexture";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUTextureSnapshot {
    device: UniversalResourceId;
    width: number;
    height: number;
    depthOrArrayLayers: number;
    mipLevelCount: number;
    sampleCount: number;
    dimension: GPUTextureDimension;
    format: GPUTextureFormat;
    usage: GPUTextureUsageFlags;
    content: ArrayBuffer;
};

const pixelSizeMap = {
    "rgba8unorm": 4,
    "rgba8snorm": 4,
    "rgba8uint": 4,
    "rgba8sint": 4,
};

export default class TrackedGPUTexture extends TrackedBase<TrackedGPUTexture> {
    __kind = brandMap.GPUTexture;
    __authentic?: GPUTexture;
    __snapshot?: GPUTextureSnapshot;
    __initialSnapshot?: GPUTextureSnapshot;
    __creator?: TrackedGPUDevice;

    public realUsage?: GPUTextureUsageFlags;
    public fromAuthentic(authentic: wgi_GPUTexture): TrackedGPUTexture {
        const tracked = this.fastFromAuthentic(authentic, TrackedGPUTexture);
        tracked.realUsage = authentic.usage;
        return tracked;
    }
    public serialize(ds: DataStream): void {
        const s = this.__snapshot!;
        ds.write(DataStream.Type.UInt32, s.device);
        ds.write(DataStream.Type.UInt32, s.width);
        ds.write(DataStream.Type.UInt32, s.height);
        ds.write(DataStream.Type.UInt32, s.depthOrArrayLayers);
        ds.write(DataStream.Type.UInt32, s.mipLevelCount);
        ds.write(DataStream.Type.UInt32, s.sampleCount);
        serializeString(ds, s.dimension);
        serializeString(ds, s.format);
        ds.write(DataStream.Type.UInt32, s.usage);
        ds.write(DataStream.Type.UInt32, s.content.byteLength);
        ds.writeChunk(s.content);
    }
    public deserialize(ds: DataStream): void {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const width = ds.read<number>(DataStream.Type.UInt32);
        const height = ds.read<number>(DataStream.Type.UInt32);
        const depthOrArrayLayers = ds.read<number>(DataStream.Type.UInt32);
        const mipLevelCount = ds.read<number>(DataStream.Type.UInt32);
        const sampleCount = ds.read<number>(DataStream.Type.UInt32);
        const dimension = deserializeString(ds);
        const format = deserializeString(ds);
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const contentLength = ds.read<number>(DataStream.Type.UInt32);
        const content = ds.readChunk(contentLength);

        this.__initialSnapshot = {
            device: device_id,
            width, height, depthOrArrayLayers,
            mipLevelCount, sampleCount,
            dimension: dimension as GPUTextureDimension,
            format: format as GPUTextureFormat,
            usage,
            content
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder);

        this.__authentic = this.__creator.__authentic!.createTexture({
            size: [ s.width, s.height, s.depthOrArrayLayers ],
            mipLevelCount: s.mipLevelCount,
            sampleCount: s.sampleCount,
            dimension: s.dimension,
            format: s.format,
            usage: s.usage | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.TEXTURE_BINDING
        });
        this.realUsage = s.usage;

        const stagingBuffer = this.__creator.__authentic!.createBuffer({
            size: s.content.byteLength,
            usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
        })
        await stagingBuffer.mapAsync(GPUMapMode.WRITE);
        const ab = stagingBuffer.getMappedRange();
        new Uint8Array(ab).set(new Uint8Array(s.content));
        stagingBuffer.unmap();

        encoder.copyBufferToTexture(
            {
                buffer: stagingBuffer
            },
            {
                texture: this.__authentic
            },
            {
                width: s.width,
                // height: s.height,
                // depthOrArrayLayers: s.depthOrArrayLayers
            }
        );
    }
    private stagingBuffer?: GPUBuffer;
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        let device: GPUDevice;
        let texture: GPUTexture;
        if (profile) {
            device = this.__creator!.__authentic!;
            texture = this.__authentic!;
        } else {
            const wgi_device = (this.__authentic as wgi_GPUTexture).device;
            device = wgi_device.next;
            texture = (this.__authentic! as wgi_GPUTexture).next;
        }

        const pixelSize = (pixelSizeMap as any)[texture.format] as number;
        if (!pixelSize) return; // unsupported format

        const bufferSize = pixelSize * texture.width * texture.height * texture.depthOrArrayLayers;

        const stagingBuffer = device.createBuffer({
            size: bufferSize,
            usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        });
        encoder.copyTextureToBuffer(
            {
                texture: texture
            },
            {
                buffer: stagingBuffer
            },
            {
                width: texture.width,
                // height: texture.height,
                // depthOrArrayLayers: texture.depthOrArrayLayers
            }
        );
        this.stagingBuffer = stagingBuffer;
    }

    public async takeSnapshotAfterSubmit() {
        await this.stagingBuffer!.mapAsync(GPUMapMode.READ);
        const ab = this.stagingBuffer!.getMappedRange();

        let creator_id = this.__creator?.__id ?? (this.__authentic as wgi_GPUTexture).device.__id;

        this.__snapshot = {
            device: creator_id,
            width: this.__authentic!.width,
            height: this.__authentic!.height,
            depthOrArrayLayers: this.__authentic!.depthOrArrayLayers,
            mipLevelCount: this.__authentic!.mipLevelCount,
            sampleCount: this.__authentic!.sampleCount,
            dimension: this.__authentic!.dimension,
            format: this.__authentic!.format,
            usage: this.realUsage ?? this.__authentic!.usage,
            content: ab.slice(0)
        };

        this.stagingBuffer!.unmap();
        this.stagingBuffer = undefined;
    }

    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUTexture).device ];
    }
    
}
