import React from "react";
import { Collapse, CollapseProps, Descriptions, DescriptionsProps, List } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./RcdDetail.module.css";
import { currentRcdId, globalProfile } from "../../../model/global";
import useGlobalState from "../../../utils/globalState";
import { RcdDetailMap } from "./utils";
import InitialState from "./InitialState";
import { ArgumentType } from "./common";

type ArgumentValue = React.JSX.Element | string | number;
type ArgumentObj = Array<{
    key: string;
    value: ArgumentValue;
}>;
export interface RcdDetailContent {
    title: React.JSX.Element | string;
    caller?: React.JSX.Element | string;
    arguments: Array<{
        argName: string;
        type: ArgumentType;
        value: ArgumentObj | Array<ArgumentValue> | ArgumentValue
    }>;
    return?: React.JSX.Element | string;
    refLink?: string;
}

export default function RcdDetail() {
    const [rcdId] = useGlobalState(currentRcdId);

    if (rcdId === null) {
        return <p>No record selected.</p>
    }

    if (rcdId === -1) {
        return <InitialState />
    }

    const rcd = globalProfile!.getRcdAt(rcdId);
    const dCtor = RcdDetailMap[rcd.__kind];
    if (!dCtor) {
        return <p>Unsupported record kind.</p>
    }

    const content: RcdDetailContent = dCtor(rcd);
    const collapseItems: CollapseProps["items"] = content.arguments.map((arg, argIndex) => {
        let children: any;
        if (arg.type === ArgumentType.Value) {
            children = arg.value
        } else if (arg.type === ArgumentType.Array) {
            const descItems: DescriptionsProps["items"] = (arg.value as Array<ArgumentValue>).map((item, itemIndex) => ({
                key: itemIndex,
                label: `#${itemIndex}`,
                children: item
            }));
            children = <Descriptions items={descItems} bordered column={1}></Descriptions>
        } else {
            const descItems: DescriptionsProps["items"] = (arg.value as ArgumentObj).map(entry => ({
                key: entry.key,
                label: entry.key,
                children: entry.value
            }));
            children = <Descriptions items={descItems} bordered></Descriptions>
        }
        return {
            key: "arg" + argIndex.toString(),
            label: `Argument ${argIndex}: ${arg.argName}`,
            children
        };
    });

    if (content.caller) {
        collapseItems.unshift({
            key: "caller",
            label: "Caller",
            children: content.caller
        });
    }

    if (content.return) {
        collapseItems.push({
            key: "return",
            label: "Return Value",
            children: content.return
        });
    }

    const handleClickRefLink = () => {
        window.open(content.refLink);
    };

    return <>
        <p>Inspector: Record</p>
        <h1>
            {content.title}
            {content.refLink && <LinkOutlined className={styles.refLink} onClick={handleClickRefLink} />}

        </h1>
        <Collapse items={collapseItems} defaultActiveKey={['arg0']}></Collapse>
    </>;
}