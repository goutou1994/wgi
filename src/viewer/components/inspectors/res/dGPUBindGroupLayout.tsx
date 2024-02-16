import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUBindGroupLayout from "../../../../tracked/GPUBindGroupLayout";
import { Card, Tag } from "antd";

function visibilityToLabel(v: GPUShaderStageFlags): string {
    const labels = [];
    if (v & GPUShaderStage.COMPUTE) labels.push("COMPUTE");
    if (v & GPUShaderStage.VERTEX) labels.push("VERTEX");
    if (v & GPUShaderStage.FRAGMENT) labels.push("FRAGMENT");
    return labels.join(" | ");
}

export default function dGPUBindGroupLayout(layout: TrackedGPUBindGroupLayout): ResDetailContent | undefined {
    if (!layout.__snapshot) return undefined;
    const snapshot = layout.__snapshot;
    const ret: ResDetailContent = {
        creator: <ResLink id={snapshot.creator} />,
        attributes: [],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroupLayout"
    };

    if (snapshot.pipelineBindGroupIndex !== undefined) {
        ret.attributes = [
            {
                key: "Source",
                value: "GPUPipeline.getBindGroupLayout()"
            },
            {
                key: "BindGroup Index",
                value: snapshot.pipelineBindGroupIndex!
            }
        ];
    } else {
        ret.attributes = [
            {
                key: "Source",
                value: "GPUDevice.createBindGroupLayout()"
            }
        ]
        ret.customs = [{
            title: "Entries",
            content: <div style={{ padding: "6px 9px", display: "flex", flexWrap: "wrap" }}>
                {snapshot.entries.map((e: any) => {
                    let descText: React.JSX.Element | undefined;
                    if (e.type === "buffer") {
                        descText = <>
                            <p>Buffer Type: <Tag>{e.resourceLayout.type}</Tag></p>
                            <p>Has Dynamic Offset: {e.resourceLayout.hasDynamicOffset.toString()}</p>
                            <p>Minimum Binding Size: {e.resourceLayout.minBindingSize}</p>
                        </>;
                    } else if (e.type === "texture") {
                        descText = <>
                            <p>Sample Type: {e.resourceLayout.sampleType}</p>
                            <p>View Dimension: {e.resourceLayout.viewDimension}</p>
                            <p>Multisampled: {e.resourceLayout.multisampled.toString()}</p>
                        </>;
                    } else if (e.type === "sampler") {
                        descText = <>
                            <p>Sampler Type: {e.resourceLayout.type}</p>
                        </>;
                    } else if (e.type === "storageTexture") {
                        descText = <>
                            <p>Access: {e.resourceLayout.access}</p>
                            <p>Format: {e.resourceLayout.format}</p>
                            <p>View Dimension: {e.resourceLayout.viewDimension}</p>
                        </>;
                    } else if (e.type === "externalTexture") {
                        // nothing
                    }
                    return <Card key={e.binding} size="small" title={"Binding@" + e.binding} className="description-cards">
                        <p>Type: <Tag>{e.type}</Tag></p>
                        <p>Visibility: {visibilityToLabel(e.visibility)}</p>
                        {descText}
                    </Card>;
                })}
            </div>
        }]
    }

    return ret;
}
