import TrackedGPUAdapter from "../../tracked/GPUAdapter";
import TrackedBase from "../../tracked/tracked";
import wgi_GPU from "./GPU";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUAdapter extends wgi_GPUBase implements GPUAdapter {
    public getTrackedType() {
        return TrackedGPUAdapter;
    }
    constructor(public next: GPUAdapter, public gpu: wgi_GPU) {
        super();
        this.deps.add(gpu);
    }
    readonly __brand: "GPUAdapter" = "GPUAdapter";
    get features(): GPUSupportedFeatures {
        return this.next.features;
    }
    get limits(): GPUSupportedLimits {
        return this.next.limits;
    }
    get isFallbackAdapter(): boolean {
        return this.next.isFallbackAdapter;
    }
    requestDevice(descriptor?: GPUDeviceDescriptor | undefined): Promise<GPUDevice> {
        return this.next.requestDevice(descriptor).then(
            device => new wgi_GPUDevice(device, this, descriptor)
        );
    }
    requestAdapterInfo(): Promise<GPUAdapterInfo> {
        return this.next.requestAdapterInfo();
    }
}