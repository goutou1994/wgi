import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPURenderPipeline from "../../../../tracked/GPURenderPipeline";
import { Card, Descriptions, Tag, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function writeMaskToLabel(mask: number): string {
    if ((mask & GPUColorWrite.ALL) === GPUColorWrite.ALL) {
        return "ALL";
    }
    const bits = [];
    if (mask & GPUColorWrite.RED) bits.push("RED");
    if (mask & GPUColorWrite.GREEN) bits.push("GREEN");
    if (mask & GPUColorWrite.BLUE) bits.push("BLUE");
    if (mask & GPUColorWrite.ALPHA) bits.push("ALPHA");
    return bits.join(" | ");
}

function numberToHex(n: number): string {
    return `0x${n.toString(16).toUpperCase()}`;
}

export default function dGPURenderPipeline(pipeline: TrackedGPURenderPipeline): ResDetailContent | undefined {
    if (!pipeline.__snapshot) return undefined;
    const snapshot = pipeline.__snapshot;

    const vertexContent = <Descriptions column={2} bordered items={[
        {
            key: "shader",
            label: "Shader Module",
            children: <ResLink id={snapshot.vsModule} />
        },
        {
            key: "entryPoint",
            label: "Entry Point",
            children: snapshot.vsEntryPoint ?? "Not Speicified"
        },
        ...snapshot.vbs.map((vb, vbIndex) => ({
            key: "vb" + vbIndex,
            label: "Vertex Buffer#" + vbIndex,
            children: <div className="inner-no-margin" key={"vb" + vbIndex}>
                <div>
                    <Descriptions bordered items={[
                        {
                            key: "arrayStride",
                            label: "Array Stride",
                            children: vb.arrayStride
                        },
                        {
                            key: "stepMode",
                            label: "Step Mode",
                            children: vb.stepMode
                        },
                    ]} />
                </div>
                <div style={{ padding: "6px 9px", display: "flex", flexWrap: "wrap" }}>
                    {
                        vb.attributes.map((attr, attrIndex) =>
                            <Card size="small" key={"attr" + attrIndex} title={`Attribute#${attrIndex}`} className="description-cards">
                                <p>Format: <Tag>{attr.format}</Tag></p>
                                <p>Offset: {attr.offset}</p>
                                <p>Shader Location: {attr.shaderLocation}</p>
                            </Card>)
                    }
                </div>
            </div>
        }))
    ]} />;

    let fragmentContent = <p>No Fragment Stage.</p>
    if (snapshot.fsModule) {
        fragmentContent = <Descriptions column={2} bordered items={[
            {
                key: "shader",
                label: "Shader Module",
                children: <ResLink id={snapshot.fsModule} />
            },
            {
                key: "entryPoint",
                label: "Entry Point",
                children: snapshot.fsEntryPoint ?? "Not Speicified"
            },
            ...snapshot.targets.map((target, targetIndex) => ({
                key: "target" + targetIndex,
                label: "Target#" + targetIndex,
                children: <div className="inner-no-margin">
                    <Descriptions bordered items={[
                        {
                            key: "format",
                            label: "Color Format",
                            children: target.format
                        },
                        {
                            key: "writeMask",
                            label: "Write Mask",
                            children: <Tooltip title={`flags value: ${target.writeMask}`}>{writeMaskToLabel(target.writeMask)}</Tooltip>
                        }
                    ]} />
                    <div style={{ padding: "6px 9px", display: "flex", flexWrap: "wrap" }}>
                        <Card size="small" title="Color Blend" className="description-cards">
                            <p>Operation: <Tag>{target.blend.color.operation}</Tag></p>
                            <p>Source Factor: <Tag>{target.blend.color.srcFactor}</Tag></p>
                            <p>Destination Factor: <Tag>{target.blend.color.dstFactor}</Tag></p>
                        </Card>
                        <Card size="small" title="Alpha Blend" className="description-cards">
                            <p>Operation: <Tag>{target.blend.alpha.operation}</Tag></p>
                            <p>Source Factor: <Tag>{target.blend.alpha.srcFactor}</Tag></p>
                            <p>Destination Factor: <Tag>{target.blend.alpha.dstFactor}</Tag></p>
                        </Card>
                    </div>
                </div>
            }))
        ]} />;
    }

    let depthStencilContent = <p>Depth and Stencil not enabled.</p>
    if (snapshot.depthStencilFormat) {
        depthStencilContent = <Descriptions column={2} bordered items={[
            {
                key: "depthStencilFormat",
                label: "DepthStencil Format",
                children: snapshot.depthStencilFormat
            },
            {
                key: "depthCompare",
                label: "Depth Compare",
                children: snapshot.depthCompare
            },
            {
                key: "depthWriteEnabled",
                label: "Depth Write",
                children: snapshot.depthWriteEnabled ? "Enabled" : "Disabled"
            },
            {
                key: "stencilReadMask",
                label: "Stencil Read Mask",
                children: numberToHex(snapshot.stencilReadMask)
            },
            {
                key: "stencilWriteMask",
                label: "Stencil Write Mask",
                children: numberToHex(snapshot.stencilWriteMask)
            },
            {
                key: "stencilStates",
                label: "Stencil States",
                children: <div style={{ padding: "6px 9px", display: "flex", flexWrap: "wrap" }}>
                    <Card size="small" title="Front Stencil" className="description-cards">
                        <p>Compare: {snapshot.stencilFront.compare}</p>
                        <p>Fail Operation: {snapshot.stencilFront.failOp}</p>
                        <p>Depth Fail Operation: {snapshot.stencilFront.depthFailOp}</p>
                        <p>Pass Operation: {snapshot.stencilFront.passOp}</p>
                    </Card>
                    <Card size="small" title="Back Stencil" className="description-cards">
                        <p>Compare: {snapshot.stencilBack.compare}</p>
                        <p>Fail Operation: {snapshot.stencilBack.failOp}</p>
                        <p>Depth Fail Operation: {snapshot.stencilBack.depthFailOp}</p>
                        <p>Pass Operation: {snapshot.stencilBack.passOp}</p>
                    </Card>
                </div>
            },
        ]} />;
    }

    const primitiveContent = <Descriptions column={2} bordered items={[
        {
            key: "topology",
            label: "Topology",
            children: snapshot.topology
        },
        {
            key: "cullMode",
            label: "Cull Mode",
            children: snapshot.cullMode
        },
        {
            key: "frontFace",
            label: "Front Face",
            children: snapshot.frontFace
        },
        {
            key: "stripIndexFormat",
            label: <span>Strip Index Format <Tooltip title={<span style={{whiteSpace: "nowrap"}}>Only works on strip-type topologies.</span>}><QuestionCircleOutlined style={{cursor: "help"}} /></Tooltip></span>,
            children: snapshot.stripIndexFormat ?? "Not Speicified"
        },
    ]} />;

    const multisampleContent = <Descriptions column={3} bordered items={[
        {
            key: "sampleCount",
            label: "Sample Count",
            children: snapshot.sampleCount
        },
        {
            key: "sampleMask",
            label: "Sample Mask",
            children: numberToHex(snapshot.sampleMask)
        },
        {
            key: "alphaToCoverageEnabled",
            label: "Alpha to Coverage",
            children: snapshot.alphaToCoverageEnabled ? "Enabled" : "Disabled"
        }
    ]} />;

    return {
        creator: <ResLink id={snapshot.device} />,
        attributes: [
            {
                key: "layout",
                value: snapshot.layout
            }
        ],
        customs: [
            {
                title: "Vertex Stage",
                content: vertexContent
            },
            {
                title: "Fragment Stage",
                content: fragmentContent
            },
            {
                title: "Depth & Stencil",
                content: depthStencilContent
            },
            {
                title: "Primitive",
                content: primitiveContent
            },
            {
                title: "Multisample",
                content: multisampleContent
            },
        ]
    };
}
