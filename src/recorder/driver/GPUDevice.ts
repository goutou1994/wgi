import RcdCreateBindGroup from "../../record/device/rcdCreateBindGroup";
import RcdCreateBindGroupLayout from "../../record/device/rcdCreateBindGroupLayout";
import RcdCreateBuffer from "../../record/device/rcdCreateBuffer";
import RcdCreateCommandEncoder from "../../record/device/rcdCreateCommandEncoder";
import RcdCreateRenderPipeline from "../../record/device/rcdCreateRenderPipeline";
import RcdCreateSampler from "../../record/device/rcdCreateSampler";
import RcdCreateShaderModule from "../../record/device/rcdCreateShaderModule";
import RcdCreateTexture from "../../record/device/rcdCreateTexture";
import RcdDebugRes from "../../record/rcdDebugRes";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedBase from "../../tracked/tracked";
import { createGlobalRecorder, globalRecorder } from "../recorder";
import wgi_GPUAdapter from "./GPUAdapter";
import wgi_GPUBindGroup from "./GPUBindGroup";
import wgi_GPUBindGroupLayout from "./GPUBindGroupLayout";
import wgi_GPUBuffer from "./GPUBuffer";
import wgi_GPUCommandEncoder from "./GPUCommandEncoder";
import wgi_GPUQueue from "./GPUQueue";
import wgi_GPURenderPipeline from "./GPURenderPipeline";
import wgi_GPUSampler from "./GPUSampler";
import wgi_GPUShaderModule from "./GPUShaderModule";
import wgi_GPUTexture from "./GPUTexture";
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

        // create queue
        this._queue = new wgi_GPUQueue(this.next.queue, this);
    }

    readonly __brand: "GPUDevice" = "GPUDevice";
    get features(): GPUSupportedFeatures {
        return this.next.features;
    }
    get limits(): GPUSupportedLimits {
        return this.next.limits;
    }
    private _queue: wgi_GPUQueue;
    get queue(): wgi_GPUQueue {
        return this._queue;
    }
    destroy(): undefined {
        throw new Error("Method not implemented.");
    }
    debugRes(res: wgi_GPUBase): void {
        return globalRecorder.processRcd(
            RcdDebugRes,
            undefined,
            [{ res }],
            () => { }
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
        return globalRecorder.processRcd(
            RcdCreateTexture,
            this,
            [descriptor],
            () => {
                const tex = new wgi_GPUTexture(
                    this.next.createTexture({
                        ...descriptor,
                        usage: descriptor.usage | GPUTextureUsage.COPY_SRC
                    }),
                    this
                );
                tex.realUsage = descriptor.usage;
                return tex;
            }
        );
    }
    createSampler(descriptor?: GPUSamplerDescriptor | undefined): GPUSampler {
        return globalRecorder.processRcd(
            RcdCreateSampler,
            this,
            [descriptor],
            () => new wgi_GPUSampler(
                this.next.createSampler(descriptor),
                this,
                descriptor
            )
        );
    }
    importExternalTexture(descriptor: GPUExternalTextureDescriptor): GPUExternalTexture {
        throw new Error("Method not implemented.");
    }
    createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout {
        return globalRecorder.processRcd(
            RcdCreateBindGroupLayout,
            this,
            [descriptor],
            () => new wgi_GPUBindGroupLayout(
                this.next.createBindGroupLayout(descriptor),
                this,
                descriptor
            )
        );
    }
    createPipelineLayout(descriptor: GPUPipelineLayoutDescriptor): GPUPipelineLayout {
        throw new Error("Method not implemented.");
    }
    createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup {
        return globalRecorder.processRcd(
            RcdCreateBindGroup,
            this,
            [descriptor],
            () => new wgi_GPUBindGroup(
                this.next.createBindGroup(RcdCreateBindGroup.prototype.transformArgs(
                    [descriptor],
                    wgi => wgi.next
                )[0]),
                this,
                descriptor
            )
        );
    }
    createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule {
        return globalRecorder.processRcd(
            RcdCreateShaderModule,
            this,
            [descriptor],
            () => new wgi_GPUShaderModule(
                this.next.createShaderModule(descriptor),
                this,
                descriptor
            )
        );
    }
    createComputePipeline(descriptor: GPUComputePipelineDescriptor): GPUComputePipeline {
        throw new Error("Method not implemented.");
    }
    createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline {
        return globalRecorder.processRcd(
            RcdCreateRenderPipeline,
            this,
            [descriptor],
            () => {
                const descClone = {
                    ...descriptor,
                    vertex: {
                        ...descriptor.vertex,
                        module: (descriptor.vertex.module as wgi_GPUShaderModule).next
                    },
                    fragment: descriptor.fragment ? {
                        ...descriptor.fragment,
                        module: (descriptor.fragment.module as wgi_GPUShaderModule).next
                    } : undefined
                }
                return new wgi_GPURenderPipeline(
                    this.next.createRenderPipeline(descClone),
                    this,
                    descriptor
                )
            }
        );
    }
    createComputePipelineAsync(descriptor: GPUComputePipelineDescriptor): Promise<GPUComputePipeline> {
        throw new Error("Method not implemented.");
    }
    createRenderPipelineAsync(descriptor: GPURenderPipelineDescriptor): Promise<GPURenderPipeline> {
        throw new Error("Method not implemented.");
    }
    createCommandEncoder(descriptor?: GPUObjectDescriptorBase | undefined): GPUCommandEncoder {
        return globalRecorder.processRcd(
            RcdCreateCommandEncoder,
            this,
            [descriptor],
            () => new wgi_GPUCommandEncoder(
                this.next.createCommandEncoder(descriptor),
                this,
                descriptor
            )
        );
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