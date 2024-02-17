import { deseralizeOptionalUint32, seralizeOptionalUint32 } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBindGroup from "../../tracked/GPUBindGroup";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdSetBindGroupArgs = [
    index: number,
    bindGroup: TrackedGPUBindGroup | null,
    dynamicOffsets: Array<number> | undefined
];

export default class RcdSetBindGroup extends RcdBase<TrackedGPURenderPassEncoder, RcdSetBindGroupArgs, void> {
    __kind = RecordKind.SetBindGroup;
    public play(): void {
        this.caller!.__authentic!.setBindGroup(
            this.args[0],
            this.args[1] ? this.args[1].__authentic! : null,
            this.args[2]
        );
        
        if (this.args[1]) {
            this.caller!.__runtime!.bindGroups[this.args[0]] = {
                bindGroup: this.args[1],
                dynamicOffsets: this.args[2]
            }
        } else {
            delete this.caller!.__runtime!.bindGroups[this.args[0]];
        }
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1] ? this.args[1].__id : null);
        if (!this.args[2]) {
            ds.write(DataStream.Type.UInt32, this.args[0]);
        } else {
            ds.write(DataStream.Type.UInt32, this.args[2].length);
            for (const offset of this.args[2]) {
                ds.write(DataStream.Type.UInt32, offset);
            }
        }
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, RcdSetBindGroupArgs, void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const index = ds.read<number>(DataStream.Type.UInt32);
        const bindGroupId = deseralizeOptionalUint32(ds);
        const bindGroup = bindGroupId !== undefined ? profile.get(bindGroupId) as TrackedGPUBindGroup : null;
        const offsets = [];
        const offsetLength = ds.read<number>(DataStream.Type.UInt32);
        for (let i = 0; i < offsetLength; i++) {
            offsets.push(ds.read<number>(DataStream.Type.UInt32));
        }
        return new RcdSetBindGroup(
            [index, bindGroup, offsets.length === 0 ? undefined : offsets],
            pass,
        );
    }

    public transformArgs(args: any, transformer: (obj: any) => any) {
        return [
            args[0],
            args[1] ? transformer(args[1]) : null,
            args[2]
        ];
    }
}