import BaseResource from "../resources/res";

export default class ReplayProfile {
    constructor(raw: Uint8Array) {}

    public replayTo(rcdId: number) { }

    public async getOrRestore(resId: number): Promise<BaseResource<unknown>> {

    }
}