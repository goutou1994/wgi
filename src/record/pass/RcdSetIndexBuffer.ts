import { deseralizeOptionalUint32, deserializeString, seralizeOptionalUint32, serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdSetIndexBufferArgs = [
    buffer: TrackedGPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number
];

export default class RcdSetIndexBuffer extends RcdBase<TrackedGPURenderPassEncoder, RcdSetIndexBufferArgs, void> {
    __kind = RecordKind.SetIndexBuffer;
    public play(): void {
        this.caller!.__authentic!.setIndexBuffer(
            this.args[0].__authentic!,
            this.args[1],
            this.args[2],
            this.args[3],
        );
        this.caller!.__runtime!.ib = {
            buffer: this.args[0],
            format: this.args[1],
            offset: this.args[2] ?? 0,
            size: this.args[3] ?? this.args[0].__authentic!.size - (this.args[2] ?? 0)
        };
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        serializeString(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, RcdSetIndexBufferArgs, void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const buffer = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUBuffer;
        const format = deserializeString(ds) as GPUIndexFormat;
        const offset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdSetIndexBuffer(
            [buffer, format, offset, size],
            pass
        );
    }

    public transformArgs(args: any, transformer: (obj: any) => any) {
        return [
            transformer(args[0]),
            args[1], args[2], args[3]
        ];
    }
}