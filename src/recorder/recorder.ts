import { DataStream, downloadBinaryFile } from "../common/utils";
import wgi_Resource, { brandMap } from "./driver/res";
import { SingleRecord } from "./record/rcd";

enum RecorderState {
    Background,
    Preparing,
    Snapshot,
    Capturing,
    Saving,
    Expired
}

export default class Recorder {
    constructor() {
        this.state = RecorderState.Background;
    }
    public record(rcd: SingleRecord) {
        if (this.state != RecorderState.Capturing) return;
        this.records.push(rcd);
    }

    public capture() {
        this.state = RecorderState.Preparing;
    }

    public async snapshot() {
        // take snapshot of resources
        this.state = RecorderState.Capturing;
    }
    public save() {
        const ds = DataStream.createWithInternalBuffer();
        const u16 = DataStream.Type.UInt16;
        const u32 = DataStream.Type.UInt32;
        const f32 = DataStream.Type.Float;
        ds.write(u32, 0x696777); // magic number
        ds.write(u16, 0); // major version
        ds.write(u16, 1); // minor version
        const totalLength = ds.reserve(u32);

        ds.write(u32, this.records.length); // records count
        for (let i = 0; i < this.records.length; i++) {
            ds.write(u32, 0x646372); // rcd signature
            ds.write(u32, i); // record index
            this.records[i].serialize(ds);
        }

        const resources: Set<wgi_Resource> = new Set();
        for (const rcd of this.records) {
            rcd.deps.recursivelySumDependencies(resources);
        }
        for (const res of resources) {
            ds.write(u32, 0x736572); // res signature
            ds.write(u32, res.__id); // res id
            ds.write(u32, brandMap[res.__brand]); // res brand
            res.serialize(ds);
        }

        totalLength.write(ds.pos());

        downloadBinaryFile(ds.getClippedBuffer());
        this.state = RecorderState.Expired;
    }

    public frameStart(time: DOMHighResTimeStamp): [boolean, Promise<void>?] {
        if (this.state == RecorderState.Preparing) {
            this.state = RecorderState.Snapshot;
            return [true, this.snapshot()];
        } else {
            return [false, undefined];
        }
    }

    public frameEnd() {
        if (this.state == RecorderState.Capturing) {
            this.state = RecorderState.Saving;
            this.save();
        }
    }

    public state: RecorderState;
    private records: Array<SingleRecord> = [];
}

export const globalRecorder = new Recorder();