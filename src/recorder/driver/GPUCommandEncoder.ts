import { deepCloneDesc } from "../../common/utils";
import RcdBeginRenderPass from "../../record/encoder/rcdBeginRenderPass";
import RcdCopyBufferToBuffer from "../../record/encoder/rcdCopyBufferToBuffer";
import RcdCopyTextureToTexture from "../../record/encoder/rcdCopyTextureToTexture";
import RcdFinish from "../../record/encoder/rcdFinish";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUBuffer from "./GPUBuffer";
import wgi_GPUCommandBuffer from "./GPUComandBuffer";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPURenderPassEncoder from "./GPURenderPassEncoder";
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
        descriptor = deepCloneDesc(descriptor);
        return globalRecorder.processRcd(
            RcdBeginRenderPass,
            this,
            [descriptor],
            () => new wgi_GPURenderPassEncoder(
                this.next.beginRenderPass(
                    RcdBeginRenderPass.prototype.transformArgs([descriptor], (wgi: wgi_GPUBase) => wgi.next)[0]
                ),
                this,
                descriptor
            )
        );
    }
    beginComputePass(descriptor?: GPUComputePassDescriptor | undefined): GPUComputePassEncoder {
        throw new Error("Method not implemented.");
    }
    copyBufferToBuffer(...args: [source: wgi_GPUBuffer, sourceOffset: number, destination: wgi_GPUBuffer, destinationOffset: number, size: number]): undefined {
        args = deepCloneDesc(args);
        return globalRecorder.processRcd(
            RcdCopyBufferToBuffer,
            this,
            args,
            () => this.next.copyBufferToBuffer(
                args[0].next,
                args[1],
                args[2].next,
                args[3],
                args[4]
            )
        );
    }
    copyBufferToTexture(source: GPUImageCopyBuffer, destination: GPUImageCopyTexture, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyTextureToBuffer(source: GPUImageCopyTexture, destination: GPUImageCopyBuffer, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyTextureToTexture(...args: [source: GPUImageCopyTexture, destination: GPUImageCopyTexture, copySize: GPUExtent3DStrict]): undefined {
        args = deepCloneDesc(args);
        return globalRecorder.processRcd(
            RcdCopyTextureToTexture,
            this,
            args,
            () => this.next.copyTextureToTexture(
                ...RcdCopyTextureToTexture.prototype.transformArgs(args, wgi => wgi.next)
            )
        );
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
