import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUDevice from "../../../../tracked/GPUDevice";

export default function dGPUDevice(device: TrackedGPUDevice): ResDetailContent | undefined {
    if (!device.__snapshot) return undefined;
    const snapshot = device.__snapshot;
    return {
        creator: <ResLink id={snapshot.adapter}/>,
        attributes: [],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice"
    };
}
