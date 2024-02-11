import TrackedGPUTextureView from "../../tracked/GPUTextureView";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUTexture from "./GPUTexture";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUTextureView extends wgi_GPUBase implements GPUTextureView {
    __brand: "GPUTextureView" = "GPUTextureView";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUTextureView;
    }

    constructor(public next: GPUTextureView, public texture: wgi_GPUTexture, public desc?: GPUTextureViewDescriptor) {
        super();
    }

    get label(): string { return this.next.label; }
}
