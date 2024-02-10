import { DataStream } from "./utils";

const encoder = new TextEncoder();
export function serializeString(ds: DataStream, str?: string) {
    if (str) {
        const strBuffer = encoder.encode(str);
        ds.write(DataStream.Type.UInt32, strBuffer.byteLength);
        ds.writeChunk(strBuffer);
    } else {
        ds.write(DataStream.Type.UInt32, 0);
    }
}

const decoder = new TextDecoder();
export function deserializeString(ds: DataStream): string {
    const length = ds.read<number>(DataStream.Type.UInt32);
    if (length == 0) {
        return "";
    } else {
        const chunk = ds.readChunk(length);
        return decoder.decode(chunk);
    }
}

export function serializeObject(ds: DataStream, obj?: Object) {
    const str = obj ? JSON.stringify(obj) : "";
    serializeString(ds, str);
}

export function deserializeObject(ds: DataStream): Object | undefined {
    const str = deserializeString(ds);
    return str.length > 0 ? JSON.parse(str) : undefined;
}