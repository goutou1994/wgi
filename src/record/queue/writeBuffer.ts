import { deseralizeOptionalUint32, seralizeOptionalUint32 } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import RcdBase, { RecordKind } from "../rcd";

type RcdWriteBufferArgs = [
    TrackedGPUBuffer,
    number,
    BufferSource | SharedArrayBuffer,
    number?,
    number?
];

export default class RcdWriteBuffer extends RcdBase<TrackedGPUQueue, RcdWriteBufferArgs, void> {
    __kind = RecordKind.WriteBuffer;
    public play(): void {
        this.caller!.__authentic!.writeBuffer(
            this.args[0].__authentic!,
            this.args[1],
            this.args[2],
            this.args[3],
            this.args[4]
        );
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        ds.write(DataStream.Type.UInt32, this.args[1]);
        ds.write(DataStream.Type.UInt32, this.args[2].byteLength);
        ds.writeChunk(this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
        seralizeOptionalUint32(ds, this.args[4]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUQueue, RcdWriteBufferArgs, void> {
        const queue = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUQueue;
        const buffer = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUBuffer;
        const bufferOffset = ds.read<number>(DataStream.Type.UInt32);
        const srcBufferLength = ds.read<number>(DataStream.Type.UInt32);
        const srcBuffer = ds.readChunk(srcBufferLength);
        const dataOffset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdWriteBuffer(
            [buffer, bufferOffset, srcBuffer, dataOffset, size],
            queue
        );
    }

    public transformArgs(args: any, transformer: (obj: any) => any) {
        return [
            transformer(args[0]),
            args[1], args[2], args[3], args[4]
        ];
    }
}