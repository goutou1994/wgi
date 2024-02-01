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
    abstract readonly __kind: number;

    /**
     * Authentic gpu resource.
     * Should be wgi driver when capturing, or real webgpu driver when replaying.
     */
    abstract __authentic?: any;

    /**
     * Attributes and content of some resource at a certain timepoint.
     * Used for serializing/restoring.
     */
    abstract __snapshot?: any;

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

    public constructor() { }

    /**
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
     * Deserialize from capture binary file, generate snapshot.
     * Used by replay only.
     */
    public abstract deserialize(id: number, ds: DataStream): T;

    /**
     * Recreate the actual gpu resource by snapshot.
     * Used by replay only.
     */
    public abstract restore(profile: ReplayProfile): Promise<void>;

    /**
     * Retrieve content to make a snapshot.
     * Used by capturer and replay.
     */
    public abstract takeSnapshot(): void;

    /**
     * Get ids of all dependencies from snapshot.
     */
    public abstract getSnapshotDepIds(): Array<number>;

    protected fastFromAuthentic(authentic: wgi_GPUBase, Ctor: new () => T) {
        const i = new Ctor();
        i.__id = authentic.__id;
        i.__authentic = authentic;
        i.__restored = true;
        return i;
    }

    public getAuthenticNext() {
        return this.__authentic?.next ?? this.__authentic;
    }
}