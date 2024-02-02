import { brandMap } from "../../../../common/utils";
import type TrackedBase from "../../../../tracked/tracked";
import type { ResDetailContent } from "./ResDetail";
import dGPUAdapter from "./dGPUAdapter";
import dGPUBuffer from "./dGPUBuffer";
import dGPUDevice from "./dGPUDevice";

export const ResDetailMap: {[kind in brandMap]?: (tracked: TrackedBase<any>) => ResDetailContent | undefined} = {
    [brandMap.GPUAdapter]:  dGPUAdapter,
    [brandMap.GPUDevice]:   dGPUDevice,
    [brandMap.GPUBuffer]:   dGPUBuffer
};