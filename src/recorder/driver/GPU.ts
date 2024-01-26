import wgi_GPUAdapter from "./GPUAdapter";
import wgi_Resource from "./res";

export default class wgi_GPU extends wgi_Resource implements GPU {
    constructor(private next: GPU) {
        super();
    }

    readonly __brand: "GPU" = "GPU";
    requestAdapter(options?: GPURequestAdapterOptions | undefined): Promise<GPUAdapter | null> {
        return this.next.requestAdapter(options).then(
            adaptor => {
                if (adaptor == null) throw "wgi: No adapter available!";
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