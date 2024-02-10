import React from "react";
import RcdCreateBuffer from "../../../../record/create/rcdCreateBuffer";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";

export default function dCreateBufferView(rcd: RcdCreateBuffer): RcdDetailContent {
    return {
        title: <span>GPUDevice.createBuffer</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "descriptor",
                type: ArgumentType.Json,
                value: rcd.args[0]
            }
        ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createBuffer"
    };
}