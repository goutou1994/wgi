import TrackedBase from "../../tracked/tracked";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUTexture extends wgi_GPUBase implements GPUTexture {
    __brand: "GPUTexture" = "GPUTexture";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        throw new Error("Method not implemented.");
    }

    constructor(public next: GPUTexture, public device: GPUDevice, public canvasId?: string) {
        super();
    }
    get isCanvas() { return this.canvasId !== undefined; }

    createView(descriptor?: GPUTextureViewDescriptor | undefined): GPUTextureView {
        throw new Error("Method not implemented.");
    }
    destroy(): undefined {
        throw new Error("Method not implemented.");
    }
    get width(): number { return this.next.width; }
    get height(): number { return this.next.height; }
    get depthOrArrayLayers(): number { return this.next.depthOrArrayLayers; }
    get mipLevelCount(): number { return this.next.mipLevelCount; }
    get sampleCount(): number { return this.next.sampleCount; }
    get dimension(): GPUTextureDimension { return this.next.dimension; }
    get format(): GPUTextureFormat { return this.next.format; }
    get usage(): number { return this.next.usage; }
    get label(): string { return this.next.label; }
}
