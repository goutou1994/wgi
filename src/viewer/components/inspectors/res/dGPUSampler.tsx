import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUSampler from "../../../../tracked/GPUSampler";

export default function dGPUSampler(sampler: TrackedGPUSampler): ResDetailContent | undefined {
    if (!sampler.__snapshot) return undefined;
    const snapshot = sampler.__snapshot;
    return {
        creator: <ResLink id={snapshot.device}/>,
        attributes: [
            {
                key: "addressModeU",
                value: snapshot.addressModeU
            },
            {
                key: "addressModeV",
                value: snapshot.addressModeV
            },
            {
                key: "addressModeW",
                value: snapshot.addressModeW
            },
            {
                key: "magFilter",
                value: snapshot.magFilter
            },
            {
                key: "minFilter",
                value: snapshot.minFilter
            },
            {
                key: "mipmapFilter",
                value: snapshot.mipmapFilter
            },
            {
                key: "lodMinClamp",
                value: snapshot.lodMinClamp
            },
            {
                key: "lodMaxClamp",
                value: snapshot.lodMaxClamp
            },
            {
                key: "compare",
                value: snapshot.compare ??  "Not Specified"
            },
            {
                key: "maxAnisotropy",
                value: snapshot.maxAnisotropy
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUSampler"
    };
}
