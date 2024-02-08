import RcdCopyBufferToBuffer from "../../record/create/rcdCopyBufferToBuffer";
import RcdFinish from "../../record/create/rcdFinish";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUCommandBuffer from "./GPUComandBuffer";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUCommandEncoder extends wgi_GPUBase implements GPUCommandEncoder {
    __brand: "GPUCommandEncoder" = "GPUCommandEncoder";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUCommandEncoder;
    }

    constructor(public next: GPUCommandEncoder, public device: wgi_GPUDevice, public desc: GPUCommandEncoderDescriptor | undefined) {
        super();
    }

    beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder {
        throw new Error("Method not implemented.");
    }
    beginComputePass(descriptor?: GPUComputePassDescriptor | undefined): GPUComputePassEncoder {
        throw new Error("Method not implemented.");
    }
    copyBufferToBuffer(...args: [source: GPUBuffer, sourceOffset: number, destination: GPUBuffer, destinationOffset: number, size: number]): undefined {
        return globalRecorder.processRcd(
            RcdCopyBufferToBuffer,
            this,
            args,
            () => this.next.copyBufferToBuffer(...args)
        );
    }
    copyBufferToTexture(source: GPUImageCopyBuffer, destination: GPUImageCopyTexture, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyTextureToBuffer(source: GPUImageCopyTexture, destination: GPUImageCopyBuffer, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyTextureToTexture(source: GPUImageCopyTexture, destination: GPUImageCopyTexture, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    clearBuffer(buffer: GPUBuffer, offset?: number | undefined, size?: number | undefined): undefined {
        throw new Error("Method not implemented.");
    }
    resolveQuerySet(querySet: GPUQuerySet, firstQuery: number, queryCount: number, destination: GPUBuffer, destinationOffset: number): undefined {
        throw new Error("Method not implemented.");
    }
    finish(descriptor?: GPUObjectDescriptorBase | undefined): GPUCommandBuffer {
        return globalRecorder.processRcd(
            RcdFinish,
            this,
            [descriptor],
            () => new wgi_GPUCommandBuffer(
                this.next.finish(descriptor),
                this
            )
        );
    }
    get label(): string { return this.next.label; }
    pushDebugGroup(groupLabel: string): undefined {
        throw new Error("Method not implemented.");
    }
    popDebugGroup(): undefined {
        throw new Error("Method not implemented.");
    }
    insertDebugMarker(markerLabel: string): undefined {
        throw new Error("Method not implemented.");
    }
    
}
