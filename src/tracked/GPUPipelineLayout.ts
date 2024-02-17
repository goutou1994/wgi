import { brandMap } from "../common/brand";
import { deserializeObject, serializeObject } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreatePipelineLayout from "../record/device/rcdCreatePipelineLayout";
import wgi_GPUBindGroupLayout from "../recorder/driver/GPUBindGroupLayout";
import wgi_GPUPipelineLayout from "../recorder/driver/GPUPipelineLayout";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUBindGroupLayout from "./GPUBindGroupLayout";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

interface GPUPipelineLayoutSnapshot {
    label: string;
    device: UniversalResourceId;
    bindGroupLayouts: Array<UniversalResourceId>;
}

export default class TrackedGPUPipelineLayout extends TrackedBase<TrackedGPUPipelineLayout> {
    __kind = brandMap.GPUPipelineLayout;
    __authentic?: GPUPipelineLayout;
    __snapshot?: GPUPipelineLayoutSnapshot;
    __initialSnapshot?: GPUPipelineLayoutSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: RcdCreatePipelineLayout;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUPipelineLayout {
        return this.fastFromAuthentic(authentic, TrackedGPUPipelineLayout);
    }
    public serialize(ds: DataStream): void {
        serializeObject(ds, this.__snapshot!);
    }
    public deserialize(ds: DataStream): void {
        this.__initialSnapshot = deserializeObject(ds) as GPUPipelineLayoutSnapshot;
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder) as TrackedGPUDevice;
        const layouts: Array<TrackedGPUBindGroupLayout> = [];
        for (const layoutId of s.bindGroupLayouts) {
            layouts.push(await profile.getOrRestore<TrackedGPUBindGroupLayout>(layoutId, encoder));
        }
        this.__authentic = this.__creator!.__authentic!.createPipelineLayout({
            label: s.label,
            bindGroupLayouts: layouts.map(layout => layout.__authentic!)
        });
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile | undefined): void {
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc: any;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd!.args[0];
        } else {
            desc = (this.__authentic as wgi_GPUPipelineLayout).desc;
        }
        this.__snapshot = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUPipelineLayout).device.__id,
            bindGroupLayouts: desc.bindGroupLayouts.map((layout: any) => layout.__id)
        };
    }
    public getDeps(): wgi_GPUBase[] {
        const deps: wgi_GPUBase[] = [ (this.__authentic! as wgi_GPUPipelineLayout).device ];
        for (const layout of (this.__authentic as wgi_GPUPipelineLayout).desc.bindGroupLayouts) {
            deps.push(layout as wgi_GPUBindGroupLayout);
        }
        return deps;
    }
}
