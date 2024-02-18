import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUBindGroup, { GPUBindGroupSnapshot } from "../../../../tracked/GPUBindGroup";
import { Card } from "antd";

export function extractResourceId(res: GPUBindGroupSnapshot["entries"][0]) {
    const e = res as any;
    if (e.resourceType === "GPUBuffer") {
        return e.resource.buffer
    } else {
        return e.resource;
    }
}

export function makeResourceText(res: GPUBindGroupSnapshot["entries"][0]) {
    const e = res as any;
    let descText: React.JSX.Element | undefined;
    if (e.resourceType === "GPUBuffer") {
        descText = <>
            <p>Type: GPUBuffer</p>
            <p>Offset: {e.resource.offset}</p>
            <p>Size: {e.resource.size}</p>
        </>;
    } else if (e.resourceType === "GPUTextureView") {
        descText = <>
            <p>Type: GPUTextureView</p>
        </>;
    } else if (e.resourceType === "GPUSampler") {
        descText = <>
            <p>Type: Sampler</p>
        </>;
    } else if (e.resourceType === "storageTexture") {
        // TODO:
    } else if (e.resourceType === "GPUExternalTexture") {
        // nothing
    }
    return descText;
}

export default function dGPUBindGroup(group: TrackedGPUBindGroup): ResDetailContent | undefined {
    if (!group.__snapshot) return undefined;
    const snapshot = group.__snapshot;
    return {
        creator: <ResLink id={snapshot.device} />,
        attributes: [{
            key: "layout",
            value: <ResLink id={snapshot.layout} />
        }],
        customs: [{
            title: "Entries",
            content: <div style={{ display: "flex", flexWrap: "wrap" }}>
                {snapshot.entries.map((e: any) => {
                    let descText: React.JSX.Element | undefined;
                    if (e.resourceType === "GPUBuffer") {
                        descText = <>
                            <p>Buffer: <ResLink id={e.resource.buffer}/></p>
                            <p>Offset: {e.resource.offset}</p>
                            <p>Size: {e.resource.size}</p>
                        </>;
                    } else if (e.resourceType === "GPUTextureView") {
                        descText = <>
                            <p>Texture: <ResLink id={e.resource}/></p>
                        </>;
                    } else if (e.resourceType === "GPUSampler") {
                        descText = <>
                            <p>Sampler: <ResLink id={e.resource}/></p>
                        </>;
                    } else if (e.resourceType === "storageTexture") {
                        // TODO:
                    } else if (e.resourceType === "GPUExternalTexture") {
                        // nothing
                    }
                    return <Card key={e.binding} size="small" title={"binding@" + e.binding} className="description-cards">
                        {descText}
                    </Card>;
                })}
            </div>
        }],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup"
    };
}
