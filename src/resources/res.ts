import type { DataStream } from "../common/utils";
import type wgi_GPUBase from "../recorder/driver/base";
import type ReplayProfile from "../replay/profile";

export class DepsHolder<T> {
    constructor(id: number) { this.id = id; }
    public readonly id: number = -1;
    private obj?: T;
    public setObj(obj: T) { this.obj = obj; }
    public getObj() { return this.obj; }
}

/**
 * This class is meant to be used both by capturer and replay.
 * But not all methods are available on both sides, be careful not to misuse.
 */
export default abstract class BaseResource<T extends BaseResource<T>> {
    /**
     * @see brandMap from src/recorder/driver/base.ts
     */
    abstract readonly __kind: number;

    /**
     * Authentic gpu resource.
     * Should be wgi driver when capturing, or real webgpu driver when replaying.
     */
    abstract __authentic: any;

    /**
     * Each resource should have an id, which is unique among all kinds of resources.
     */
    public __id: number = -1;

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
     * Serailize this resource.
     * Used by capturer only.
     */
    public abstract serialize(ds: DataStream): void;

    /**
     * Deserialize from capture binary file.
     * Used by replay only.
     */
    public abstract deserialize(id: number, ds: DataStream): T;

    /**
     * Recreate the actual gpu resource.
     * Used by replay only.
     */
    public abstract restore(profile: ReplayProfile): Promise<void>;

    /**
     * Retrieve content to make a snapshot.
     * Used by capturer and replay.
     */
    public abstract takeSnapshot(): void;

    /**
     * Get ids of all dependencies.
     * Used by replay only.
     */
    public abstract getDepIds(): Array<number>;

    protected fastFromAuthentic(authentic: wgi_GPUBase, Ctor: new () => T) {
        const i = new Ctor();
        i.__id = authentic.__id;
        i.__restored = true;
        return i;
    }
}