import React from "react";
import RcdDrawIndexed from "../../../../record/pass/RcdDrawIndexed";
import DrawDetail, { DrawDetailProps } from "../draw/DrawDetail";
import { genDrawDetailProps } from "./dDraw";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import { RcdDetailContent } from "./RcdDetail";

export default function dDrawIndexed(rcd: RcdDrawIndexed): RcdDetailContent {
    const drawDetailProps = genDrawDetailProps(rcd.caller!);
    let customDetail = undefined;
    if (drawDetailProps) {
        Object.assign(drawDetailProps, {
            numIndices: rcd.args[0],
            numInstance: rcd.args[1],
            firstIndex: rcd.args[2],
            baseVertex: rcd.args[3],
            firstInstance: rcd.args[4],
            ib: rcd.caller!.__runtime!.ib
        });
        
        customDetail = <DrawDetail summary={drawDetailProps as DrawDetailProps["summary"]} />;
    }

    return {
        title: <span>GPURenderPassEncoder.drawIndexed</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "indexCount",
                type: ArgumentType.Value,
                value: rcd.args[0]
            },
            ...rcd.args[1] ? [{
                argName: "instanceCount",
                type: ArgumentType.Value,
                value: rcd.args[1]
            }] : [],
            ...rcd.args[2] ? [{
                argName: "firstIndex",
                type: ArgumentType.Value,
                value: rcd.args[2]
            }] : [],
            ...rcd.args[3] ? [{
                argName: "baseVertex",
                type: ArgumentType.Value,
                value: rcd.args[3]
            }] : [],
            ...rcd.args[4] ? [{
                argName: "firstInstance",
                type: ArgumentType.Value,
                value: rcd.args[4]
            }] : [],
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/drawIndexed",
        customDetail
    };
}
