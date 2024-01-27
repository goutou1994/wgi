import { DataStream } from "./utils";

const encoder = new TextEncoder();
export function serializeString(ds: DataStream, str: string) {
    if (str) {
        const strBuffer = encoder.encode(str);
        ds.write(DataStream.Type.UInt32, strBuffer.byteLength);
        ds.writeChunk(strBuffer);
    } else {
        ds.write(DataStream.Type.UInt32, 0);
    }
}