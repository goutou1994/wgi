import { DataStream } from "../common/utils";
import TrackedBase from "../tracked/tracked";
import * as version from "../common/version";
import { trackedCtorMap } from "./utils/trackedCtor";
import { rcdCtorMap } from "./utils/rcdCtor";
import RcdBase from "../record/rcd";

type logger = (msg: string) => void;

export default class ReplayProfile {
    constructor() {
        // generate all tracked

        // generate all rcd
    }

    public setLogger(success?: logger, warn?: logger, error?: logger) {
        this.logSuccess = success;
        this.logWarn = warn;
        this.logError = error;
    }

    public deserialize(raw: Uint8Array) {
        const ds = new DataStream(raw.buffer);
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
            const kind = ds.read<number>(u32);
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
            const kind = ds.read<number>(u32);
            const Ctor = rcdCtorMap[kind];
            const rcd = Ctor.prototype.deserialize(ds, this);
            this.rcds.push(rcd);
        }
    }

    public replayTo(rcdId: number) { }

    public get<T = TrackedBase<any>>(resId: UniversalResourceId): T {
        return this.trackedMap.get(resId) as T;
    }

    public async getOrRestore<T = TrackedBase<any>>(resId: UniversalResourceId): Promise<T> {
        return null as any;
    }

    public getRcds(): ReadonlyArray<RcdBase<any, any, any>> { return this.rcds; }
    public getRcdAt(index: number) { return this.rcds[index]; }

    private trackedMap: Map<UniversalResourceId, TrackedBase<any>> = new Map();
    private rcds: Array<RcdBase<any, any, any>> = [];

    private logSuccess?: (msg: string) => void;
    private logWarn?: (msg: string) => void;
    private logError?: (msg: string) => void;
}