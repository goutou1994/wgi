import wgi_GPU from "./driver/GPU";
import wgi_GPUCanvasContext from "./driver/GPUCavansContext";
import { globalRecorder } from "./recorder";

export default function inject() {
    console.log("hello wgi!");
    // gpu
    Object.defineProperty(globalThis.navigator, "gpu", {
        value: new wgi_GPU(globalThis.navigator.gpu)
    });

    // raf
    const raf = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
        return raf(time => {
            const [shouldWait, p] = globalRecorder.frameStart(time);
            if (shouldWait) {
                p!.then(() => {
                    raf(time => {
                        callback(time);
                        globalRecorder.frameEnd();
                    });
                });
            } else {
                callback(time);
                globalRecorder.frameEnd();
            }
        });
    };

    // canvas
    const _getContext = HTMLCanvasElement.prototype.getContext;
    function getContext(this: HTMLCanvasElement, contextId: string) {
        if (contextId === "webgpu") {
            const realContext = _getContext.call(this, contextId);
            if (realContext === null) return null;
            return new wgi_GPUCanvasContext(realContext, this.id);
        } else {
            return _getContext.call(this, contextId as any);
        }
    }
    HTMLCanvasElement.prototype.getContext = getContext as any;
    
    console.log("Injected");
}

export function startCapture() {
    globalRecorder.capture();
}