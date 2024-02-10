import { brandMap } from "../common/brand";
import type { DataStream } from "../common/utils";
import type wgi_GPUBase from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";

// export class DepsHolder<T> {
//     constructor(id: number) { this.id = id; }
//     public readonly id: number = -1;
//     private obj?: T;
//     public setObj(obj: T) { this.obj = obj; }
//     public getObj() { return this.obj; }
// }

/**
 * This class is meant to be used both by capturer and replay.
 * But not all methods are available on both sides, be careful not to misuse.
 */
export default abstract class TrackedBase<T extends TrackedBase<T>> {
    /**
     * @see brandMap from src/recorder/driver/base.ts
     */
    abstract readonly __kind: brandMap;

    /**
     * Authentic gpu resource.
     * Should be wgi driver when capturing, or real webgpu driver when replaying.
     */
    abstract __authentic?: any;

    /**
     * Attributes and content of some resource at a certain timepoint.
     * Used for serializing/displaying.
     */
    abstract __snapshot?: any;

    /**
     * Snapshot deserialized from capture file.
     * Used for restoring.
     */
    abstract __initialSnapshot?: typeof this.__snapshot;

    /**
     * Each resource should have an id, which is unique among all kinds of resources.
     */
    public __id: UniversalResourceId = 0;

    /**
     * Mark as temporary resource, meaning it is created during capturing.
     */
    public __temporary: boolean = false;
    public markAsTemporary() { this.__temporary = true; }

    /**
     * Whether it has authentic gpu resource.
     */
    public __restored: boolean = false;

    /**
     * Contain tracked creator.
     * Used under replay mode.
     */
    abstract __creator?: any;

    /**
     * Contain the rcd used to create this resource.
     * Used under replay mode.
     */
    abstract __creatorRcd?: any;

    public constructor() { }

    /**
     * @static
     * Construct a resource from wgi driver.
     * Used by capturer only.
     */
    public abstract fromAuthentic(authentic: wgi_GPUBase): T;

    /**
     * Serailize this resource's snapshot.
     * 
     * Used by capturer only.
     */
    public abstract serialize(ds: DataStream): void;

    /**
     * Deserialize from capture binary file, generate initial snapshot.
     * Used by replay only.
     */
    public abstract deserialize(ds: DataStream): void;

    /**
     * Recreate the actual gpu resource by snapshot.
     * Used by replay only.
     */
    public abstract restore(profile: ReplayProfile, encoder?: GPUCommandEncoder): Promise<void>;

    /**
     * Retrieve content to make a snapshot.
     * Used by capturer and replay.
     * @param profile Provided indicates replay env.
     */
    public abstract takeSnapshotBeforeSubmit(encoder: GPUCommandEncoder, profile?: ReplayProfile): void;
    public takeSnapshotAfterSubmit(): Promise<void> { return Promise.resolve(); }

    public get label(): string {
        if (this.__authentic?.label?.length > 0) return this.__authentic.label;
        if (this.__initialSnapshot?.label?.length > 0) return this.__initialSnapshot.label;
        if (this.__snapshot?.label?.length > 0) return this.__snapshot.label;
        return this.__id.toString();
    }

    /**
     * Get ids of all dependencies from snapshot.
     */
    // public abstract getSnapshotDepIds(): Array<number>;

    /**
     * Get ids of all dependencies.
     * Used by capturer.
     */
    public abstract getDeps(): Array<wgi_GPUBase>;

    protected isReplayMode() {
        return !!this.__creator;
    }

    /**
     * When ReplayProfile need to go back to initial state,
     * all Tracked authentics should be destroyed so they can be created again.
     */
    public destroyAuthentic(): void {
        this.__authentic?.destroy();
        this.__authentic = undefined;
    }

    protected fastFromAuthentic(authentic: wgi_GPUBase, Ctor: new () => T) {
        const i = new Ctor();
        i.__id = authentic.__id;
        i.__authentic = authentic;
        i.__restored = true;
        return i;
    }

}