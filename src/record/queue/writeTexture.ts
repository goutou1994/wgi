import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import TrackedGPUTexture from "../../tracked/GPUTexture";
import RcdBase, { RecordKind } from "../rcd";

type RcdWriteTextureArgs = [
    destination: {
        aspect?: GPUTextureAspect,
        mipLevel?: number,
        origin?: GPUOrigin3D,
        texture: TrackedGPUTexture
    },
    data: ArrayBuffer | ArrayBufferView,
    dataLayout: {
        offset?: number,
        bytesPerRow?: number,
        rowsPerImage?: number
    },
    size: GPUExtent3DStrict
];

export default class RcdWriteTexture extends RcdBase<TrackedGPUQueue, RcdWriteTextureArgs, void> {
    __kind = RecordKind.WriteTexture;
    public play(): void {
        this.caller!.__authentic!.writeTexture(...this.transformArgs(
            this.args,
            tracked => tracked.__authentic
        ));
    }
    public serialize(ds: DataStream): void {
        const args = this.transformArgs(
            this.args,
            tracked => tracked.__id
        );
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, args[0])
        ds.write(DataStream.Type.UInt32, this.args[1].byteLength);
        ds.writeChunk(this.args[1]);
        serializeObject(ds, args[2])
        serializeObject(ds, args[3])
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUQueue, RcdWriteTextureArgs, void> {
        const queue = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUQueue;
        const dest = deserializeObject(ds) as RcdWriteTextureArgs["0"];
        const byteLength = ds.read<number>(DataStream.Type.UInt32);
        const buffer = ds.readChunk(byteLength);
        const dataLayout = deserializeObject(ds) as RcdWriteTextureArgs["2"];
        const size = deserializeObject(ds) as RcdWriteTextureArgs["3"];
        return new RcdWriteTexture(
            [dest, buffer, dataLayout, size],
            queue
        );
    }
    public transformArgs(args: any, transformer: (obj: any) => any): [any, any, any, any] {
        return [
            {
                ...args[0],
                texture: transformer(args[0].texture)
            },
            args[1], args[2], args[3]
        ];
    }
}
