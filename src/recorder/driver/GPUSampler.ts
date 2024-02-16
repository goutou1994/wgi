import TrackedGPUSampler from "../../tracked/GPUSampler";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUSampler extends wgi_GPUBase implements GPUSampler {
    __brand: "GPUSampler" = "GPUSampler";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUSampler;
    }

    constructor(public next: GPUSampler, public device: wgi_GPUDevice, public desc?: GPUSamplerDescriptor) {
        super();
    }

    get label(): string { return this.next.label; };
}
