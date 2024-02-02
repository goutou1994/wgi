import TrackedGPUBuffer from "../../../../tracked/GPUBuffer";
import type { ResDetailContent } from "./ResDetail";

export default function dGPUBuffer(buffer: TrackedGPUBuffer): ResDetailContent | undefined {
    if (!buffer.__snapshot) return undefined;
    const snapshot = buffer.__snapshot;
    return {
        title: "GPUBuffer",
        creator: `GPUDevice#${snapshot.device}`,
        attributes: [
            {
                key: "size",
                value: snapshot.size
            },
            {
                key: "usage",
                value: snapshot.usage
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer"
    };
}
