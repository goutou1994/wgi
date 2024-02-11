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
                key: "Width",
                value: snapshot.width
            },
            {
                key: "Height",
                value: snapshot.height
            },
            {
                key: "DepthOrArrayLayers",
                value: snapshot.depthOrArrayLayers
            },
            {
                key: "MipLevelCount",
                value: snapshot.mipLevelCount
            },
            {
                key: "SampleCount",
                value: snapshot.sampleCount
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
                key: "Usage",
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
