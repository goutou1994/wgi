import inject, { testStartCapture } from "../wgi.mjs"
inject();

const vs = `
const pos = array<vec2<f32>, 6>(
    vec2(-1, -1),
    vec2( 1, -1),
    vec2( 1,  1),
    vec2(-1, -1),
    vec2( 1,  1),
    vec2(-1,  1)
);

struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) uv : vec2<f32>,
}

@vertex
fn vertexMain(@builtin(vertex_index) VertexIndex : u32) -> VertexOutput {
    var output : VertexOutput;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    output.uv = pos[VertexIndex] * vec2(0.5f, -0.5f) + 0.5f;
    return output;
}
`;

const fs = `
@group(0) @binding(0) var mySampler: sampler;
@group(0) @binding(1) var myTexture: texture_2d<f32>;

@fragment1
fn fragmentMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    return textureSample(myTexture, mySampler, uv);
}
`;

(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    const vsm = device.createShaderModule({
        label: "vs",
        code: vs
    });

    function loop(time) {
        const fsm = device.createShaderModule({
            label: "fs",
            code: fs
        });
        device.debugRes(vsm);
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};