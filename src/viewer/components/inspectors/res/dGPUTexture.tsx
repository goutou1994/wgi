import React from "react";
import TrackedGPUBuffer from "../../../../tracked/GPUBuffer";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUTexture from "../../../../tracked/GPUTexture";
import { Tooltip } from "antd";
import Thumbnail from "../../imageViewer/Thumbnail";

function usageToLabel(usage: GPUTextureUsageFlags): string {
    const names = [];
    for (const flag in GPUTextureUsage) {
        if (flag === "prototype") continue;
        // @ts-ignore
        const bit = GPUTextureUsage[flag];
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

export default function dGPUTexture(texture: TrackedGPUTexture): ResDetailContent | undefined {
    if (!texture.__snapshot) return undefined;
    const snapshot = texture.__snapshot;

    let preview: React.JSX.Element;
    if (snapshot.content.byteLength > 0) {
        preview = <div>
            <Thumbnail texture={texture.__id} width={200 * snapshot.width / snapshot.height} height={200}></Thumbnail>
        </div>;
    } else {
        preview = <p>Preview not available.</p>;
    }

    return {
        creator: <ResLink id={snapshot.device}/>,
        attributes: [
            {
                key: "width",
                value: snapshot.width
            },
            {
                key: "height",
                value: snapshot.height
            },
            {
                key: "depthOrArrayLayers",
                value: snapshot.depthOrArrayLayers
            },
            {
                key: "mipLevelCount",
                value: snapshot.mipLevelCount
            },
            {
                key: "sampleCount",
                value: snapshot.sampleCount
            },
            {
                key: "dimension",
                value: snapshot.dimension
            },
            {
                key: "format",
                value: snapshot.format
            },
            {
                key: "usage",
                value: <Tooltip title={`flags value: ${snapshot.usage}`}>{usageToLabel(snapshot.usage)}</Tooltip>
            }
        ],
        customs: [{
            title: "Preview",
            content: preview
        }],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture"
    };
}
