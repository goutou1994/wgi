import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPURenderPassEncoder from "../../../../tracked/GPURenderPassEncoder";
import { Card, Descriptions } from "antd";

export default function dGPURenderPassEncoder(pass: TrackedGPURenderPassEncoder): ResDetailContent | undefined {
    if (!pass.__snapshot) return undefined;
    const snapshot = pass.__snapshot;
    const ds = snapshot.depthStencilAttachment;
    return {
        creator: <ResLink id={snapshot.encoder} />,
        attributes: [
            {
                key: "maxDrawCount",
                value: snapshot.maxDrawCount
            }
        ],
        customs: [
            {
                title: "Color Attachments",
                content: <Descriptions bordered column={1} items={
                    snapshot.colorAttachments.map((att, attIndex) => ({
                        key: "color attachment" + attIndex,
                        label: "Attachment#" + attIndex,
                        children: <Descriptions bordered column={2} className="inner-no-margin" items={[
                            {
                                key: "view",
                                label: "View",
                                children: <ResLink id={att.view} />
                            },
                            {
                                key: "resolveTarget",
                                label: "Resolve Target",
                                children: att.resolveTarget ? <ResLink id={att.view} /> : "Not Specified"
                            },
                            {
                                key: "loadOp",
                                label: "Load Operation",
                                children: att.loadOp
                            },
                            {
                                key: "clearValue",
                                label: "Clear Value",
                                children: (att.clearValue! as Array<any>).join(", ")
                            },
                            {
                                key: "storeOp",
                                label: "Store Operation",
                                children: att.storeOp
                            },
                            {
                                key: "depthSlice",
                                label: "Depth Slice",
                                children: att.depthSlice ?? "Not Specified"
                            }
                        ]} />
                    }))
                } />
            },
            ...ds ? [{
                title: "DepthStencil Attachment",
                content: <Descriptions bordered column={3} items={[
                    {
                        key: "view",
                        label: "View",
                        children: <ResLink id={ds.view} />
                    },
                    {
                        key: "depthLoadOp",
                        label: "Depth Load Operation",
                        children: ds.depthLoadOp ?? "Not Speficied"
                    },
                    {
                        key: "depthClearValue",
                        label: "Depth Clear Value",
                        children: ds.depthClearValue ?? "Not Specified"
                    },
                    {
                        key: "depthStoreOp",
                        label: "Depth Store Operation",
                        children: ds.depthStoreOp ?? "Not Specified"
                    },
                    {
                        key: "depthReadOnly",
                        label: "Depth Readonly",
                        children: ds.depthReadOnly ? "true" : "false"
                    },
                    {
                        key: "stencilLoadOp",
                        label: "Stencil Load Operation",
                        children: ds.stencilLoadOp ?? "Not Specified"
                    },
                    {
                        key: "stencilClearValue",
                        label: "Stencil Clear Value",
                        children: ds.stencilClearValue ?? "Not Specified"
                    },
                    {
                        key: "stencilStoreOp",
                        label: "Stencil Store Operation",
                        children: ds.stencilStoreOp ?? "Not Specified"
                    },
                    {
                        key: "stencilReadOnly",
                        label: "Stencil Readonly",
                        children: ds.stencilReadOnly ? "true" : "false"
                    }
                ]} />
            }] : [],
            {
                title: "Runtime",
                content: <Descriptions bordered column={3} items={[
                    {
                        key: "pipeline",
                        label: "Pipeline",
                        children: pass.__runtime!.pipeline ? <ResLink id={pass.__runtime!.pipeline.__id} /> : "-"
                    },
                    {
                        key: "vbs",
                        label: "Vertex Buffers",
                        children: Object.keys(pass.__runtime!.vbs).length > 0 ? <div className="inner-no-margin" style={{ padding: "6px 9px", display: "flex", flexWrap: "wrap" }}>
                            {Object.keys(pass.__runtime!.vbs).map(key => {
                                const vb = pass.__runtime!.vbs[Number(key)];
                                return <Card size="small" title={"Vertex Buffer@" + key} className="description-cards">
                                    <p>buffer: <ResLink id={vb.buffer.__id} /></p>
                                    <p>offset: {vb.offset}</p>
                                    <p>size: {vb.size}</p>
                                </Card>;
                            })}
                        </div> : "-"
                    },
                    ...pass.__runtime!.ib ? [{
                        key: "ib",
                        label: "Index Buffer",
                        children: <Card size="small" title={"Index Buffer"} className="description-cards">
                            <p>buffer: <ResLink id={pass.__runtime!.ib.buffer.__id} /></p>
                            <p>format: {pass.__runtime!.ib.format}</p>
                            <p>offset: {pass.__runtime!.ib.offset}</p>
                            <p>size: {pass.__runtime!.ib.size}</p>
                        </Card>
                    }] : []
                ]} />
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder"
    };
}
