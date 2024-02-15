import type wgi_GPUDevice from "./GPUDevice";
import wgi_GPUTexture from "./GPUTexture";

export default class wgi_GPUCanvasContext implements GPUCanvasContext {
    __brand: "GPUCanvasContext" = "GPUCanvasContext";

    constructor(public next: GPUCanvasContext, public canvasId: string) { }
    get canvas(): HTMLCanvasElement | OffscreenCanvas { return this.next.canvas;}
    
    private _configuration?: GPUCanvasConfiguration;
    configure(configuration: GPUCanvasConfiguration): undefined {
        this._configuration = configuration;
        this.next.configure({
            ...configuration,
            device: (configuration.device as wgi_GPUDevice).next
        });
    }
    unconfigure(): undefined {
        this._configuration = undefined;
        this.next.unconfigure();
    }
    private wgiTexture?: wgi_GPUTexture;
    getCurrentTexture(): wgi_GPUTexture {
        if (this._configuration) {
            if (this.wgiTexture) {
                return this.wgiTexture;
            } else {
                const tex = this.next.getCurrentTexture();
                return new wgi_GPUTexture(tex, this._configuration.device as wgi_GPUDevice, this.canvasId);
            }
        } else {
            this.next.getCurrentTexture();
            throw "wgi_error: CanvasContext not configured."
        }
    }
}
