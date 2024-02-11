import { deserializeObject, serializeObject } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUTexture from "../../tracked/GPUTexture";
import TrackedGPUTextureView from "../../tracked/GPUTextureView";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdCreateView extends RcdBase<TrackedGPUTexture, [GPUTextureViewDescriptor?], TrackedGPUTextureView> {
    __kind = RecordKind.CreateView;
    public play(): TrackedGPUTextureView {
        const view = this.caller!.__authentic!.createView(...this.args);
        this.ret!.__authentic = view;
        this.ret!.__creator = this.caller!;
        this.ret!.__creatorRcd = this;
        return this.ret!;
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUTexture, [GPUTextureViewDescriptor?], TrackedGPUTextureView> {
        const texture = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUTexture;
        const desc = deserializeObject(ds) as GPUTextureViewDescriptor | undefined;
        const ret = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUTextureView;
        return new RcdCreateView([ desc ], texture, ret);
    }
}
