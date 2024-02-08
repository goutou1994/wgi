import TrackedGPUCommandBuffer from "../../tracked/GPUCommandBuffer";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUCommandEncoder from "./GPUCommandEncoder";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUCommandBuffer extends wgi_GPUBase implements GPUCommandBuffer {
    __brand: "GPUCommandBuffer" = "GPUCommandBuffer";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUCommandBuffer;
    }
    constructor(public next: GPUCommandBuffer, public encoder: wgi_GPUCommandEncoder) {
        super();
    }
    get label(): string { return this.next.label; }
}
