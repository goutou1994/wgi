import React from "react";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";
import RcdDraw from "../../../../record/pass/RcdDraw";
import { ArgumentType } from "./common";
import type { DrawDetailProps } from "../draw/DrawDetail";
import DrawDetail from "../draw/DrawDetail";
import TrackedGPUTextureView from "../../../../tracked/GPUTextureView";
import { globalProfile } from "../../../model/global";
import TrackedGPUTexture from "../../../../tracked/GPUTexture";
import TrackedGPUShaderModule from "../../../../tracked/GPUShaderModule";

export default function dDraw(rcd: RcdDraw): RcdDetailContent {
    const pass = rcd.caller!;
    const pipeline = rcd.caller!.__runtime?.pipeline!;
    let detailAvailable = true;
    if (!pass.__snapshot || !pipeline || !pipeline.__snapshot) {
        detailAvailable = false;
    }
    
    let customDetail = undefined;
    if (detailAvailable) {
        const colors = pass.__snapshot!.colorAttachments.map(att => {
            const view = globalProfile!.get<TrackedGPUTextureView>(att.resolveTarget ?? att.view);
            return globalProfile!.get<TrackedGPUTexture>(view.__snapshot!.texture);
        });
    
        const detailProps: DrawDetailProps["summary"] = {
            numIndices: rcd.args[0],
            colorAttachments: colors,
            vbs: pipeline.__snapshot!.vbs.map((layout, layoutIndex) => ({
                layout,
                bound: pass.__runtime!.vbs[layoutIndex]
            })),
            vertexShader: globalProfile!.get<TrackedGPUShaderModule>(pipeline.__snapshot!.vsModule).__snapshot!.src,
            fragmentShader: pipeline.__snapshot!.fsModule ? globalProfile!.get<TrackedGPUShaderModule>(pipeline.__snapshot!.fsModule).__snapshot!.src : undefined
        };
        customDetail = <DrawDetail summary={detailProps}/>;
    }

    return {
        title: <span>GPURenderPassEncoder.draw</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "vertexCount",
                type: ArgumentType.Value,
                value: rcd.args[0]
            },
            ...rcd.args[1] ? [{
                argName: "instanceCount",
                type: ArgumentType.Value,
                value: rcd.args[1]
            }] : [],
            ...rcd.args[2] ? [{
                argName: "instanceCount",
                type: ArgumentType.Value,
                value: rcd.args[2]
            }] : [],
            ...rcd.args[3] ? [{
                argName: "instanceCount",
                type: ArgumentType.Value,
                value: rcd.args[3]
            }] : [],
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/draw",
        customDetail
    };
}
