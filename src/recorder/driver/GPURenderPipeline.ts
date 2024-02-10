import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPURenderPipeline extends wgi_GPUBase implements GPURenderPipeline {
    __brand: "GPURenderPipeline" = "GPURenderPipeline";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPURenderPipeline;
    }

    constructor(public next: GPURenderPipeline, public device: wgi_GPUDevice, public desc: GPURenderPipelineDescriptor) {
        super();
    }

    get label(): string { return this.next.label; }
    getBindGroupLayout(index: number): GPUBindGroupLayout {
        return this.next.getBindGroupLayout(index);
    }
    
}
