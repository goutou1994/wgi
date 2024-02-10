import { deserializeString, serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUTexture from "../../tracked/GPUTexture";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateTexture extends RcdBase<TrackedGPUDevice, [GPUTextureDescriptor], TrackedGPUTexture> {
    __kind = RecordKind.CreateTexture;
    public play(): TrackedGPUTexture {
        const texture = this.caller!.__authentic!.createTexture({
            ...this.args[0],
            usage: this.args[0].usage | GPUTextureUsage.COPY_SRC
        });
        this.ret!.__authentic = texture;
        this.ret!.__creator = this.caller!;
        this.ret!.realUsage = this.args[0].usage;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        const a = this.args[0];
        serializeString(ds, a.label);
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        const sizes = [];
        if ("width" in a.size) {
            sizes.push(a.size.width);
            sizes.push(a.size.height ?? 1);
            sizes.push(a.size.depthOrArrayLayers ?? 1);
        } else {
            sizes.push(...a.size);
        }
        ds.write(DataStream.Type.UInt32, sizes[0]); // width
        ds.write(DataStream.Type.UInt32, sizes[1]); // height
        ds.write(DataStream.Type.UInt32, sizes[2]); // depthOrArrayLayers
        ds.write(DataStream.Type.UInt32, a.mipLevelCount ?? 1);
        ds.write(DataStream.Type.UInt32, a.sampleCount ?? 1);
        serializeString(ds, a.dimension ?? "2d");
        serializeString(ds, a.format);
        ds.write(DataStream.Type.UInt32, a.usage);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUDevice, [GPUTextureDescriptor], TrackedGPUTexture> {
        const label = deserializeString(ds);
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const width = ds.read<number>(DataStream.Type.UInt32);
        const height = ds.read<number>(DataStream.Type.UInt32);
        const depthOrArrayLayers = ds.read<number>(DataStream.Type.UInt32);
        const mipLevelCount = ds.read<number>(DataStream.Type.UInt32);
        const sampleCount = ds.read<number>(DataStream.Type.UInt32);
        const dimension = deserializeString(ds) as GPUTextureDimension;
        const format = deserializeString(ds) as GPUTextureFormat;;
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const ret_id = ds.read<number>(DataStream.Type.UInt32);

        const tracked = new TrackedGPUTexture();
        tracked.__id = ret_id;
        return new RcdCreateTexture(
            [{
                label,
                size: [width, height, depthOrArrayLayers],
                mipLevelCount, sampleCount,
                dimension, format, usage
            }],
            profile.get<TrackedGPUDevice>(device_id),
            profile.get<TrackedGPUTexture>(ret_id)
        );
    }
}