import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateView from "../../../../record/texture/rcdCreateView";

export default function dCreateView(rcd: RcdCreateView): RcdDetailContent {
    return {
        title: <span>GPUTexture.createView</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: rcd.args[0] ? [{
            argName: "descriptor",
            type: ArgumentType.Json,
            value: rcd.args[0]
        }] : [],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture/createView"
    };
}