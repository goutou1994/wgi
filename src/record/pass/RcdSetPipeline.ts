import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import RcdBase, { RecordKind } from "../rcd";

export default class RcdSetPipeline extends RcdBase<TrackedGPURenderPassEncoder, [TrackedGPURenderPipeline], void> {
    __kind = RecordKind.SetPipeline;
    public play(): void {
        this.caller!.__authentic!.setPipeline(this.args[0].__authentic!);
        this.caller!.__runtime!.pipeline = this.args[0];
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, [TrackedGPURenderPipeline], void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const pipeline = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPipeline;
        return new RcdSetPipeline(
            [pipeline],
            pass
        );
    }
    public transformArgs(args: any, transformer: (obj: any) => any) {
        return [transformer(args[0])];
    }
}