import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateSampler from "../../../../record/device/rcdCreateSampler";

export default function dCreateSampler(rcd: RcdCreateSampler): RcdDetailContent {
    return {
        title: <span>GPUDevice.createSampler</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: rcd.args[0] ? [{
            argName: "descriptor",
            type: ArgumentType.Json,
            value: rcd.args[0]
        }] : [],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createSampler"
    };
}