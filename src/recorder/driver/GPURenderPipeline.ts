import RcdGetBindGroupLayout from "../../record/pipeline/RcdGetBindGroupLayout";
import TrackedGPURenderPipeline from "../../tracked/GPURenderPipeline";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUBindGroupLayout from "./GPUBindGroupLayout";
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

    private bindGroupLayout?: wgi_GPUBindGroupLayout;
    getBindGroupLayout(index: number): wgi_GPUBindGroupLayout {
        if (this.bindGroupLayout) {
            return this.bindGroupLayout;
        } else {
            return globalRecorder.processRcd(
                RcdGetBindGroupLayout,
                this,
                [index],
                () => new wgi_GPUBindGroupLayout(
                    this.next.getBindGroupLayout(index),
                    this,
                    index
                )
            );
        }
    }
}
