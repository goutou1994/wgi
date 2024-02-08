import RcdSubmit from "../../record/create/rcdSubmit";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUQueue extends wgi_GPUBase implements GPUQueue {
    __brand: "GPUQueue" = "GPUQueue";
    public getTrackedType(): (abstract new () => TrackedBase<any>) & { prototype: TrackedBase<any>; } {
        return TrackedGPUQueue;
    }
    constructor(public next: GPUQueue, public device: wgi_GPUDevice) {
        super();
    }

    submit(commandBuffers: Iterable<GPUCommandBuffer>): undefined {
        return globalRecorder.processRcd(
            RcdSubmit,
            this,
            [commandBuffers],
            () => this.next.submit(commandBuffers)
        );
    }
    onSubmittedWorkDone(): Promise<undefined> {
        return this.next.onSubmittedWorkDone();
    }
    writeBuffer(buffer: GPUBuffer, bufferOffset: number, data: BufferSource | SharedArrayBuffer, dataOffset?: number | undefined, size?: number | undefined): undefined {
        throw new Error("Method not implemented.");
    }
    writeTexture(destination: GPUImageCopyTexture, data: BufferSource | SharedArrayBuffer, dataLayout: GPUImageDataLayout, size: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    copyExternalImageToTexture(source: GPUImageCopyExternalImage, destination: GPUImageCopyTextureTagged, copySize: GPUExtent3DStrict): undefined {
        throw new Error("Method not implemented.");
    }
    get label(): string { return this.next.label; }
}