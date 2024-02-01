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
    constructor(private next: GPUBuffer, public device: wgi_GPUDevice, private desc: GPUBufferDescriptor) {
        super();
        this.deps.add(device);
    }
    readonly __brand: "GPUBuffer" = "GPUBuffer";

    get size(): number { return this.next.size; };
    get usage(): number { return this.next.usage; };
    get mapState(): GPUBufferMapState { return this.next.mapState; }
    public mapAsync(mode: number, offset?: number | undefined, size?: number | undefined): Promise<undefined> {
        throw new Error("Method not implemented.");
    }
    public getMappedRange(offset?: number | undefined, size?: number | undefined): ArrayBuffer {
        throw new Error("Method not implemented.");
    }
    public unmap(): undefined {
        throw new Error("Method not implemented.");
    }
    public destroy(): undefined {
        throw new Error("Method not implemented.");
    }
    get label(): string { return this.next.label; };
    set label(v: string) { this.next.label = v; }

    public serialize(ds: DataStream): void {
        serializeString(ds, this.label);
        ds.write(DataStream.Type.UInt32, this.size);
        ds.write(DataStream.Type.UInt32, this.usage);
    }

}