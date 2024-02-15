import TrackedGPUBindGroupLayout from "../../tracked/GPUBindGroupLayout";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPURenderPipeline from "./GPURenderPipeline";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUBindGroupLayout extends wgi_GPUBase implements GPUBindGroupLayout {
    __brand: "GPUBindGroupLayout" = "GPUBindGroupLayout";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUBindGroupLayout;
    }
    constructor(public next: GPUBindGroupLayout, public creator: wgi_GPUDevice | wgi_GPURenderPipeline, public desc: GPUBindGroupLayoutDescriptor | number) {
        super();
    }
    get label(): string { return this.next.label; }
}
