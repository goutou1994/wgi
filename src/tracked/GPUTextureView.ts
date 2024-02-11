import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreateView from "../record/texture/rcdCreateView";
import type wgi_GPUTexture from "../recorder/driver/GPUTexture";
import wgi_GPUTextureView from "../recorder/driver/GPUTextureView";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUTexture from "./GPUTexture";
import TrackedBase from "./tracked";

interface GPUTextureViewSnapshot {
    label: string;
    texture: UniversalResourceId;
    arrayLayerCount: number;
    aspect: GPUTextureAspect;
    baseArrayLayer: number;
    baseMipLevel: number;
    dimension: GPUTextureViewDimension;
    format: GPUTextureFormat;
    mipLevelCount: number;
}

export default class TrackedGPUTextureView extends TrackedBase<TrackedGPUTextureView> {
    __kind = brandMap.GPUTextureView;
    __authentic?: GPUTextureView;
    __snapshot?: GPUTextureViewSnapshot;
    __initialSnapshot?: GPUTextureViewSnapshot;
    __creator?: TrackedGPUTexture;
    __creatorRcd?: RcdCreateView;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUTextureView {
        return this.fastFromAuthentic(authentic, TrackedGPUTextureView);
    }
    public serialize(ds: DataStream): void {
        const s = this.__snapshot!;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.texture);
        ds.write(DataStream.Type.UInt32, s.arrayLayerCount);
        serializeString(ds, s.aspect);
        ds.write(DataStream.Type.UInt32, s.baseArrayLayer);
        ds.write(DataStream.Type.UInt32, s.baseMipLevel);
        serializeString(ds, s.dimension);
        serializeString(ds, s.format);
        ds.write(DataStream.Type.UInt32, s.mipLevelCount);
    }
    public deserialize(ds: DataStream): void {
        const label = deserializeString(ds);
        const texture_id = ds.read<number>(DataStream.Type.UInt32);
        const arrayLayerCount = ds.read<number>(DataStream.Type.UInt32);
        const aspect = deserializeString(ds);
        const baseArrayLayer = ds.read<number>(DataStream.Type.UInt32);
        const baseMipLevel = ds.read<number>(DataStream.Type.UInt32);
        const dimension = deserializeString(ds);
        const format = deserializeString(ds);
        const mipLevelCount = ds.read<number>(DataStream.Type.UInt32);
        
        this.__initialSnapshot = {
            label, texture: texture_id, arrayLayerCount,
            aspect: aspect as GPUTextureAspect,
            baseArrayLayer, baseMipLevel,
            dimension: dimension as GPUTextureDimension,
            format: format as GPUTextureFormat, mipLevelCount
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.texture, encoder);

        this.__authentic = this.__creator.__authentic!.createView(s);
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        let texture_id: UniversalResourceId;
        let texture: GPUTexture;
        let desc: GPUTextureViewDescriptor;
        if (profile) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            texture = this.__creator!.__authentic!;
            texture_id = this.__creator!.__id;
            desc = this.__creatorRcd!.args[0] ?? {};
        } else {
            texture = (this.__authentic as wgi_GPUTextureView).texture;
            texture_id = (texture as wgi_GPUTexture).__id;
            desc = (this.__authentic as wgi_GPUTextureView).desc ?? {};
        }
        const baseArrayLayer = desc.baseArrayLayer ?? 0;
        let dimension: GPUTextureViewDimension = desc.dimension as any;
        if (!dimension) {
            if (texture.dimension === "1d") {
                dimension = "1d";
            } else if (texture.dimension === "2d" && texture.depthOrArrayLayers === 1) {
                dimension = "2d";
            } else if (texture.dimension === "2d" && texture.depthOrArrayLayers > 1) {
                dimension = "2d-array";
            } else if (texture.dimension === "3d") {
                dimension = "3d";
            }
        }
        let arrayLayerCount = desc.arrayLayerCount;
        if (!arrayLayerCount) {
            if (["1d", "2d", "3d"].includes(dimension)) {
                arrayLayerCount = 1;
            } else if (dimension === "cube") {
                arrayLayerCount = 6;
            } else {
                arrayLayerCount = texture.depthOrArrayLayers - baseArrayLayer;
            }
        }
        const aspect = desc.aspect ?? "all";
        let format: GPUTextureFormat = desc.format as any;
        if (!format) {
            if (aspect === "depth-only") {
                if (texture.format === "depth24plus-stencil8") {
                    format = "depth24plus";
                } else if (texture.format === "depth32float-stencil8") {
                    format = "depth32float";
                }
            } else if (aspect === "stencil-only") {
                if (texture.format === "depth24plus-stencil8") {
                    format = "stencil8";
                } else if (texture.format === "depth32float-stencil8") {
                    format = "stencil8";
                }
            } else {
                format = texture.format;
            }
        }
        const baseMipLevel = desc.baseMipLevel ?? 0;
        this.__snapshot = {
            label: this.__authentic!.label,
            texture: texture_id,
            arrayLayerCount,
            aspect,
            baseArrayLayer,
            baseMipLevel,
            dimension,
            format,
            mipLevelCount: desc.mipLevelCount ?? texture.mipLevelCount - baseMipLevel
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUTextureView).texture ];
    }
}
