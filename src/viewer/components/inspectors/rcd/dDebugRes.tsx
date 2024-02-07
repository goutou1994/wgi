import React from "react";
import type { RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import RcdDebugRes from "../../../../record/rcdDebugRes";

export default function dDebugRes(rcd: RcdDebugRes): RcdDetailContent {
    return {
        title: <span>Debug Resource Inspector</span>,
        arguments: [
            [
                {
                    key: "res",
                    value: <ResLink id={rcd.args[0].res.__id} />
                }
            ]
        ]
    };
}