import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreateBindGroup, { GPUBindGroupArgs } from "../record/device/rcdCreateBindGroup";
import wgi_GPUBindGroup from "../recorder/driver/GPUBindGroup";
import wgi_GPUBindGroupLayout from "../recorder/driver/GPUBindGroupLayout";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import type TrackedGPUBindGroupLayout from "./GPUBindGroupLayout";
import type TrackedGPUBuffer from "./GPUBuffer";
import type TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUBindGroupSnapshot {
    label: string;
    device: UniversalResourceId;
    layout: UniversalResourceId;
    entries: Array<{
        binding: number;
        resourceType: "GPUBuffer" | "GPUExternalTexture" | "GPUSampler" | "GPUTextureView";
        resource: UniversalResourceId | {
            buffer: UniversalResourceId;
            offset: number;
            size: number;
        };
    }>;
}

export default class TrackedGPUBindGroup extends TrackedBase<TrackedGPUBindGroup> {
    __kind = brandMap.GPUBindGroup;
    __authentic?: GPUBindGroup;
    __snapshot?: GPUBindGroupSnapshot;
    __initialSnapshot?: GPUBindGroupSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: RcdCreateBindGroup;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUBindGroup {
        return this.fastFromAuthentic(authentic, TrackedGPUBindGroup);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPUBindGroupSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder) as TrackedGPUDevice;

        const entries: Array<GPUBindGroupEntry> = [];
        for (const e of s.entries) {
            let resource!: GPUBindingResource;
            if (e.resourceType === "GPUBuffer") {
                resource = {
                    buffer: (await profile.getOrRestore<TrackedGPUBuffer>((e.resource as any).buffer, encoder)).__authentic!,
                    offset: (e.resource as any).offset,
                    size: (e.resource as any).size,
                };
            } else {
                resource = (await profile.getOrRestore<any>(e.resource as any, encoder)).__authentic!;
            }
            entries.push({
                binding: e.binding,
                resource
            });
        }

        this.__authentic = this.__creator!.__authentic!.createBindGroup({
            label: s.label,
            layout: (await profile.getOrRestore<TrackedGPUBindGroupLayout>(s.layout, encoder)).__authentic!,
            entries
        });
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc!: any;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd!.args[0];
        } else {
            desc = (this.__authentic as wgi_GPUBindGroup).desc;
        }
        this.__snapshot = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUBindGroup).device.__id,
            layout: desc.layout.__id,
            entries: desc.entries.map((e: any) => {
                if (e.buffer) {
                    return {
                        binding: e.binding,
                        resourceType: "GPUBuffer",
                        resource: {
                            buffer: e.resource.buffer.__id,
                            offset: e.resource.offset,
                            size: e.resource.size
                        }
                    };
                } else {
                    const brand = e.resource.__brand ?? brandMap[e.resource.__kind];
                    return {
                        binding: e.binding,
                        resourceType: brand,
                        resource: e.resource.__id
                    };
                }
            })
        };
    }
    public getDeps(): wgi_GPUBase[] {
        const desc = (this.__authentic as wgi_GPUBindGroup).desc as any;
        const deps: wgi_GPUBase[] = [
            desc.layout as wgi_GPUBindGroupLayout
        ];
        for (const e of desc.entries) {
            if (e.resource.buffer) {
                deps.push(e.resource.buffer);
            } else {
                deps.push(e.resource);
            }
        }
        return deps;
    }
}
