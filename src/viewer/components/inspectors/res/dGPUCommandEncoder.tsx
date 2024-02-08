import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUCommandEncoder from "../../../../tracked/GPUCommandEncoder";

export default function dGPUCommandEncoder(encoder: TrackedGPUCommandEncoder): ResDetailContent | undefined {
    if (!encoder.__snapshot) return undefined;
    const snapshot = encoder.__snapshot;
    return {
        creator: <ResLink id={snapshot.device}/>,
        attributes: [],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder"
    };
}
