import React from "react";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";
import RcdSetPipeline from "../../../../record/pass/RcdSetPipeline";
import { ArgumentType } from "./common";

export default function dSetPipeline(rcd: RcdSetPipeline): RcdDetailContent {
    return {
        title: <span>GPURenderPipelineEncoder.setPipeline</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "pipeline",
                type: ArgumentType.Value,
                value: <ResLink id={rcd.args[0].__id}/>
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/setPipeline"
    };
}
