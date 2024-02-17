import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedGPUTexture from "../../tracked/GPUTexture";
import RcdBase, { RecordKind } from "../rcd";

interface CopyTextureObject {
    texture: TrackedGPUTexture;
    apsect?: GPUTextureAspect;
    mipLevel?: number;
    origin?: GPUOrigin3D;
}

type CopyTextureArgs = [
    source: CopyTextureObject,
    destination: CopyTextureObject,
    copySize: GPUExtent3DStrict
];

export default class RcdCopyTextureToTexture extends RcdBase<TrackedGPUCommandEncoder, CopyTextureArgs, void> {
    __kind = RecordKind.CopyTextureToTexture;
    public play(): void {
        this.caller!.__authentic!.copyTextureToTexture(
            ...this.transformArgs(
                this.args,
                tracked => tracked.__authentic
            )
        );
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        const args = this.transformArgs(this.args, tracked => tracked.__id);
        serializeObject(ds, args[0]);
        serializeObject(ds, args[1]);
        serializeObject(ds, args[2]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUCommandEncoder, CopyTextureArgs, void> {
        const encoder = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandEncoder;
        const source = deserializeObject(ds) as CopyTextureObject;
        const destination = deserializeObject(ds) as CopyTextureObject;
        const copySize = deserializeObject(ds) as GPUExtent3DStrict;
        const rawArgs = [source, destination, copySize];
        const args = this.transformArgs(rawArgs, id => profile.get(id));
        return new RcdCopyTextureToTexture(
            args,
            encoder
        );
    }
    public transformArgs(args: any, transformer: (obj: any) => any): [any, any, any] {
        return [
            {
                ...args[0],
                texture: transformer(args[0].texture)
            },
            {
                ...args[1],
                texture: transformer(args[1].texture)
            },
            args[2]
        ];
    }
}