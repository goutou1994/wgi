import dateFormat from "dateformat";

export class DataStream {
    private buffer: ArrayBuffer;
    private byteOffset: number = 0;
    private bufferInternal: boolean = false;
    private _size: number;
    private head: number = 0;

    // buffer views
    private floatView!: Float32Array;
    private uint32View!: Uint32Array;
    private uint16View!: Uint16Array;
    constructor(buffer: ArrayBuffer, byteOffset: number = 0) {
        this.buffer = buffer;
        this.byteOffset = byteOffset;
        this._size = buffer.byteLength;
        this.makeBufferViews();
    }
    
    private makeBufferViews() {
        this.floatView = new Float32Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.Float]));
        this.uint32View = new Uint32Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.UInt32]));
        this.uint16View = new Uint16Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.UInt16]));
    }

    static createWithInternalBuffer(): DataStream {
        const stream = new DataStream(
            new ArrayBuffer(128 * 1024), // 128KB
            0
        );
        stream.bufferInternal = true;
        return stream;
    }

    get size() { return this._size; }

    private testSufficient(size: number, alignment: number) {
        const misalign = (alignment - this.head % alignment) % alignment;
        if (this.head + misalign + size > this._size) {
            if (this.bufferInternal) {
                // enlarge internal buffer
                let newSize = this._size;
                while (newSize < this.head + misalign + size) {
                    newSize *= 2;
                }
                const newBuffer = new ArrayBuffer(newSize);
                new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
                this.buffer = newBuffer;
                this._size = this.buffer.byteLength;
                this.makeBufferViews();
            } else {
                return -1;
            }
        }
        return misalign;
    }

    private testSufficientByType(type: DataStream.Type) {
        return this.testSufficient(
            DataStream.TypeSize[type],
            DataStream.TypeAlignment[type]
        );
    }

    public read<T>(type: DataStream.Type): T {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0) throw "[DataStream]read buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        const elementCount = 1; // 如果有需要再启用
        const ret = view[align_offset];
        this.head += DataStream.TypeSize[type];
        return ret as T;
    }
    public write<T>(type: DataStream.Type, value: NonNullable<T>): void {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0) throw "[DataStream]write buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        view[align_offset] = value;
        this.head += DataStream.TypeSize[type];
    }

    /**
     * 跳过一个位置，以后再填写。
     */
    public reserve<T>(type: DataStream.Type): { write(value: T): void } {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0) throw "[DataStream]write buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        this.head += DataStream.TypeSize[type];
        return {
            write(value: T) {
                view[align_offset] = value;
            }
        }
    }

    public readChunk(length: number): ArrayBuffer {
        if (this.head + length > this._size) throw "[DataStream]read chunk out of bound.";
        const ret = this.buffer.slice(this.head, this.head + length);
        this.head += length;
        return ret;
    }

    public writeChunk(chunk: BufferSource) {
        this.testSufficient(chunk.byteLength, 1);
        // @ts-ignore
        const buffer: ArrayBuffer = chunk.buffer ?? chunk;
        // @ts-ignore
        const byteOffset: number = chunk.offset ?? 0; 
        new Uint8Array(this.buffer, this.head).set(new Uint8Array(buffer, byteOffset, chunk.byteLength));
        this.head += chunk.byteLength;
    }
    
    public align(alignment: number): void {
        const misalign = this.testSufficient(0, alignment);
        if (misalign < 0) throw "[DataStream]align buffer out of bound.";
        this.head += misalign;
    }

    public end() {
        return this.head === this._size;
    }

    public pos() {
        return this.head;
    }

    public getClippedBuffer() {
        return this.buffer.slice(0, this.head);
    }
}
export namespace DataStream {
    export enum Type {
        Float = 0,
        UInt32 = 1,
        UInt16 = 2
    }
    export const TypeAlignment = {
        [Type.Float]: 4,
        [Type.UInt32]: 4,
        [Type.UInt16]: 2,
    }
    export const TypeSize = {
        [Type.Float]: 4,
        [Type.UInt32]: 4,
        [Type.UInt16]: 2,
    }
}

export function downloadBinaryFile(buffer: Uint8Array) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    // @ts-ignore
    a.style = "display: none";
    const blob = new Blob([buffer], { type: "octet/binary" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const now = new Date();
    a.download = `wgi_${dateFormat(now, "yyyy_mm_dd_HH_MM_ss")}`;
    a.click();
    window.URL.revokeObjectURL(url);
}