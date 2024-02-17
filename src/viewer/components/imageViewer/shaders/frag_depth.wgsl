@group(0) @binding(0) var mySampler: sampler;
@group(0) @binding(1) var myTexture: texture_depth_2d;

@fragment
fn fragmentMain(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    var depth: f32 = textureSample(myTexture, mySampler, uv);
    return vec4(1.0 - depth, 1.0 - depth, 1.0 - depth, 1.0);
}
