import { DataStream } from "../common/utils";
import wgi_GPUBase from "../recorder/driver/gpubase";
import ReplayProfile from "../replay/profile";
import type TrackedBase from "../tracked/tracked";
import RcdBase, { RecordKind } from "./rcd";

type RawRcdDebugResArgs = Array<{
    res: wgi_GPUBase
}>;

type RcdDebugResArgs = Array<{
    res: TrackedBase<any>
}>;

export default class RcdDebugRes extends RcdBase<void, RcdDebugResArgs, void> {
    __kind = RecordKind.DebugRes;

    public play(): void { }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.args[0].res.__id);
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<void, RcdDebugResArgs, void> {
        const resId = ds.read<number>(DataStream.Type.UInt32);
        const res = profile.get(resId);
        return new RcdDebugRes([{res}]);
    }

    public override transformArgs(args: RawRcdDebugResArgs, transformer: (obj: wgi_GPUBase) => TrackedBase<any>): RcdDebugResArgs {
        return [{
            res: transformer(args[0].res)
        }];
    }

    
}
