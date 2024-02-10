import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateTexture from "../../../../record/create/rcdCreateTexture";

export default function dCreateTexture(rcd: RcdCreateTexture): RcdDetailContent {
    return {
        title: <span>GPUDevice.createTexture</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [{
            argName: "descriptor",
            type: ArgumentType.Json,
            value: rcd.args[0]
        }],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createBuffer"
    };
}