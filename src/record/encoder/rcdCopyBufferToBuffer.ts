import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import type TrackedBase from "../../tracked/tracked";
import RcdBase, { RecordKind } from "../rcd";

type RawRcdCreateBufferArgs = Parameters<GPUCommandEncoder["copyBufferToBuffer"]>;
type RcdCreateBufferArgs = [TrackedGPUBuffer, number, TrackedGPUBuffer, number, number];

export default class RcdCopyBufferToBuffer
    extends RcdBase<TrackedGPUCommandEncoder, RcdCreateBufferArgs, void> {
    __kind = RecordKind.CopyBufferToBuffer;
    public play(): void {
        this.caller!.__authentic!.copyBufferToBuffer(
            this.args[0].__authentic!,
            this.args[1],
            this.args[2].__authentic!,
            this.args[3], this.args[4]
        );
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        ds.write(DataStream.Type.UInt32, this.args[1]);
        ds.write(DataStream.Type.UInt32, this.args[2].__id);
        ds.write(DataStream.Type.UInt32, this.args[3]);
        ds.write(DataStream.Type.UInt32, this.args[4]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUCommandEncoder, RcdCreateBufferArgs, void> {
        const encoder = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandEncoder;
        const src = profile.get(ds.read<number>(DataStream.Type.UInt32));
        const srcOffset = ds.read<number>(DataStream.Type.UInt32);
        const dst = profile.get(ds.read<number>(DataStream.Type.UInt32));
        const dstOffset = ds.read<number>(DataStream.Type.UInt32);
        const size = ds.read<number>(DataStream.Type.UInt32);
        return new RcdCopyBufferToBuffer([src, srcOffset, dst, dstOffset, size], encoder);
    }

    public override transformArgs(args: RawRcdCreateBufferArgs, transformer: (obj: any) => TrackedBase<any>): RcdCreateBufferArgs {
        return [
            transformer(args[0]),
            args[1],
            transformer(args[2]),
            args[3], args[4]
        ];
    }
    
}