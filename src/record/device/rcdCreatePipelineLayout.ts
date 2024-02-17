import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBindGroupLayout from "../../tracked/GPUBindGroupLayout";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUPipelineLayout from "../../tracked/GPUPipelineLayout";
import RcdBase, { RecordKind } from "../rcd";

type CreatePipelineLayoutArgs = [{
    label?: string,
    bindGroupLayouts: Array<TrackedGPUBindGroupLayout>
}];

export default class RcdCreatePipelineLayout extends RcdBase<TrackedGPUDevice, CreatePipelineLayoutArgs, TrackedGPUPipelineLayout> {
    __kind = RecordKind.CreatePipelineLayout;
    public play(): TrackedGPUPipelineLayout {
        const layout = this.caller!.__authentic!.createPipelineLayout(this.transformArgs(
            this.args,
            tracked => tracked.__authentic
        )[0]);
        this.ret!.__authentic = layout;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(this.transformArgs(
            this.args,
            tracked => tracked.__id
        )[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);

    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, CreatePipelineLayoutArgs, TrackedGPUPipelineLayout> {
        const device = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUDevice;
        const desc = deserializeObject(ds) as any;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUPipelineLayout;
        return new RcdCreatePipelineLayout(
            this.transformArgs([desc], id => profile.get(id)),
            device,
            ret
        );
    }
    public transformArgs(args: any, transformer: (obj: any) => any): [any] {
        return [{
            label: args[0].label,
            bindGroupLayouts: Array.from(args[0].bindGroupLayouts).map(layout => transformer(layout))
        }];
    }
}
