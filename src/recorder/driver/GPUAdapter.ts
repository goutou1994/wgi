import wgi_GPU from "./GPU";
import wgi_GPUDevice from "./GPUDevice";
import wgi_Resource from "./res";

export default class wgi_GPUAdapter extends wgi_Resource implements GPUAdapter {
    constructor(private next: GPUAdapter, private gpu: wgi_GPU) {
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