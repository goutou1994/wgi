import inject, { testStartCapture } from "../wgi.mjs"
inject();
(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();
    const buffer = device.createBuffer({
        size: 120,
        usage: GPUBufferUsage.MAP_WRITE
    });
    await buffer.mapAsync(GPUMapMode.WRITE);
    const ab = buffer.getMappedRange();
    new Uint32Array(ab).set([1, 2, 3, 999]);
    const u8view = new Uint8Array(ab);
    for (let i = 16; i < 120 - 16; i++) {
        u8view[i] = Math.round(Math.random() * 256);
    }
    buffer.unmap();

    function loop(time) {
        device.debugRes(buffer);
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};