import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCopyTextureToTexture from "../../../../record/encoder/rcdCopyTextureToTexture";

export default function dCopyTextureToTexture(rcd: RcdCopyTextureToTexture): RcdDetailContent {
    const args = rcd.transformArgs(rcd.args, tracked => `$wgiResource_${tracked.__id}`);
    return {
        title: <span>GPUCommandEncoder.copyTextureToTexture</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "source",
                type: ArgumentType.Json,
                value: args[0]
            },
            {
                argName: "destination",
                type: ArgumentType.Json,
                value: args[1]
            },
            {
                argName: "copySize",
                type: ArgumentType.Json,
                value: args[2]
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/copyTextureToTexture"
    };
}