import RcdDraw from "../../record/pass/RcdDraw";
import RcdEnd from "../../record/pass/RcdEnd";
import RcdSetPipeline from "../../record/pass/RcdSetPipeline";
import RcdSetVertexBuffer from "../../record/pass/RcdSetVertexBuffer";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUBuffer from "./GPUBuffer";
import wgi_GPUCommandEncoder from "./GPUCommandEncoder";
import wgi_GPURenderPipeline from "./GPURenderPipeline";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPURenderPassEncoder extends wgi_GPUBase implements GPURenderPassEncoder {
    __brand: "GPURenderPassEncoder" = "GPURenderPassEncoder";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPURenderPassEncoder;
    }

    constructor(public next: GPURenderPassEncoder, public encoder: wgi_GPUCommandEncoder, public desc: GPURenderPassDescriptor) {
        super();
    }

    setViewport(x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number): undefined {
        throw new Error("Method not implemented.");
    }
    setScissorRect(x: number, y: number, width: number, height: number): undefined {
        throw new Error("Method not implemented.");
    }
    setBlendConstant(color: GPUColor): undefined {
        throw new Error("Method not implemented.");
    }
    setStencilReference(reference: number): undefined {
        throw new Error("Method not implemented.");
    }
    beginOcclusionQuery(queryIndex: number): undefined {
        throw new Error("Method not implemented.");
    }
    endOcclusionQuery(): undefined {
        throw new Error("Method not implemented.");
    }
    executeBundles(bundles: Iterable<GPURenderBundle>): undefined {
        throw new Error("Method not implemented.");
    }
    end(): undefined {
        globalRecorder.processRcd(
            RcdEnd, this, [],
            () => this.next.end()
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
    setBindGroup(index: number, bindGroup: GPUBindGroup | null, dynamicOffsets?: Iterable<number> | undefined): undefined;
    setBindGroup(index: number, bindGroup: GPUBindGroup | null, dynamicOffsetsData: Uint32Array, dynamicOffsetsDataStart: number, dynamicOffsetsDataLength: number): undefined;
    setBindGroup(index: unknown, bindGroup: unknown, dynamicOffsetsData?: unknown, dynamicOffsetsDataStart?: unknown, dynamicOffsetsDataLength?: unknown): undefined {
        throw new Error("Method not implemented.");
    }
    setPipeline(pipeline: wgi_GPURenderPipeline): undefined {
        globalRecorder.processRcd(
            RcdSetPipeline, this, [pipeline],
            () => this.next.setPipeline(pipeline.next)
        );
    }
    setIndexBuffer(buffer: GPUBuffer, indexFormat: GPUIndexFormat, offset?: number | undefined, size?: number | undefined): undefined {
        throw new Error("Method not implemented.");
    }
    setVertexBuffer(slot: number, buffer: wgi_GPUBuffer | null, offset?: number | undefined, size?: number | undefined): undefined {
        globalRecorder.processRcd(
            RcdSetVertexBuffer, this,
            [slot, buffer, offset, size],
            () => this.next.setVertexBuffer(slot, buffer ? buffer.next : null, offset, size)
        );
    }
    draw(...args: [vertexCount: number, instanceCount?: number | undefined, firstVertex?: number | undefined, firstInstance?: number | undefined]): undefined {
        globalRecorder.processRcd(
            RcdDraw, this, args,
            () => this.next.draw(...args)
        );
    }
    drawIndexed(indexCount: number, instanceCount?: number | undefined, firstIndex?: number | undefined, baseVertex?: number | undefined, firstInstance?: number | undefined): undefined {
        throw new Error("Method not implemented.");
    }
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined {
        throw new Error("Method not implemented.");
    }
    drawIndexedIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined {
        throw new Error("Method not implemented.");
    }
}
