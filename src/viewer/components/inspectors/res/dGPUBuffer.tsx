import React from "react";
import TrackedGPUBuffer from "../../../../tracked/GPUBuffer";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";

function usageToLabel(usage: GPUBufferUsageFlags): string {
    const names = [];
    for (const flag in GPUBufferUsage) {
        if (flag === "prototype") continue;
        // @ts-ignore
        const bit = GPUBufferUsage[flag];
        if (usage & bit) {
            names.push(flag);
        }
    }
    if (names.length > 0) {
        return names.join(', ');
    } else {
        return "No Usage";
    }
}

export default function dGPUBuffer(buffer: TrackedGPUBuffer): ResDetailContent | undefined {
    if (!buffer.__snapshot) return undefined;
    const snapshot = buffer.__snapshot;
    return {
        creator: <ResLink id={snapshot.device}/>,
        attributes: [
            {
                key: "size",
                value: snapshot.size
            },
            {
                key: "usage",
                value: usageToLabel(snapshot.usage)
            }
        ],
        customs: [{
            title: "Preview",
            content: <p>{new Uint8Array(snapshot.content).toString()}</p>,
        }],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer"
    };
}
