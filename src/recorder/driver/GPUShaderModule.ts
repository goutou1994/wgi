import TrackedGPUShaderModule from "../../tracked/GPUShaderModule";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUShaderModule extends wgi_GPUBase implements GPUShaderModule {
    __brand: "GPUShaderModule" = "GPUShaderModule";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUShaderModule;
    }

    constructor(public next: GPUShaderModule, public device: wgi_GPUDevice, public desc: GPUShaderModuleDescriptor) {
        super();
    }

    getCompilationInfo(): Promise<GPUCompilationInfo> {
        return this.next.getCompilationInfo();
    }
    get label(): string { return this.next.label; }
}
