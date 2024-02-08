import wgi_GPUTexture from "./GPUTexture";

export default class wgi_GPUCanvasContext implements GPUCanvasContext {
    __brand: "GPUCanvasContext" = "GPUCanvasContext";

    constructor(public next: GPUCanvasContext, public canvasId: string) { }
    get canvas(): HTMLCanvasElement | OffscreenCanvas { return this.next.canvas;}
    
    private _configuration?: GPUCanvasConfiguration;
    configure(configuration: GPUCanvasConfiguration): undefined {
        this._configuration = configuration;
        this.next.configure(configuration);
    }
    unconfigure(): undefined {
        this._configuration = undefined;
        this.next.unconfigure();
    }
    getCurrentTexture(): wgi_GPUTexture {
        if (this._configuration) {
            const tex = this.next.getCurrentTexture();
            return new wgi_GPUTexture(tex, this._configuration.device, this.canvasId);
        } else {
            this.next.getCurrentTexture();
            throw "wgi_error: CanvasContext not configured."
        }
    }
}
