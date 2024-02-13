import RcdSubmit from "../../record/queue/rcdSubmit";
import RcdWriteBuffer from "../../record/queue/writeBuffer";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import type wgi_GPUBuffer from "./GPUBuffer";
import wgi_GPUCommandBuffer from "./GPUComandBuffer";
import wgi_GPUDevice from "./GPUDevice";
import type wgi_GPUTexture from "./GPUTexture";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUQueue extends wgi_GPUBase implements GPUQueue {
    __brand: "GPUQueue" = "GPUQueue";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUQueue;
    }
    constructor(public next: GPUQueue, public device: wgi_GPUDevice) {
        super();
    }

    submit(commandBuffers: Iterable<wgi_GPUCommandBuffer>): undefined {
        return globalRecorder.processRcd(
            RcdSubmit,
            this,
            [commandBuffers],
            () => {
                const cbs = [];
                for (const cb of commandBuffers){
                    cbs.push(cb.next);
                }
                this.next.submit(cbs);
            }
        );
    }
    onSubmittedWorkDone(): Promise<undefined> {
        return this.next.onSubmittedWorkDone();
    }
    writeBuffer(...args: [buffer: wgi_GPUBuffer, bufferOffset: number, data: BufferSource | SharedArrayBuffer, dataOffset?: number | undefined, size?: number | undefined]): undefined {
        globalRecorder.processRcd(
            RcdWriteBuffer, this,
            args,
            () => this.next.writeBuffer(args[0].next, args[1], args[2], args[3], args[4])
        );
    }
    writeTexture(destination: GPUImageCopyTexture, data: BufferSource | SharedArrayBuffer, dataLayout: GPUImageDataLayout, size: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyExternalImageToTexture(source: GPUImageCopyExternalImage, destination: GPUImageCopyTextureTagged, copySize: GPUExtent3DStrict): undefined {
        const dst: GPUImageCopyTextureTagged = {
            ...destination,
            texture: (destination.texture as wgi_GPUTexture).next
        };
        this.next.copyExternalImageToTexture(
            source,
            dst,
            copySize
        );
    }
    get label(): string { return this.next.label; }
}