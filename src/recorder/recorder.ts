import { DataStream, downloadBinaryFile } from "../common/utils";
import wgi_GPUBase, { wgiResMap } from "./driver/gpubase";
import RcdBase from "../record/rcd";
import TrackedBase from "../tracked/tracked";
import wgi_GPUDevice from "./driver/GPUDevice";

enum RecorderState {
    Background,
    Preparing,
    Snapshot,
    Capturing,
    Saving,
    Expired
}


// There a problem, recorder doesn't know how to choose GPUDevcie for snapshot.
export default class Recorder {
    constructor(public device: wgi_GPUDevice) {
        this.state = RecorderState.Background;
    }

    public capture() {
        this.state = RecorderState.Preparing;
    }

    public async snapshot() {
        // take snapshot of resources
        this.state = RecorderState.Capturing;
    }
    public async save() {
        await Promise.all(this.snapshotPromises);
        this.snapshotPromises = [];

        const ds = DataStream.createWithInternalBuffer();
        const u16 = DataStream.Type.UInt16;
        const u32 = DataStream.Type.UInt32;
        const f32 = DataStream.Type.Float;
        ds.write(u32, 0x696777); // magic number
        ds.write(u16, 0); // major version
        ds.write(u16, 1); // minor version
        const totalLength = ds.reserve(u32);

        ds.write(u32, this.trackedMap.size); // res count
        for (const [, tracked] of this.trackedMap) {
            ds.write(u32, 0x736572); // res signature
            ds.write(u32, tracked.__id); // res id
            ds.write(u32, tracked.__kind); // res brand
            if (tracked.__temporary) {
                ds.write(u32, 0x1);
            } else {
                ds.write(u32, 0);
                tracked.serialize(ds);
            }
        }

        ds.write(u32, this.records.length); // records count
        for (let i = 0; i < this.records.length; i++) {
            const rcd = this.records[i];
            ds.write(u32, 0x646372); // rcd signature
            ds.write(u32, i); // record index
            ds.write(u32, rcd.__kind);
            this.records[i].serialize(ds);
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

    private recursivelyGetTrackedAndTakeSnapshot<T>(obj: T, encoder: GPUCommandEncoder, newTracks: Array<TrackedBase<any>>): TrackedBase<any> | T {
        if (wgi_GPUBase.is_wgi(obj)) {
            let tracked = this.trackedMap.get(obj.__id);
            if (tracked) return tracked;
            const trackedCtor = obj.getTrackedType();
            tracked = trackedCtor.prototype.fromAuthentic(obj) as TrackedBase<any>;
            this.trackedMap.set(obj.__id, tracked);

            if (!tracked.__temporary) {
                tracked.takeSnapshotBeforeSubmit(encoder);
                newTracks.push(tracked);
                const deps = tracked.getDeps();
                for (const depAuthentic of deps) {
                    const depTracked = this.trackedMap.get(depAuthentic.__id);
                    if (!depTracked) {
                        this.recursivelyGetTrackedAndTakeSnapshot(depAuthentic, encoder, newTracks);
                    }
                }
            }
            
            return tracked;
        } else {
            return obj;
        }
    }

    private snapshotPromises: Array<Promise<any>> = [];
    public processRcd(
        RcdType: any,
        caller: any,
        args: Array<any>,
        directPlay: () => any
    ) {
        if (this.state === RecorderState.Capturing) {
            const newTracks: Array<TrackedBase<any>> = [];
            const encoder = this.device.next.createCommandEncoder();
            
            // collect tracks
            caller = this.recursivelyGetTrackedAndTakeSnapshot(caller, encoder, newTracks);
            const rcd = new RcdType(
                RcdType.prototype.transformArgs(
                    args,
                    (obj: wgi_GPUBase) => this.recursivelyGetTrackedAndTakeSnapshot(obj, encoder, newTracks)
                ),
                caller
            );

            this.device.queue.submit([encoder.finish()]);
            const gpuDone = this.device.queue.onSubmittedWorkDone();
            for (const newTracked of newTracks) {
                this.snapshotPromises.push(
                    gpuDone.then(() => newTracked.takeSnapshotAfterSubmit())
                );
            }

            this.records.push(rcd);
            const ret = directPlay();
            if (ret) {
                const trackedRet: TrackedBase<any> = ret.getTrackedType().prototype.fromAuthentic(ret);
                rcd.ret = trackedRet;
                trackedRet.markAsTemporary();
                this.trackedMap.set(trackedRet.__id, trackedRet);
            }
        } else {
            return directPlay();
        }
    }

    public state: RecorderState;
    public trackedMap: Map<UniversalResourceId, TrackedBase<any>> = new Map();
    private records: Array<RcdBase<any, any, any>> = [];
}


export let globalRecorder: Recorder;
export function createGlobalRecorder(device: wgi_GPUDevice) {
    globalRecorder = new Recorder(device);
}