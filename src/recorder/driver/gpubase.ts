import ResourceDependencies from "../../common/deps";
import type { brandMap } from "../../common/brand";
import TrackedBase from "../../tracked/tracked";

let global_id_counter = 1; // 0 is invalid

export const wgiResMap = new Map<UniversalResourceId, WeakRef<wgi_GPUBase>>();

export default abstract class wgi_GPUBase {
    constructor() {
        this.__id = global_id_counter++;
        wgiResMap.set(this.__id, new WeakRef(this));
    }

    public __wgi: true = true; // mark as wgi driver
    abstract readonly __brand: keyof typeof brandMap;
    public __id: UniversalResourceId;
    public deps = new ResourceDependencies();

    public static is_wgi(obj: any): obj is wgi_GPUBase {
        return !!obj?.__wgi;
    }

    public abstract getTrackedType(): typeof TrackedBase<any>;
}