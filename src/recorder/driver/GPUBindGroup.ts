import TrackedGPUBindGroup from "../../tracked/GPUBindGroup";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUBindGroup extends wgi_GPUBase implements GPUBindGroup {
    __brand: "GPUBindGroup" = "GPUBindGroup";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUBindGroup;
    }

    constructor(public next: GPUBindGroup, public device: wgi_GPUDevice, public desc: GPUBindGroupDescriptor) {
        super();
    }

    get label(): string { return this.next.label; }
}
