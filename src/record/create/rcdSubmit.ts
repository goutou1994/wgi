import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandBuffer from "../../tracked/GPUCommandBuffer";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import TrackedBase from "../../tracked/tracked";
import RcdBase, { RecordKind } from "../rcd";

type RawRcdSubmitArgs = [Iterable<GPUCommandBuffer>];
type RcdSubmitArgs = [Array<TrackedGPUCommandBuffer>];

export default class RcdSubmit extends RcdBase<TrackedGPUQueue, RcdSubmitArgs, void> {
    __kind = RecordKind.Submit;
    public play(): void {
        this.caller!.__authentic!.submit(this.args[0].map(cb => cb.__authentic!));
    }
    public serialize(ds: DataStream): void {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].length); // cb count
        for (let i = 0; i < this.args[0].length; i++) {
            ds.write(DataStream.Type.UInt32, this.args[0][i].__id); // cb
        }
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUQueue, RcdSubmitArgs, void> {
        const queue = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUQueue;
        const cbCount = ds.read<number>(DataStream.Type.UInt32);
        const cbs = [];
        for (let i = 0; i < cbCount; i++) {
            const cb = profile.get(ds.read<number>(DataStream.Type.UInt32)) as TrackedGPUCommandBuffer;
            cbs.push(cb);
        }
        
        return new RcdSubmit([cbs], queue);
    }

    public override transformArgs(args: RawRcdSubmitArgs, transformer: (obj: any) => TrackedBase<any>): RcdSubmitArgs {
        const transformed: Array<TrackedGPUCommandBuffer> = [];
        for (const cb of args[0]) {
            transformed.push(transformer(cb) as TrackedGPUCommandBuffer);
        }
        return [transformed];
    }
    
}
