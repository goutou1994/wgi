import { brandMap } from "../../../../common/brand";
import type TrackedBase from "../../../../tracked/tracked";
import type { ResDetailContent } from "./ResDetail";
import dGPUAdapter from "./dGPUAdapter";
import dGPUBuffer from "./dGPUBuffer";
import dGPUCommandEncoder from "./dGPUCommandEncoder";
import dGPUDevice from "./dGPUDevice";
import dGPURenderPipeline from "./dGPURenderPipeline";
import dGPUShaderModule from "./dGPUShaderModule";
import dGPUTexture from "./dGPUTexture";
import dGPUTextureView from "./dGPUTextureView";

export const ResDetailMap: {[kind in brandMap]?: (tracked: TrackedBase<any>) => ResDetailContent | undefined} = {
    [brandMap.GPUAdapter]:          dGPUAdapter,
    [brandMap.GPUDevice]:           dGPUDevice,
    [brandMap.GPUBuffer]:           dGPUBuffer,
    [brandMap.GPUCommandEncoder]:   dGPUCommandEncoder,
    [brandMap.GPUTexture]:          dGPUTexture,
    [brandMap.GPUShaderModule]:     dGPUShaderModule,
    [brandMap.GPURenderPipeline]:   dGPURenderPipeline,
    // [brandMap.GPURenderPass]:      dGPURenderPass,
    [brandMap.GPUTextureView]:      dGPUTextureView,
};