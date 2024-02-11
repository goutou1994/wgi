import React from "react";
import RcdFinish from "../../../../record/encoder/rcdFinish";
import ResLink from "../../common/ResLink";
import type { RcdDetailContent } from "./RcdDetail";

export default function dFinish(rcd: RcdFinish): RcdDetailContent {
    return {
        title: <span>GPUCommandEncoder.finish</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder/finish"
    };
}
