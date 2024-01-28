import { serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import wgi_GPU from "./GPU";
import wgi_GPUDevice from "./GPUDevice";
import wgi_GPUBase from "./base";

export default class wgi_GPUAdapter extends wgi_GPUBase implements GPUAdapter {
    constructor(private next: GPUAdapter, public gpu: wgi_GPU) {
        super();
        this.deps.add(gpu);
    }
    readonly __brand: "GPUAdapter" = "GPUAdapter";
    get features(): GPUSupportedFeatures {
        return this.next.features;
    }
    get limits(): GPUSupportedLimits {
        return this.next.limits;
    }
    get isFallbackAdapter(): boolean {
        return this.next.isFallbackAdapter;
    }
    requestDevice(descriptor?: GPUDeviceDescriptor | undefined): Promise<GPUDevice> {
        return this.next.requestDevice(descriptor).then(
            device => new wgi_GPUDevice(device, this, descriptor)
        );
    }
    requestAdapterInfo(): Promise<GPUAdapterInfo> {
        return this.next.requestAdapterInfo();
    }

    public serialize(ds: DataStream): void {
        
        const features = this.features;
        ds.write(DataStream.Type.UInt32, features.size);
        for (const feature of features) {
            serializeString(ds, feature);
        }
    }
}