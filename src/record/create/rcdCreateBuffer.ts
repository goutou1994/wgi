import RcdBase, { RecordKind, RecordType } from "../rcd";
import wgi_GPUBuffer from "../../recorder/driver/GPUBuffer";
import { DataStream } from "../../common/utils";
import type TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import type ReplayProfile from "../../replay/profile";

export default class RcdCreateBuffer extends RcdBase<TrackedGPUDevice, [GPUBufferDescriptor], TrackedGPUBuffer> {
    
    constructor(args: [GPUBufferDescriptor], caller: TrackedGPUDevice, ret?: TrackedGPUBuffer) {
        super(args, caller, ret);
    }
    readonly __type: RecordType = RecordType.Create;
    readonly __kind: RecordKind = RecordKind.CreateBuffer;

    public play(): TrackedGPUBuffer {
        const buffer = this.caller!.__authentic!.createBuffer({
            size: this.args[0].size,
            usage: this.args[0].usage | GPUBufferUsage.COPY_SRC
        });
        this.ret!.__authentic = buffer;
        this.ret!.__creator = this.caller!;
        this.ret!.realUsage = this.args[0].usage;
        return this.ret!;
    }

    // public directPlay(args: [GPUBufferDescriptor], caller: GPUDevice): GPUBuffer {
    //     return caller.createBuffer(args[0]);
    // }

    public serialize(ds: DataStream) {
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].size);
        ds.write(DataStream.Type.UInt32, this.args[0].usage);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }

    public deserialize(ds: DataStream, profile: ReplayProfile): RcdCreateBuffer {
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const size = ds.read<number>(DataStream.Type.UInt32);
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const ret_id = ds.read<number>(DataStream.Type.UInt32);
        const tracked = new TrackedGPUBuffer();
        tracked.__id = ret_id;
        return new RcdCreateBuffer(
            [{ size, usage }],
            profile.get<TrackedGPUDevice>(device_id),
            profile.get<TrackedGPUBuffer>(ret_id)
        );
    }

}