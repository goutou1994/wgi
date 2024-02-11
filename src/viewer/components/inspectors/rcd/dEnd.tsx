import React from "react";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";
import RcdEnd from "../../../../record/pass/RcdEnd";

export default function dEnd(rcd: RcdEnd): RcdDetailContent {
    return {
        title: <span>GPUCommandEncoder.finish</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/end"
    };
}
