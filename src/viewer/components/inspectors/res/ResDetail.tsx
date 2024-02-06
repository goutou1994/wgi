import React from "react";
import useGlobalState from "../../../utils/globalState";
import { currentRcdId, globalProfile } from "../../../model/global";
import dGPUBuffer from "./dGPUBuffer";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./ResDetail.module.css";
import { Collapse, CollapseProps } from "antd";
import { brandMap } from "../../../../common/utils";
import { ResDetailMap } from "./utils";

interface ResDetailProps {
    id: UniversalResourceId
};

export interface ResDetailContent {
    title?: React.JSX.Element | string;
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
    const detailCtor = ResDetailMap[tracked.__kind];
    if (!detailCtor) return <p>No inspector avaiable for this type of resource.</p>
    const content = detailCtor(tracked);
    if (!content) return <p>Resource not avaiable (probably not created yet).</p>

    const collapseItems: CollapseProps["items"] = [];
    if (content.creator) {
        collapseItems.push({
            key: "creator",
            label: "Creator",
            children: content.creator
        });
    }
    if (content.attributes && content.attributes.length > 0) {
        collapseItems.push({
            key: "attributes",
            label: "Properties",
            children: content.attributes.map((attr, attrIndex) => <p key={attr.key}>{attr.key}: {attr.value}</p>)
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
            {content.title ?? `${brandMap[tracked.__kind]}#${tracked.__id}`}
            {content.refLink && <LinkOutlined className={styles.refLink} onClick={handleClickRefLink} />}
           
        </h1>
        <Collapse items={collapseItems} defaultActiveKey={['attributes']}></Collapse>
    </>;
}