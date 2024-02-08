import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdDebugRes from "../../../../record/rcdDebugRes";
import { ArgumentType } from "./common";

export default function dDebugRes(rcd: RcdDebugRes): RcdDetailContent {
    return {
        title: <span>Debug Resource Inspector</span>,
        arguments: [
            {
                argName: "Inspected Resource",
                type: ArgumentType.Value,
                value: <ResLink id={rcd.args[0].res.__id} />
            }
        ]
    };
}