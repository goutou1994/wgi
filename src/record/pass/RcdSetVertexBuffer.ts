import { deseralizeOptionalUint32, seralizeOptionalUint32 } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import type TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdSetVertexBuffer extends RcdBase<TrackedGPURenderPassEncoder, [number, TrackedGPUBuffer | null, number?, number?], void> {
    __kind = RecordKind.SetVertexBuffer;
    public play(): void {
        this.caller!.__authentic!.setVertexBuffer(
            this.args[0],
            this.args[1] ? this.args[1].__authentic! : null,
            this.args[2],
            this.args[3]
        );
        if (this.args[1]) {
            const offset = this.args[2] ?? 0;
            const size = this.args[3] ?? this.args[1].__authentic!.size - offset;
            this.caller!.__runtime!.vbs[this.args[0]] = {
                buffer: this.args[1],
                offset, size,
            };
        } else {
            delete this.caller!.__runtime!.vbs[this.args[0]];
        }
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1] ? this.args[1].__id : null);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, [number, TrackedGPUBuffer | null, number?, number?], void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const slot = ds.read<number>(DataStream.Type.UInt32);
        const buffer_id = deseralizeOptionalUint32(ds);
        const buffer = buffer_id ? profile.get(buffer_id) as TrackedGPUBuffer : null;
        const offset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdSetVertexBuffer(
            [slot, buffer, offset, size],
            pass
        );
    }
    public transformArgs(args: any, transformer: (obj: any) => any) {
        return [args[0], transformer(args[1]), args[2], args[3]];
    }
}