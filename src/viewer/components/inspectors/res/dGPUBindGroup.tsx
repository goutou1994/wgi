import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUBindGroup from "../../../../tracked/GPUBindGroup";
import { Card } from "antd";

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
                    return <Card key={e.binding} size="small" title={"Binding@" + e.binding} className="description-cards">
                        {descText}
                    </Card>;
                })}
            </div>
        }],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup"
    };
}
