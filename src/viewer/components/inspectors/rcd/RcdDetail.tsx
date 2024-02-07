import React from "react";
import type RcdBase from "../../../../record/rcd";
import vCreateBufferView from "./dCreateBuffer";
import { Collapse, CollapseProps } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./RcdDetail.module.css";
import { currentRcdId, globalProfile } from "../../../model/global";
import useGlobalState from "../../../utils/globalState";
import { RcdDetailMap } from "./utils";

export interface RcdDetailContent {
    title: React.JSX.Element | string;
    caller?: React.JSX.Element | string;
    arguments: Array<Array<{
        key: string;
        value: React.JSX.Element | string | number;
    }>>;
    return?: React.JSX.Element | string;
    refLink?: string;
}

export default function RcdDetail() {
    const [rcdId] = useGlobalState(currentRcdId);

    if (rcdId === null) {
        return <p>No record selected.</p>
    }

    const rcd = globalProfile!.getRcdAt(rcdId);
    const dCtor = RcdDetailMap[rcd.__kind];
    if (!dCtor) {
        return <p>Unsupported record kind.</p>
    }

    const content: RcdDetailContent = dCtor(rcd);
    const collapseItems: CollapseProps["items"] = content.arguments.map((arg, argIndex) => ({
        key: "arg" + argIndex.toString(),
        label: `Argument ${argIndex}`,
        children: arg.map(param => <p key={param.key}>
            {param.key}: {param.value}
        </p>)
    }));

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