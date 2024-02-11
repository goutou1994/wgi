import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdBeginRenderPass from "../../../../record/encoder/rcdBeginRenderPass";
import TrackedBase from "../../../../tracked/tracked";

export default function dBeginRenderPass(rcd: RcdBeginRenderPass): RcdDetailContent {
    return {
        title: <span>GPUCommandEncoder.beginRenderPass</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "descriptor",
                type: ArgumentType.Json,
                value: rcd.transformArgs(rcd.args, (tracked: TrackedBase<any>) => `$wgiResource_${tracked.__id}`)
            }
        ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/beginRenderPass"
    };
}