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

export default function dDraw(rcd: RcdDraw): RcdDetailContent {
    const pass = rcd.caller!;
    let detailAvailable = true;
    if (!pass.__snapshot) {
        detailAvailable = false;
    }
    
    let customDetail = undefined;
    if (detailAvailable) {
        const colors = pass.__snapshot!.colorAttachments.map(att => {
            const view = globalProfile!.get<TrackedGPUTextureView>(att.resolveTarget ?? att.view);
            return globalProfile!.get<TrackedGPUTexture>(view.__snapshot!.texture);
        });
    
        const detailProps: DrawDetailProps["summary"] = {
            colorAttachments: colors
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
