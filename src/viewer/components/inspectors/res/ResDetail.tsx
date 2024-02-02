import React from "react";
import useGlobalState from "../../../utils/globalState";
import { currentRcdId, globalProfile } from "../../../model/global";
import dGPUBuffer from "./dGPUBuffer";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./ResDetail.module.css";
import { Collapse, CollapseProps } from "antd";

interface ResDetailProps {
    id: UniversalResourceId
};

export interface ResDetailContent {
    title: React.JSX.Element | string;
    creator: React.JSX.Element | string | undefined;
    attributes: Array<{
        key: string;
        value: React.JSX.Element | string | number;
    }>;
    refLink?: string;
}


export default function ResDetail({ id }: ResDetailProps) {
    const [rcdId] = useGlobalState(currentRcdId); //  do not delete this

    const tracked = globalProfile!.get(id);
    const content = dGPUBuffer(tracked);
    if (!content) return <p>Resource not avaiable (probably not created yet).</p>

    const collapseItems: CollapseProps["items"] = [];
    if (content.creator) {
        collapseItems.push({
            key: "creator",
            label: "Creator",
            children: content.creator
        });
    }
    if (content.attributes) {
        collapseItems.push({
            key: "attributes",
            label: "Properties",
            children: content.attributes.map((attr, attrIndex) => <p>{attr.key}: {attr.value}</p>)
        });
    } else {
        collapseItems.push({
            key: "attributes",
            label: "Properties",
            children: <p>No properties.</p>
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
        <Collapse items={collapseItems} defaultActiveKey={['attributes']}></Collapse>
    </>;
}