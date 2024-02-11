import inject, { testStartCapture } from "../wgi.mjs"
inject();
(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    const img = document.createElement("img");
    img.src = "tests/images/weixin.png"
    await img.decode();
    const imageBitmap = await createImageBitmap(img);

    const texture = device.createTexture({
        label: "WeixinLogo",
        size: [imageBitmap.width, imageBitmap.height, 1],
        format: "rgba8unorm",
        usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    });

    device.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: texture },
        [imageBitmap.width, imageBitmap.height]
    );

    function loop(time) {
        const texture2 = device.createTexture({
            label: "blank",
            size: [64, 64, 1],
            format: "rgba8unorm",
            usage: GPUTextureUsage.TEXTURE_BINDING
        });
        const texture2View = texture2.createView();
        device.debugRes(texture);
        texture2.destroy();
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};