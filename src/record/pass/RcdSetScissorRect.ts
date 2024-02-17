import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdSetScissorRectArgs = Parameters<GPURenderPassEncoder["setScissorRect"]>;

export default class RcdSetScissorRect extends RcdBase<TrackedGPURenderPassEncoder, RcdSetScissorRectArgs, void> {
    __kind = RecordKind.SetScissorRect;
    public play(): void {
        this.caller!.__authentic!.setScissorRect(...this.args);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        for (let i = 0; i < 4; i++) {
            ds.write(DataStream.Type.UInt32, this.args[i]);
        }
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, RcdSetScissorRectArgs, void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const args: number[] = [];
        for (let i = 0; i < 4; i++) {
            args.push(ds.read(DataStream.Type.UInt32));
        }
        return new RcdSetScissorRect(
            args as any,
            pass
        );
    }
}
