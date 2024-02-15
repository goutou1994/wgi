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
struct Uniforms {
    color: vec4<f32>
}
@binding(0) @group(0) var<uniform> uniforms : Uniforms;
  

@fragment
fn fragmentMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    return uniforms.color;
}
`;

(async function () {
    const adatper = await navigator.gpu.requestAdapter();
    const device = await adatper.requestDevice();

    const vsm = device.createShaderModule({
        label: "vs",
        code: vs
    });

    const fsm = device.createShaderModule({
        label: "fs",
        code: fs
    });

    const vertexBufferLayout = {
        arrayStride: 8,
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0, // Position, see vertex shader
        }],
    };

    const pipeline1 = device.createRenderPipeline({
        label: "pipeline1",
        layout: "auto",
        vertex: {
            module: vsm,
            entryPoint: "vertexMain",
            buffers: [vertexBufferLayout]
        },
        fragment: {
            module: fsm,
            entryPoint: "fragmentMain",
            targets: [{
                format: "rgba8unorm",
            }]
        }
    });
    
    const buffer2 = device.createBuffer({
        size: 4 * 4,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM
    });

    device.queue.writeBuffer(
        buffer2, 0, new Float32Array([5.5, 6.6, 7.7, 1.0])
    );

    function loop(time) {
        
        const layout = device.createBindGroupLayout({
            label: "layout1",
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX,
                    buffer:  {}
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: { }
                }
            ]
        });
        const bindGroup = device.createBindGroup({
            label: "bindGroup1",
            layout: pipeline1.getBindGroupLayout(0),
            entries: [{
                binding: 0,
                resource: {
                    buffer: buffer2
                }
            }]
        });
        requestAnimationFrame(loop);
    }
    console.log("begin loop!");
    requestAnimationFrame(loop);
})();

globalThis.testStartCapture = () => {
    console.log("start capture!");
    testStartCapture();
};