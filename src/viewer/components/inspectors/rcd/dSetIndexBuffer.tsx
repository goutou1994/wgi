import React from "react";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";
import { ArgumentType } from "./common";
import RcdSetIndexBuffer from "../../../../record/pass/RcdSetIndexBuffer";

export default function dSetIndexBuffer(rcd: RcdSetIndexBuffer): RcdDetailContent {
    return {
        title: <span>GPURenderPipelineEncoder.setIndexBuffer</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "buffer",
                type: ArgumentType.Value,
                value: <ResLink id={rcd.args[0].__id}/>
            },
            {
                argName: "indexFormat",
                type: ArgumentType.Value,
                value: rcd.args[1]
            },
            ...rcd.args[2] ? [{
                argName: "offset",
                type: ArgumentType.Value,
                value: rcd.args[2]
            }] : [],
            ...rcd.args[3] ? [{
                argName: "size",
                type: ArgumentType.Value,
                value: rcd.args[3]
            }] : []
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/setVertexBuffer"
    };
}
