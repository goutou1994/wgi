import wgi_GPU from "./driver/GPU";

export default function inject() {
    // @ts-expect-error
    globalThis.navigator.gpu = new wgi_GPU(globalThis.navigator.gpu);
    
    console.log("Injected");
}