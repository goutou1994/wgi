import { deseralizeOptionalUint32, seralizeOptionalUint32 } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";

type RcdDrawIndexedArgs = Parameters<GPURenderPassEncoder["drawIndexed"]>;

export default class RcdDrawIndexed extends RcdBase<TrackedGPURenderPassEncoder, RcdDrawIndexedArgs, void> {
    __kind = RecordKind.DrawIndexed;
    public play(): void {
        this.caller!.__authentic!.drawIndexed(...this.args);
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
        seralizeOptionalUint32(ds, this.args[4]);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPURenderPassEncoder, [indexCount: number, instanceCount?: number | undefined, firstIndex?: number | undefined, baseVertex?: number | undefined, firstInstance?: number | undefined], void> {
        const pass = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPURenderPassEncoder;
        const indexCount = ds.read<number>(DataStream.Type.UInt32);
        const instanceCount = deseralizeOptionalUint32(ds);
        const firstIndex = deseralizeOptionalUint32(ds);
        const baseVertex = deseralizeOptionalUint32(ds);
        const firstInstance = deseralizeOptionalUint32(ds);
        return new RcdDrawIndexed(
            [indexCount, instanceCount, firstIndex, baseVertex, firstInstance],
            pass
        );
    }
}
