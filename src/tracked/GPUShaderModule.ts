import { brandMap } from "../common/brand";
import { deserializeString, serializeString } from "../common/serialize";
import { DataStream } from "../common/utils";
import RcdCreateShaderModule from "../record/create/rcdCreateShaderModule";
import wgi_GPUShaderModule from "../recorder/driver/GPUShaderModule";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import TrackedGPUDevice from "./GPUDevice";
import TrackedBase from "./tracked";

export enum ShaderMessageType {
    info = 0,
    warning = 1,
    error = 2
};

interface GPUShaderModuleSnapshot {
    label: string;
    device: UniversalResourceId;
    src: string;
    messages: Array<{
        type: ShaderMessageType;
        content: string;
    }>;
}

export default class TrackedGPUShaderModule extends TrackedBase<TrackedGPUShaderModule> {
    __kind = brandMap.GPUShaderModule;
    __authentic?: GPUShaderModule;
    __snapshot?: GPUShaderModuleSnapshot;
    __initialSnapshot?: GPUShaderModuleSnapshot;
    __creator?: TrackedGPUDevice;
    __creatorRcd?: RcdCreateShaderModule;
    public fromAuthentic(authentic: wgi_GPUBase): TrackedGPUShaderModule {
        return this.fastFromAuthentic(authentic, TrackedGPUShaderModule);
    }
    public serialize(ds: DataStream): void {
        const s = this.__snapshot!;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.device);
        serializeString(ds, s.src);
        ds.write(DataStream.Type.UInt32, s.messages.length);
        for (const msg of s.messages) {
            ds.write(DataStream.Type.UInt32, msg.type);
            serializeString(ds, msg.content);
        }
    }
    public deserialize(ds: DataStream): void {
        const label = deserializeString(ds);
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const src = deserializeString(ds);
        const msgCount = ds.read<number>(DataStream.Type.UInt32);
        const messages = [];
        for (let i = 0; i < msgCount; i++) {
            const type = ds.read<ShaderMessageType>(DataStream.Type.UInt32);
            const content = deserializeString(ds);
            messages.push({
                type, content
            });
        }
        this.__initialSnapshot = {
            label, device: device_id,
            src, messages
        };
    }
    public async restore(profile: ReplayProfile, encoder: GPUCommandEncoder) {
        const s = this.__initialSnapshot!;
        this.__creator = await profile.getOrRestore(s.device, encoder);

        this.__authentic = this.__creator.__authentic!.createShaderModule({
            label: s.label,
            code: s.src
        });
    }
    public takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder): void { }
    public async takeSnapshotAfterSubmit() {
        const { messages: rawMessages } = await this.__authentic!.getCompilationInfo();
        const messages = [];
        for (const raw of rawMessages) {
            const type = ShaderMessageType[raw.type];
            const content = `[line ${raw.lineNum}: column ${raw.linePos}]\n${raw.message}`;
            messages.push({
                type, content
            });
        }

        this.__snapshot = {
            label: this.__authentic!.label,
            device: this.__creator?.__id ?? (this.__authentic as wgi_GPUShaderModule).device.__id,
            src: this.isReplayMode() ? (this.__initialSnapshot?.src ?? this.__creatorRcd!.args[0].code) : (this.__authentic as wgi_GPUShaderModule).desc.code,
            messages
        };
    }

    public getDeps(): wgi_GPUBase[] {
        return [ (this.__authentic! as wgi_GPUShaderModule).device ];
    }
}
