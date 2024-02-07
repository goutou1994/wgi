import inject, { testStartCapture } from "../wgi.mjs"
inject();
(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    let frameCount = 0;
    function loop(time) {
        device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.MAP_WRITE
        });
        if (frameCount++ <= 1000) {
            requestAnimationFrame(loop);
        }
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};