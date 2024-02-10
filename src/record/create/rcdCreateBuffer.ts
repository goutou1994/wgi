import RcdBase, { RecordKind } from "../rcd";
import wgi_GPUBuffer from "../../recorder/driver/GPUBuffer";
import { DataStream } from "../../common/utils";
import type TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import type ReplayProfile from "../../replay/profile";
import { deserializeString, serializeString } from "../../common/serialize";

export default class RcdCreateBuffer extends RcdBase<TrackedGPUDevice, [GPUBufferDescriptor], TrackedGPUBuffer> {
    
    constructor(args: [GPUBufferDescriptor], caller: TrackedGPUDevice, ret?: TrackedGPUBuffer) {
        super(args, caller, ret);
    }
    readonly __kind: RecordKind = RecordKind.CreateBuffer;

    public play(): TrackedGPUBuffer {
        const buffer = this.caller!.__authentic!.createBuffer({
            ...this.args[0],
            usage: this.args[0].usage | GPUBufferUsage.COPY_SRC
        });
        this.ret!.__authentic = buffer;
        this.ret!.__creator = this.caller!;
        this.ret!.realUsage = this.args[0].usage;
        return this.ret!;
    }

    public serialize(ds: DataStream) {
        serializeString(ds, this.args[0].label);
        ds.write(DataStream.Type.UInt32, this.caller!.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].size);
        ds.write(DataStream.Type.UInt32, this.args[0].usage);
        ds.write(DataStream.Type.UInt32, this.ret!.__id);
    }

    public deserialize(ds: DataStream, profile: ReplayProfile): RcdCreateBuffer {
        const label = deserializeString(ds);
        const device_id = ds.read<number>(DataStream.Type.UInt32);
        const size = ds.read<number>(DataStream.Type.UInt32);
        const usage = ds.read<number>(DataStream.Type.UInt32);
        const ret_id = ds.read<number>(DataStream.Type.UInt32);
        const tracked = new TrackedGPUBuffer();
        tracked.__id = ret_id;
        return new RcdCreateBuffer(
            [{ label, size, usage }],
            profile.get<TrackedGPUDevice>(device_id),
            profile.get<TrackedGPUBuffer>(ret_id)
        );
    }

}