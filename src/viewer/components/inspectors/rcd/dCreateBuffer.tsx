import React from "react";
import RcdCreateBuffer from "../../../../record/create/rcdCreateBuffer";
import type { RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";

export default function dCreateBufferView(rcd: RcdCreateBuffer): RcdDetailContent {
    return {
        title: <span>device.CreateBuffer</span>,
        caller: `GPUDevice#${rcd.caller!.__id}`,
        arguments: [
            [
                {
                    key: "size",
                    value: rcd.args[0].size
                },
                {
                    key: "usage",
                    value: rcd.args[0].usage
                }
            ]
        ],
        return: <ResLink id={rcd.ret!.__id} label={`GPUBuffer#${rcd.ret!.__id}`}/>,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createBuffer"
    };
}