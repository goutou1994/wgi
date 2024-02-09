import { brandMap } from "../../common/brand";
import TrackedGPU from "../../tracked/GPU";
import TrackedGPUAdapter from "../../tracked/GPUAdapter";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPUCommandBuffer from "../../tracked/GPUCommandBuffer";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedGPUQueue from "../../tracked/GPUQueue";
import TrackedGPUTexture from "../../tracked/GPUTexture";
import TrackedBase from "../../tracked/tracked";


export const trackedCtorMap: {  [brand in brandMap]: new() => TrackedBase<any> } = {
    [brandMap.GPU]: TrackedGPU,
    [brandMap.GPUAdapter]: TrackedGPUAdapter,
    [brandMap.GPUDevice]: TrackedGPUDevice,
    [brandMap.GPUBuffer]: TrackedGPUBuffer,
    [brandMap.GPUCommandEncoder]: TrackedGPUCommandEncoder,
    [brandMap.GPUCommandBuffer]: TrackedGPUCommandBuffer,
    [brandMap.GPUQueue]: TrackedGPUQueue,
    [brandMap.GPUTexture]: TrackedGPUTexture,
};