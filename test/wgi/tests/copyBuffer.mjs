import inject, { testStartCapture } from "../wgi.mjs"
inject();

(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    const stagingBuffer1 = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
    });
    await stagingBuffer1.mapAsync(GPUMapMode.WRITE);
    const ab1 = stagingBuffer1.getMappedRange();
    new Uint8Array(ab1).set([1, 2, 3, 4]);
    stagingBuffer1.unmap();

    const stagingBuffer2 = device.createBuffer({
        size: 4,
        usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
    });
    await stagingBuffer2.mapAsync(GPUMapMode.WRITE);
    const ab2 = stagingBuffer2.getMappedRange();
    new Uint8Array(ab2).set([101, 102, 103, 104]);
    stagingBuffer2.unmap();
    
    function loop(time) {
        const buffer = device.createBuffer({
            size: 4,
            usage: GPUBufferUsage.COPY_DST
        });
        const encoder = device.createCommandEncoder();
        encoder.copyBufferToBuffer(stagingBuffer1, 0, buffer, 0, 4);
        encoder.copyBufferToBuffer(stagingBuffer2, 0, buffer, 0, 4);
        device.queue.submit([encoder.finish()]);
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};