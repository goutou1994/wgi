import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateRenderPipeline from "../../../../record/device/rcdCreateRenderPipeline";

export default function dCreateRenderPipeline(rcd: RcdCreateRenderPipeline): RcdDetailContent {
    const args = {
        ...rcd.args[0],
        vertex: {
            ...rcd.args[0].vertex,
            module: `$wgiResource_${rcd.args[0].vertex.module.__id}`
        },
        fragment: rcd.args[0].fragment ? {
            ...rcd.args[0].fragment,
            module: `$wgiResource_${rcd.args[0].fragment.module.__id}`
        } : undefined
    };
    if (args.fragment === undefined) {
        delete args.fragment;
    }
    return {
        title: <span>GPUDevice.createRenderPipeline</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "descriptor",
                type: ArgumentType.Json,
                value: args
            }
        ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createRenderPipeline"
    };
}