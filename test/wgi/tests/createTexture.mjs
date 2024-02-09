import inject, { testStartCapture } from "../wgi.mjs"
inject();
(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    function loop(time) {
        const texture = device.createTexture({
            size: [64, 64, 1],
            format: "rgba8unorm",
            usage: GPUTextureUsage.TEXTURE_BINDING
        });
        device.debugRes(texture);
        texture.destroy();
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};