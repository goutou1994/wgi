import inject, { testStartCapture } from "../wgi.mjs"
inject();

const vertices = new Float32Array([
    //   X,    Y,
    -0.8, -0.8,
    0.8, -0.8,
    0.8, 0.8,
    -0.8, 0.8,
]);

const vs = `
@vertex
fn vertexMain(@location(0) pos: vec2f) -> @builtin(position) vec4f {
  return vec4f(pos.x, pos.y, 0, 1);
}
`;

const fs = `
@fragment
fn fragmentMain() -> @location(0) vec4f {
  return vec4f(1, 0, 0, 1); // (Red, Green, Blue, Alpha)
}
`;
/* todo list:
    shaderModule
*/

(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    const canvas = document.getElementById("mainCanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    const context = canvas.getContext("webgpu");
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });

    const vertexBuffer = device.createBuffer({
        label: "triangle",
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices);
    const vertexBufferLayout = {
        arrayStride: 8,
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0, // Position, see vertex shader
        }],
    };

    const indexBuffer = device.createBuffer({
        label: "index",
        size: 6 * 2,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(indexBuffer, /*bufferOffset=*/0, new Uint16Array([0, 0, 2, 0, 1, 0]));

    const vsModule = device.createShaderModule({
        label: "vs shader",
        code: vs
    });
    const fsModule = device.createShaderModule({
        label: "fs shader",
        code: fs
    });

    const cellPipeline = device.createRenderPipeline({
        label: "triangle",
        layout: "auto",
        vertex: {
            module: vsModule,
            entryPoint: "vertexMain",
            buffers: [vertexBufferLayout]
        },
        fragment: {
            module: fsModule,
            entryPoint: "fragmentMain",
            targets: [{
                format: canvasFormat
            }]
        }
    });


    function loop(time) {
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
            }]
        });

        pass.setPipeline(cellPipeline);
        pass.setVertexBuffer(0, vertexBuffer);
        pass.setIndexBuffer(indexBuffer, "uint16", 2 * 2);
        pass.drawIndexed(3); // 6 vertices
        pass.end();

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