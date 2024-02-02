import React from "react";
import TrackedGPUBuffer from "../../../../tracked/GPUBuffer";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";

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
                value: snapshot.usage
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer"
    };
}
