import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdSetViewportArgs = Parameters<GPURenderPassEncoder["setViewport"]>;

export default class RcdSetViewport extends RcdBase<TrackedGPURenderPassEncoder, RcdSetViewportArgs, void> {
    __kind = RecordKind.SetViewport;
    public play(): void {
        this.caller!.__authentic!.setViewport(...this.args);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        for (let i = 0; i < 4; i++) {
            ds.write(DataStream.Type.UInt32, this.args[i]);
        }
        for (let i = 4; i < 6; i++) {
            ds.write(DataStream.Type.Float, this.args[i]);
        }
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, [x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number], void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const args: number[] = [];
        for (let i = 0; i < 4; i++) {
            args.push(ds.read(DataStream.Type.UInt32));
        }
        for (let i = 4; i < 6; i++) {
            args.push(ds.read(DataStream.Type.Float));
        }
        return new RcdSetViewport(
            args as any,
            pass
        );
    }
}
