import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdSetStencilReferenceArgs = Parameters<GPURenderPassEncoder["setStencilReference"]>;

export default class RcdSetStencilReference extends RcdBase<TrackedGPURenderPassEncoder, RcdSetStencilReferenceArgs, void> {
    __kind = RecordKind.SetStencilReference;
    public play(): void {
        this.caller!.__authentic!.setStencilReference(...this.args);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, RcdSetStencilReferenceArgs, void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const ref = ds.read<number>(DataStream.Type.UInt32);
        return new RcdSetStencilReference(
            [ ref ], pass
        );
    }
}
