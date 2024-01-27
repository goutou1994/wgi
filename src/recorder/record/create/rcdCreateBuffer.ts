import { RecordKind, RecordType, SingleRecord } from "../rcd";
import wgi_GPUBuffer from "../../driver/GPUBuffer";
import { DataStream } from "../../../common/utils";

export interface RcdCreateBufferDescriptor {
    buffer: wgi_GPUBuffer,
    desc: GPUBufferDescriptor
};

export default class RcdCreateBuffer extends SingleRecord {
    constructor(private desc: RcdCreateBufferDescriptor) {
        super();
        this.deps.add(desc.buffer);
    }
    readonly __type: RecordType = RecordType.Create;
    readonly __kind: RecordKind = RecordKind.CreateBuffer;

    public serialize(ds: DataStream) {
        ds.write(DataStream.Type.UInt32, this.__kind);
        ds.write(DataStream.Type.UInt32, this.desc.buffer.__id);
        ds.write(DataStream.Type.UInt32, this.desc.desc.size);
        ds.write(DataStream.Type.UInt32, this.desc.desc.usage);
    }
}