import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUPipelineLayout extends wgi_GPUBase implements GPUPipelineLayout {
    __brand: "GPUPipelineLayout" = "GPUPipelineLayout";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        throw new Error("Method not implemented.");
    }

    constructor(public next: GPUPipelineLayout, public device: wgi_GPUDevice; public desc: GPUPipelineLayoutDescriptor) {
        super();
    }

    get label(): string { return this.next.label; }
}
