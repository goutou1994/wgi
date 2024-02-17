export function isDepthFormat(f: GPUTextureFormat) {
    switch (f) {
        case 'depth16unorm':
        case 'depth24plus':
        case 'depth24plus-stencil8':
        case 'depth32float':
        case 'depth32float-stencil8':
            return true;
        default:
            return false;
    }
}