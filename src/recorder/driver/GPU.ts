import { serializeString } from "../../common/serialize";
import { DataStream } from "../../common/utils";
import TrackedGPU from "../../tracked/GPU";
import TrackedBase from "../../tracked/tracked";
import wgi_GPUAdapter from "./GPUAdapter";
import wgi_GPUBase from "./gpubase";

export default class wgi_GPU extends wgi_GPUBase implements GPU {
    public getTrackedType() {
        return TrackedGPU;
    }

    constructor(private next: GPU) {
        super();
    }

    readonly __brand: "GPU" = "GPU";
    requestAdapter(options?: GPURequestAdapterOptions | undefined): Promise<GPUAdapter | null> {
        return this.next.requestAdapter(options).then(
            adaptor => {
                if (adaptor == null) throw "No adapter available!";
                return new wgi_GPUAdapter(adaptor!, this)
            }
        );
    }
    getPreferredCanvasFormat(): GPUTextureFormat {
        return this.next.getPreferredCanvasFormat();
    }
    get wgslLanguageFeatures(): WGSLLanguageFeatures {
        return this.next.wgslLanguageFeatures;
    }
}