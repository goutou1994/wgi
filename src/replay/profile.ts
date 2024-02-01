import BaseResource from "../tracked/tracked";

export default class ReplayProfile {
    constructor(raw: Uint8Array) {}

    public replayTo(rcdId: number) { }

    public get<T = BaseResource<any>>(resId: UniversalResourceId): T;

    public async getOrRestore<T = BaseResource<any>>(resId: UniversalResourceId): Promise<T> {

    }
}