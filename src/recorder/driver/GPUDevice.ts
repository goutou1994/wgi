import wgi_GPUAdapter from "./GPUAdapter";
import wgi_GPUBuffer from "./GPUBuffer";
import wgi_Resource from "./res";

export default class wgi_GPUDevice extends wgi_Resource implements GPUDevice {
    constructor(private next: GPUDevice, private adapter: wgi_GPUAdapter, private desc: GPUDeviceDescriptor | undefined) {
        super();
        this.deps.add(adapter);
    }

    readonly __brand: "GPUDevice" = "GPUDevice";
    get features(): GPUSupportedFeatures {
        return this.next.features;
    }
    get limits(): GPUSupportedLimits {
        return this.next.limits;
    }
    get queue(): GPUQueue {
        return this.next.queue;
    }
    destroy(): undefined {
        throw new Error("Method not implemented.");
    }
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer {
        return new wgi_GPUBuffer(
            this.next.createBuffer(descriptor),
            this,
            descriptor
        );
    }
    createTexture(descriptor: GPUTextureDescriptor): GPUTexture {
        throw new Error("Method not implemented.");
    }
    createSampler(descriptor?: GPUSamplerDescriptor | undefined): GPUSampler {
        throw new Error("Method not implemented.");
    }
    importExternalTexture(descriptor: GPUExternalTextureDescriptor): GPUExternalTexture {
        throw new Error("Method not implemented.");
    }
    createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout {
        throw new Error("Method not implemented.");
    }
    createPipelineLayout(descriptor: GPUPipelineLayoutDescriptor): GPUPipelineLayout {
        throw new Error("Method not implemented.");
    }
    createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup {
        throw new Error("Method not implemented.");
    }
    createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule {
        throw new Error("Method not implemented.");
    }
    createComputePipeline(descriptor: GPUComputePipelineDescriptor): GPUComputePipeline {
        throw new Error("Method not implemented.");
    }
    createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline {
        throw new Error("Method not implemented.");
    }
    createComputePipelineAsync(descriptor: GPUComputePipelineDescriptor): Promise<GPUComputePipeline> {
        throw new Error("Method not implemented.");
    }
    createRenderPipelineAsync(descriptor: GPURenderPipelineDescriptor): Promise<GPURenderPipeline> {
        throw new Error("Method not implemented.");
    }
    createCommandEncoder(descriptor?: GPUObjectDescriptorBase | undefined): GPUCommandEncoder {
        throw new Error("Method not implemented.");
    }
    createRenderBundleEncoder(descriptor: GPURenderBundleEncoderDescriptor): GPURenderBundleEncoder {
        throw new Error("Method not implemented.");
    }
    createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet {
        throw new Error("Method not implemented.");
    }
    lost: Promise<GPUDeviceLostInfo>;
    pushErrorScope(filter: GPUErrorFilter): undefined {
        throw new Error("Method not implemented.");
    }
    popErrorScope(): Promise<GPUError | null> {
        throw new Error("Method not implemented.");
    }
    onuncapturederror: ((this: GPUDevice, ev: GPUUncapturedErrorEvent) => any) | null;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event: Event): boolean {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        throw new Error("Method not implemented.");
    }
    label: string;
}