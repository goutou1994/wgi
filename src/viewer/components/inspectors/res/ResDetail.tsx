import React from "react";
import useGlobalState from "../../../utils/globalState";
import { currentRcdId, globalProfile } from "../../../model/global";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./ResDetail.module.css";
import { Collapse, CollapseProps, Descriptions, DescriptionsProps } from "antd";
import { brandMap } from "../../../../common/brand";
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
    preview?: React.JSX.Element | string | undefined;
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
        const attrDescription: DescriptionsProps["items"] = content.attributes.map((attr, attrIndex) => ({
            key: attrIndex,
            label: attr.key,
            children: attr.value
        }));
        collapseItems.push({
            key: "attributes",
            label: "Properties",
            children: <Descriptions items={attrDescription} bordered></Descriptions>
        });
    } else {
        collapseItems.push({
            key: "attributes",
            label: "Properties",
            children: <p>No properties.</p>
        });
    }
    if (content.preview) {
        collapseItems.push({
            key: "preview",
            label: "Preview",
            children: content.preview
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