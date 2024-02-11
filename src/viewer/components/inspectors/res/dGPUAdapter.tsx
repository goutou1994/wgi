import React from "react";
import TrackedGPUAdapter from "../../../../tracked/GPUAdapter";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";

export default function dGPUAdapter(adapter: TrackedGPUAdapter): ResDetailContent | undefined {
    if (!adapter.__snapshot) return undefined;
    const snapshot = adapter.__snapshot;
    return {
        creator: <ResLink id={snapshot.gpu}/>,
        attributes: [
            {
                key: "Features",
                value: <>{Array.from(snapshot.features).map((feature, index) => <span key={index.toString()}>{feature}</span>)}</>
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapter"
    };
}
