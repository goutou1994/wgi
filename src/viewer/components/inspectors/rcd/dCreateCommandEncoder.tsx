import React from "react";
import type { RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdCreateCommandEncoder from "../../../../record/create/rcdCreateCommandEncoder";

export default function dCreateCommandEncoder(rcd: RcdCreateCommandEncoder): RcdDetailContent {
    return {
        title: <span>GPUDevice.createCommandEncoder</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [ ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createCommandEncoder"
    };
}