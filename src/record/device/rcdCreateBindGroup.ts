import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBindGroup from "../../tracked/GPUBindGroup";
import TrackedGPUBindGroupLayout from "../../tracked/GPUBindGroupLayout";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUTextureView from "../../tracked/GPUTextureView";
import RcdBase, { RecordKind } from "../rcd";

export type GPUBindGroupArgs = [{
    layout: TrackedGPUBindGroupLayout,
    entries: Array<{
        binding: number,
        resource: {
            buffer: TrackedGPUBuffer,
            offset?: number,
            size?: number
        } | TrackedGPUTextureView // TODO: TrackedGPUSampler, TrackedGPUExternalTexture
    }>
}];

export default class RcdCreateBindGroup extends RcdBase<TrackedGPUDevice, GPUBindGroupArgs, TrackedGPUBindGroup> {
    __kind = RecordKind.CreateBindGroup;
    public play(): TrackedGPUBindGroup {
        const device = this.caller!.__authentic!.createBindGroup(this.transformArgs(
            this.args,
            tracked => tracked.__authentic
        )[0]);
        this.ret!.__authentic = device;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.transformArgs(
            this.args,
            tracked => tracked.__id
        )[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, GPUBindGroupArgs, TrackedGPUBindGroup> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = this.transformArgs(
            [deserializeObject(ds)],
            id => profile.get(id)
        ) as GPUBindGroupArgs;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUBindGroup;
        return new RcdCreateBindGroup(desc, device, ret);
    }

    public transformArgs(args: any, transformer: (obj: any) => any): any {
        return [{
            layout: transformer(args[0].layout),
            entries: args[0].entries.map((e: any) => {
                const entry = {
                    binding: e.binding,
                    resource: e.resource.buffer ? {
                        buffer: transformer(e.resource.buffer),
                        offset: e.resource.offset,
                        size: e.resource.size
                    } : transformer(e.resource)
                }
                if (entry.resource && entry.resource.offset === undefined) delete entry.resource.offset;
                if (entry.resource && entry.resource.size === undefined) delete entry.resource.size;
                return entry;
            })
        }];
    }
}
