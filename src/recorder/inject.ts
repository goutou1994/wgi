import wgi_GPU from "./driver/GPU";
import { globalRecorder } from "./recorder";

export default function inject() {
    console.log("hello wgi!");
    Object.defineProperty(globalThis.navigator, "gpu", {
        value: new wgi_GPU(globalThis.navigator.gpu)
    });
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
    
    console.log("Injected");
}

export function testStartCapture() {
    globalRecorder.capture();
}