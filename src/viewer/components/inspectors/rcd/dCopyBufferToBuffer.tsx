import React from "react";
import type { RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdCopyBufferToBuffer from "../../../../record/create/rcdCopyBufferToBuffer";

export default function dCopyBufferToBuffer(rcd: RcdCopyBufferToBuffer): RcdDetailContent {
    return {
        title: <span>GPUCommandEncoder.copyBufferToBuffer</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            [
                {
                    key: "src",
                    value: <ResLink id={rcd.args[0].__id} />
                },
                {
                    key: "srcOffset",
                    value: rcd.args[1]
                },
                {
                    key: "dst",
                    value: <ResLink id={rcd.args[2].__id} />
                },
                {
                    key: "dstOffset",
                    value: rcd.args[3]
                },
                {
                    key: "size",
                    value: rcd.args[4]
                }
            ]
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/copyBufferToBuffer"
    };
}