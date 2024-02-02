import { brandMap } from "../../common/utils";
import TrackedGPU from "../../tracked/GPU";
import TrackedGPUAdapter from "../../tracked/GPUAdapter";
import TrackedGPUBuffer from "../../tracked/GPUBuffer";
import TrackedGPUDevice from "../../tracked/GPUDevice";
import TrackedBase from "../../tracked/tracked";


export const trackedCtorMap: { [kind: number]: new() => TrackedBase<any> } = {
    [brandMap["GPU"]]: TrackedGPU,
    [brandMap["GPUAdapter"]]: TrackedGPUAdapter,
    [brandMap["GPUDevice"]]: TrackedGPUDevice,
    [brandMap["GPUBuffer"]]: TrackedGPUBuffer,
};