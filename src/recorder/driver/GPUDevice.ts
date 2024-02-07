import { DataStream } from "../../common/utils";
import RcdCreateBuffer from "../../record/create/rcdCreateBuffer";
import RcdDebugRes from "../../record/rcdDebugRes";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedBase from "../../tracked/tracked";
import { createGlobalRecorder, globalRecorder } from "../recorder";
import wgi_GPUAdapter from "./GPUAdapter";
import wgi_GPUBuffer from "./GPUBuffer";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUDevice extends wgi_GPUBase implements GPUDevice {
    public getTrackedType(): typeof TrackedBase<any> {
        return TrackedGPUDevice;
    }
    constructor(public next: GPUDevice, public adapter: wgi_GPUAdapter, private desc: GPUDeviceDescriptor | undefined) {
        super();
        this.deps.add(adapter);

        // Just use the first device created to construct global recorder.
        createGlobalRecorder(this);
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
    debugRes(res: wgi_GPUBase): void {
        return globalRecorder.processRcd(
            RcdDebugRes,
            undefined,
            [{res}],
            () => {}
        );
    }
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer {
        return globalRecorder.processRcd(
            RcdCreateBuffer,
            this,
            [descriptor],
            () => new wgi_GPUBuffer(
                this.next.createBuffer({
                    ...descriptor,
                    usage: descriptor.usage | GPUBufferUsage.COPY_SRC
                }),
                this,
                descriptor
            )
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
    get lost(): Promise<GPUDeviceLostInfo> { return this.next.lost; };
    pushErrorScope(filter: GPUErrorFilter): undefined {
        throw new Error("Method not implemented.");
    }
    popErrorScope(): Promise<GPUError | null> {
        throw new Error("Method not implemented.");
    }
    get onuncapturederror(): ((this: GPUDevice, ev: GPUUncapturedErrorEvent) => any) | null {
        return this.next.onuncapturederror;
    }
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event: Event): boolean {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        throw new Error("Method not implemented.");
    }
    get label(): string { return this.next.label; };
    set label(v: string) { this.next.label = v; }

}