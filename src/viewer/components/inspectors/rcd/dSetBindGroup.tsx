import React from "react";
import type { RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdSetBindGroup from "../../../../record/pass/RcdSetBindGroup";
import { ArgumentType } from "./common";

export default function dSetBindGroup(rcd: RcdSetBindGroup): RcdDetailContent {
    return {
        title: <span>GPURenderPassEncoder.setBindGroup</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "index",
                type: ArgumentType.Value,
                value: rcd.args[0]
            },
            {
                argName: "bindGroup",
                type: ArgumentType.Value,
                value: rcd.args[1] ? <ResLink id={rcd.args[1].__id} /> : "null"
            },
            ...rcd.args[2] ? [{
                argName: "dynamicOffsets",
                type: ArgumentType.Value,
                value: `[${rcd.args[2].join(", ")}]`
            }] : []
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/setBindGroup"
    };
}