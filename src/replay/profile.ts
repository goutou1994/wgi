import { DataStream } from "../common/utils";
import TrackedBase from "../tracked/tracked";
import * as version from "../common/version";
import { trackedCtorMap } from "./utils/trackedCtor";
import { rcdCtorMap } from "./utils/rcdCtor";
import RcdBase, { RecordKind } from "../record/rcd";
import TrackedGPUDevice from "../tracked/GPUDevice";
import { brandMap } from "../common/brand";
import { gunzipSync, unzipSync } from "fflate";

type logger = (msg: string) => void;

export default class ReplayProfile {
    constructor() { }

    public setLogger(success?: logger, warn?: logger, error?: logger) {
        this.logSuccess = success;
        this.logWarn = warn;
        this.logError = error;
    }

    public deserialize(compressed: ArrayBuffer) {
        const rawView = gunzipSync(new Uint8Array(compressed));
        const raw = rawView.buffer.slice(rawView.byteOffset);

        const ds = new DataStream(raw);
        const u16 = DataStream.Type.UInt16;
        const u32 = DataStream.Type.UInt32;
        const f32 = DataStream.Type.Float;

        if (ds.read(u32) !== 0x696777) { // magic number
            throw "Not a wgi capture file.";
        }
        const major = ds.read(u16);
        const minor = ds.read(u16);

        if (major !== version.major) {
            throw `Incompatible capture file version: ${major}.x, viewer version: ${version.major}.x`;
        }
        if (minor !== version.minor) {
            this.logWarn?.("Capture file minor version mismatch, may cause unpredictable problems.");
        }

        const totalLength = ds.read<number>(u32);
        if (totalLength > raw.byteLength) {
            throw `File size mismatch.`;
        }
        
        const resCount = ds.read<number>(u32);
        for (let i = 0; i < resCount; i++) {
            if (ds.read(u32) !== 0x736572) {
                throw "Corrupted capture file.";
            }
            const id = ds.read<UniversalResourceId>(u32);
            const kind = ds.read<number>(u32) as brandMap;
            const temporary = !!ds.read(u32);
            const Ctor = trackedCtorMap[kind];
            const tracked = new Ctor();
            tracked.__id = id;
            if (!temporary) {
                tracked.deserialize(ds);
            }
            this.trackedMap.set(id, tracked);
        }

        const rcdCount = ds.read<number>(u32);
        for (let i = 0; i < rcdCount; i++) {
            if (ds.read(u32) !== 0x646372) {
                throw "Corrupted capture file.";
            }
            const index = ds.read<number>(u32); // ignored
            const kind = ds.read<number>(u32) as RecordKind;
            const Ctor = rcdCtorMap[kind];
            if (!Ctor) {
                throw "Unregistered record kind: " + RecordKind[kind];
            }
            const rcd = Ctor.prototype.deserialize(ds, this);
            this.rcds.push(rcd);
        }
    }

    private initialRestored: boolean = false;
    public device?: GPUDevice;
    public async restore() {
        // delete snapshots
        this.trackedMap.forEach(tracked => tracked.__snapshot = undefined);
        
        // find GPUDevice
        let trackedDevice: TrackedGPUDevice | undefined;
        for (const tracked of this.trackedMap.values()) {
            if (tracked.__kind === brandMap.GPUDevice) {
                trackedDevice = tracked;
                break;
            }
        }

        if (!trackedDevice) {
            this.logWarn?.("No GPUDevice found, cannot restore resources.");
            return;
        }
        
        // destroy GPUDevice, thus should destroy all children resources.
        this.device = undefined;
        trackedDevice.__authentic?.destroy();

        // delete authentics
        this.trackedMap.forEach(tracked => tracked.__authentic = undefined);
        
        // restore device first, to create an encoder for others
        await trackedDevice.restore(this);
        const device = trackedDevice.__authentic!;
        this.device = device;
        const encoder = device.createCommandEncoder();

        // restore every tracked resource,
        // existance of authentic indicates it's already restored
        const tracks: Array<TrackedBase<any>> = [];
        this.trackedMap.forEach(tracked => tracks.push(tracked));
        for (const tracked of tracks) {
            if (!tracked.__authentic && tracked.__initialSnapshot) {
                await tracked.restore(this, encoder);
            }
        }

        // submit and wait for it to be done.
        const cb = encoder.finish();
        device.queue.submit([cb]);
        return device.queue.onSubmittedWorkDone().then(() => {
            this.initialRestored = true;
        });
    }

    private currentRcdId: number | null = null;
    public async replayTo(rcdId: number) {
        rcdId = Math.min(rcdId, this.rcds.length);

        // restore to initial state if necessary
        if (rcdId !== this.currentRcdId && !this.initialRestored) {
            await this.restore();
        }

        if (rcdId !== -1) {
            this.initialRestored = false;
        }
        this.currentRcdId = rcdId;

        // play by order
        for (let i = 0; i <= rcdId; i++) {
            const rcd = this.rcds[i];
            rcd.play();
        }

        // find GPUDevice
        let trackedDevice: TrackedGPUDevice | undefined;
        for (const tracked of this.trackedMap.values()) {
            if (tracked.__kind === brandMap.GPUDevice) {
                trackedDevice = tracked;
                break;
            }
        }

        if (!trackedDevice) {
            this.logWarn?.("No GPUDevice found, cannot take snapshots.");
            return;
        }

        // create an encoder for snapshot
        const device = trackedDevice.__authentic!;
        const encoder = device.createCommandEncoder();

        const tracks: Array<TrackedBase<any>> = [];
        this.trackedMap.forEach(tracked => tracks.push(tracked));
        for (const tracked of tracks) {
            if (tracked.__authentic) {
                tracked.takeSnapshotBeforeSubmit(encoder, this);
            }
        }
        
        device.queue.submit([encoder.finish()]);
        const gpuDone = device.queue.onSubmittedWorkDone();
        const p: Array<Promise<any>> = [];

        for (const tracked of tracks) {
            if (tracked.__authentic) {
                p.push(gpuDone.then(() => tracked.takeSnapshotAfterSubmit()));
            }
        }
        return Promise.all(p);
    }

    public get<T = TrackedBase<any>>(resId: UniversalResourceId): T {
        return this.trackedMap.get(resId) as T;
    }

    public async getOrRestore<T extends TrackedBase<any>>(resId: UniversalResourceId, encoder: GPUCommandEncoder): Promise<T> {
        console.assert(this.trackedMap.has(resId));
        const tracked = this.trackedMap.get(resId) as T;
        if (!tracked.__authentic) {
            await tracked.restore(this, encoder);
        }
        return tracked;
    }

    public getRcds(): ReadonlyArray<RcdBase<any, any, any>> { return this.rcds; }
    public getRcdAt(index: number) { return this.rcds[index]; }

    private trackedMap: Map<UniversalResourceId, TrackedBase<any>> = new Map();
    private rcds: Array<RcdBase<any, any, any>> = [];

    private logSuccess?: (msg: string) => void;
    private logWarn?: (msg: string) => void;
    private logError?: (msg: string) => void;
}