import React from "react";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";
import { ArgumentType } from "./common";
import RcdSetVertexBuffer from "../../../../record/pass/RcdSetVertexBuffer";

export default function dSetVertexBuffer(rcd: RcdSetVertexBuffer): RcdDetailContent {
    return {
        title: <span>GPURenderPipelineEncoder.setVertexBuffer</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "slot",
                type: ArgumentType.Value,
                value: rcd.args[0]
            },
            {
                argName: "buffer",
                type: ArgumentType.Value,
                value: rcd.args[1] ? <ResLink id={rcd.args[1].__id}/> : "null"
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
