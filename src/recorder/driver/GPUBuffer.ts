import { serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import RcdCreateBuffer from "../../record/create/rcdCreateBuffer";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedBase from "../../tracked/tracked";
import { globalRecorder } from "../recorder";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPUBuffer extends wgi_GPUBase implements GPUBuffer {
    public getTrackedType() {
        return TrackedGPUBuffer;
    }
    constructor(public next: GPUBuffer, public device: wgi_GPUDevice, public desc: GPUBufferDescriptor) {
        super();
        this.deps.add(device);
    }
    readonly __brand: "GPUBuffer" = "GPUBuffer";

    get size(): number { return this.next.size; };
    get usage(): number { return this.desc.usage; };
    get mapState(): GPUBufferMapState { return this.next.mapState; }
    public mapAsync(mode: number, offset?: number | undefined, size?: number | undefined): Promise<undefined> {
        return this.next.mapAsync(mode, offset, size);
    }
    public getMappedRange(offset?: number | undefined, size?: number | undefined): ArrayBuffer {
        return this.next.getMappedRange(offset, size);
    }
    public unmap(): undefined {
        this.next.unmap();
    }
    public destroy(): undefined {
        this.next.destroy();
    }
    get label(): string { return this.next.label; };
    set label(v: string) { this.next.label = v; }

    public serialize(ds: DataStream): void {
        serializeString(ds, this.label);
        ds.write(DataStream.Type.UInt32, this.size);
        ds.write(DataStream.Type.UInt32, this.usage);
    }

}