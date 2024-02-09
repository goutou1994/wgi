import TrackedGPUTexture from "../../tracked/GPUTexture";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUTexture extends wgi_GPUBase implements GPUTexture {
    __brand: "GPUTexture" = "GPUTexture";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUTexture;
    }

    constructor(public next: GPUTexture, public device: wgi_GPUDevice, public canvasId?: string) {
        super();
        if (canvasId) {
            this.realUsage = next.usage;
        }
    }
    get isCanvas() { return this.canvasId !== undefined; }
    public realUsage: GPUTextureUsageFlags = 0;

    createView(descriptor?: GPUTextureViewDescriptor | undefined): GPUTextureView {
        throw new Error("Method not implemented.");
    }
    destroy(): undefined {
        this.next.destroy();
    }
    get width(): number { return this.next.width; }
    get height(): number { return this.next.height; }
    get depthOrArrayLayers(): number { return this.next.depthOrArrayLayers; }
    get mipLevelCount(): number { return this.next.mipLevelCount; }
    get sampleCount(): number { return this.next.sampleCount; }
    get dimension(): GPUTextureDimension { return this.next.dimension; }
    get format(): GPUTextureFormat { return this.next.format; }
    get usage(): number { return this.realUsage; }
    get label(): string { return this.next.label; }
}
