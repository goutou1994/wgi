import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateBindGroup from "../../../../record/device/rcdCreateBindGroup";

export default function dCreateBindGroup(rcd: RcdCreateBindGroup): RcdDetailContent {
    const desc = rcd.transformArgs(
        rcd.args,
        tracked => `$wgiResource_${tracked.__id}`
    )[0];
    return {
        title: <span>GPUDevice.createBindGroup</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "descriptor",
                type: ArgumentType.Json,
                value: desc
            }
        ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createBindGroup"
    };
}