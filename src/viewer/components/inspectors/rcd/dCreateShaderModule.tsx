import React from "react";
import { type RcdDetailContent } from "./RcdDetail";
import ResLink from "../../common/ResLink";
import { ArgumentType } from "./common";
import RcdCreateShaderModule from "../../../../record/create/rcdCreateShaderModule";
import TextArea from "antd/es/input/TextArea";

export default function dCreateShaderModule(rcd: RcdCreateShaderModule): RcdDetailContent {
    return {
        title: <span>GPUDevice.createShaderModule</span>,
        caller: <ResLink id={rcd.caller!.__id} />,
        arguments: [
            {
                argName: "descriptor",
                type: ArgumentType.Object,
                value: [
                    {
                        key: "code",
                        value: <TextArea value={rcd.args[0].code} readOnly></TextArea>
                    }
                ]
            }
        ],
        return: <ResLink id={rcd.ret!.__id} />,
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice/createShaderModule"
    };
}