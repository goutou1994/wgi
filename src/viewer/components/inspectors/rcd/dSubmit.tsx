import React from "react";
import ResLink from "../../common/ResLink";
import { type RcdDetailContent } from "./RcdDetail";
import RcdSubmit from "../../../../record/device/rcdSubmit";
import { ArgumentType } from "./common";

export default function dSubmit(rcd: RcdSubmit): RcdDetailContent {
    return {
        title: <span>GPUQueue.submit</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "commandBuffers",
                type: ArgumentType.Json,
                value: rcd.args[0].map((cb, index) => `$wgiResource_${cb.__id}`)
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUQueue/submit"
    };
}
