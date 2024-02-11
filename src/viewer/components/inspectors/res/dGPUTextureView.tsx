import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUTextureView from "../../../../tracked/GPUTextureView";

export default function dGPUTextureView(device: TrackedGPUTextureView): ResDetailContent | undefined {
    if (!device.__snapshot) return undefined;
    const snapshot = device.__snapshot;
    return {
        creator: <ResLink id={snapshot.texture}/>,
        attributes: [
            {
                key: "Aspect", 
                value: snapshot.aspect
            },
            {
                key: "Dimension", 
                value: snapshot.dimension
            },
            {
                key: "Format", 
                value: snapshot.format
            },
            {
                key: "Base Array Layer", 
                value: snapshot.baseArrayLayer
            },
            {
                key: "Array Layer Count", 
                value: snapshot.arrayLayerCount
            },
            {
                key: "Base Mipmap Level", 
                value: snapshot.baseMipLevel
            },
            {
                key: "Mipmap Level Count", 
                value: snapshot.mipLevelCount
            },
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUTextureView"
    };
}
