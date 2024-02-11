import React from "react";
import ResLink from "../../common/ResLink";
import type { ResDetailContent } from "./ResDetail";
import TrackedGPUTextureView from "../../../../tracked/GPUTextureView";
import { globalProfile } from "../../../model/global";
import type TrackedGPUTexture from "../../../../tracked/GPUTexture";
import { Tag } from "antd";

export default function dGPUTextureView(view: TrackedGPUTextureView): ResDetailContent | undefined {
    if (!view.__snapshot) return undefined;
    const snapshot = view.__snapshot;
    const texture = globalProfile!.get<TrackedGPUTexture>(snapshot.texture);
    const isCanvas = texture.__snapshot!.isCanvas;
    return {
        creator: <ResLink id={snapshot.texture}/>,
        title: <span>{`GPUTextureView#${view.label}`}{isCanvas ? <Tag color="volcano" style={{fontSize: "large"}}>canvas</Tag> : undefined}</span>,
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
