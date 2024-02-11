import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdCopyBufferToBuffer from "../../../../record/device/rcdCopyBufferToBuffer";
import { ArgumentType } from "./common";

export default function dCopyBufferToBuffer(rcd: RcdCopyBufferToBuffer): RcdDetailContent {
    return {
        title: <span>GPUCommandEncoder.copyBufferToBuffer</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "source",
                type: ArgumentType.Value,
                value: <ResLink id={rcd.args[0].__id} />
            },
            {
                argName: "sourceOffset",
                type: ArgumentType.Value,
                value: rcd.args[1]
            },
            {
                argName: "destination",
                type: ArgumentType.Value,
                value: <ResLink id={rcd.args[2].__id} />
            },
            {
                argName: "destinationOffset",
                type: ArgumentType.Value,
                value: rcd.args[3]
            },
            {
                argName: "size",
                type: ArgumentType.Value,
                value: rcd.args[4]
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/copyBufferToBuffer"
    };
}