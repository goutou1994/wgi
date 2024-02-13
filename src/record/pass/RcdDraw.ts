import { deseralizeOptionalUint32, seralizeOptionalUint32 } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdDrawArgs = [
    number,
    number?,
    number?,
    number?
];

export default class RcdDraw extends RcdBase<TrackedGPURenderPassEncoder, RcdDrawArgs, void> {
    __kind = RecordKind.Draw;
    public play(): void {
        this.caller!.__authentic!.draw(...this.args);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, RcdDrawArgs, void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const vertexCount = ds.read<number>(DataStream.Type.UInt32);
        const instanceCount = deseralizeOptionalUint32(ds);
        const firstVertex = deseralizeOptionalUint32(ds);
        const firstInstance = deseralizeOptionalUint32(ds);
        return new RcdDraw([vertexCount, instanceCount, firstVertex, firstInstance], pass);
    }
}
