import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreateSampler from "../record/device/rcdCreateSampler";
import wgi_GPUSampler from "../recorder/driver/GPUSampler";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import type TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUSamplerSnapshot {
    label: string;
    device: UniversalResourceId;
    addressModeU: GPUAddressMode;
    addressModeV: GPUAddressMode;
    addressModeW: GPUAddressMode;
    magFilter: GPUFilterMode;
    minFilter: GPUFilterMode;
    mipmapFilter: GPUMipmapFilterMode;
    lodMinClamp: number;
    lodMaxClamp: number;
    compare?: GPUCompareFunction;
    maxAnisotropy: number;
}

export default class TrackedGPUSampler extends TrackedBase<TrackedGPUSampler> {
    __kind = brandMap.GPUSampler;
    __authentic?: GPUSampler;
    __snapshot?: GPUSamplerSnapshot;
    __initialSnapshot?: GPUSamplerSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: RcdCreateSampler;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUSampler {
        return this.fastFromAuthentic(authentic, TrackedGPUSampler);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPUSamplerSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder) as TrackedGPUDevice;
        this.__authentic = this.__creator!.__authentic!.createSampler(s);
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc: GPUSamplerDescriptor | undefined = undefined;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd!.args[0];
        } else {
            desc = (this.__authentic as wgi_GPUSampler).desc;
        }
        desc = desc ?? {};
        this.__snapshot = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUSampler).device.__id,
            addressModeU: desc.addressModeU ?? "clamp-to-edge",
            addressModeV: desc.addressModeV ?? "clamp-to-edge",
            addressModeW: desc.addressModeW ?? "clamp-to-edge",
            magFilter: desc.magFilter ?? "nearest",
            minFilter: desc.minFilter ?? "nearest",
            mipmapFilter: desc.mipmapFilter ?? "nearest",
            lodMinClamp: desc.lodMinClamp ?? 0,
            lodMaxClamp: desc.lodMaxClamp ?? 0,
            compare: desc.compare,
            maxAnisotropy: desc.maxAnisotropy ?? 1
        };
    }
    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUSampler).device ];
    }
    
}

