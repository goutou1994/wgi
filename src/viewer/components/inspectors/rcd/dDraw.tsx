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
import TrackedGPURenderPassEncoder from "../../../../tracked/GPURenderPassEncoder";

export function genDrawDetailProps(pass: TrackedGPURenderPassEncoder): Partial<DrawDetailProps["summary"]> | undefined {
    const pipeline = pass.__runtime?.pipeline!;
    if (!pass.__snapshot || !pipeline || !pipeline.__snapshot) {
        return undefined;
    }

    const colors = pass.__snapshot!.colorAttachments.map(att => {
        const view = globalProfile!.get<TrackedGPUTextureView>(att.resolveTarget ?? att.view);
        return globalProfile!.get<TrackedGPUTexture>(view.__snapshot!.texture);
    });

    let depthStencilAttachment = undefined;
    if (pass.__snapshot!.depthStencilAttachment) {
        const view = globalProfile!.get<TrackedGPUTextureView>(pass.__snapshot!.depthStencilAttachment.view);
        depthStencilAttachment = globalProfile!.get<TrackedGPUTexture>(view.__snapshot!.texture);
    }

    return {
        colorAttachments: colors,
        depthStencilAttachment,
        vbs: pipeline.__snapshot!.vbs.map((layout, layoutIndex) => ({
            layout,
            bound: pass.__runtime!.vbs[layoutIndex]
        })),
        bindGroups: pass.__runtime!.bindGroups,
        vertexShader: globalProfile!.get<TrackedGPUShaderModule>(pipeline.__snapshot!.vsModule).__snapshot!.src,
        fragmentShader: pipeline.__snapshot!.fsModule ? globalProfile!.get<TrackedGPUShaderModule>(pipeline.__snapshot!.fsModule).__snapshot!.src : undefined
    };
}

export default function dDraw(rcd: RcdDraw): RcdDetailContent {
    const drawDetailProps = genDrawDetailProps(rcd.caller!);
    let customDetail = undefined;
    if (drawDetailProps) {
        Object.assign(drawDetailProps, {
            numIndices: rcd.args[0],
            numInstance: rcd.args[1],
            baseVertex: rcd.args[2],
            firstInstance: rcd.args[3]
        });
        
        customDetail = <DrawDetail summary={drawDetailProps as DrawDetailProps["summary"]} />;
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
