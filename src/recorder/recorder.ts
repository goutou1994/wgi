import { DataStream, downloadBinaryFile } from "../common/utils";
import wgi_GPUBase, { brandMap, wgiResMap } from "./driver/gpubase";
import RcdBase from "../record/rcd";
import TrackedBase from "../tracked/tracked";

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
            const rcd = this.records[i];
            ds.write(u32, 0x646372); // rcd signature
            ds.write(u32, i); // record index
            ds.write(u32, rcd.__kind);
            this.records[i].serialize(ds);
        }
        
        
        ds.write(u32, this.trackedMap.size); // res count
        for (const [, tracked] of this.trackedMap) {
            ds.write(u32, 0x736572); // res signature
            ds.write(u32, tracked.__id); // res id
            ds.write(u32, tracked.__kind); // res brand
            tracked.serialize(ds);
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

    public get capturing() {
        return this.state === RecorderState.Capturing;
    }

    private recursivelyGetTrackedAndTakeSnapshot<T>(obj: T): TrackedBase<any> | T {
        if (wgi_GPUBase.is_wgi(obj)) {
            let tracked = this.trackedMap.get(obj.__id);
            if (tracked) return tracked;
            const trackedCtor = obj.getTrackedType();
            tracked = trackedCtor.prototype.fromAuthentic(obj) as TrackedBase<any>;
            this.trackedMap.set(obj.__id, tracked);

            tracked.takeSnapshot(1);
            const deps = tracked.getSnapshotDepIds();
            for (const depId of deps) {
                let depTracked = this.trackedMap.get(depId);
                if (!depTracked) {
                    const dep = wgiResMap.get(depId)?.deref();
                    if (dep) {
                        this.recursivelyGetTrackedAndTakeSnapshot(dep);
                    }
                }
            }

            return tracked;
        } else {
            return obj;
        }
    }

    public processRcd(
        RcdType: any,
        caller: any,
        args: Array<any>
    ) {
        if (this.state === RecorderState.Capturing) {
            caller = this.recursivelyGetTrackedAndTakeSnapshot(caller);
            const rcd = new RcdType(args, caller);
            this.records.push(rcd);
            const ret = rcd.play();
            if (ret) {
                ret.markAsTemporary();
                this.trackedMap.set(ret.__id, ret);
            }
        } else {
            return RcdType.prototype.directPlay(args, caller);
        }
    }

    public state: RecorderState;
    public trackedMap: Map<UniversalResourceId, TrackedBase<any>> = new Map();
    private records: Array<RcdBase<any, any, any>> = [];
}

export const globalRecorder = new Recorder();