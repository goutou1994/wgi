import React from "react";
import type TrackedGPUShaderModule from "../../../../tracked/GPUShaderModule";
import ResLink from "../../common/ResLink";
import { type ResDetailContent } from "./ResDetail";
import { Table, TableProps, Tag } from "antd";
import { ShaderMessageType } from "../../../../tracked/GPUShaderModule";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ReactCodeMirror from "@uiw/react-codemirror";

export default function dGPUShaderModule(sm: TrackedGPUShaderModule): ResDetailContent | undefined {
    if (!sm.__snapshot) return undefined;
    const snapshot = sm.__snapshot;
    let status = "success";
    for (const msg of snapshot.messages) {
        if (msg.type === ShaderMessageType.warning) {
            status = "warning";
        } else if (msg.type === ShaderMessageType.error) {
            status = "error";
            break;
        } 
    }
    let icon!: React.JSX.Element;
    if (status === "success") {
        icon = <CheckCircleOutlined />;
    } else if (status === "warning") {
        icon = <ExclamationCircleOutlined />;
    } else if (status === "error") {
        icon = <CloseCircleOutlined />;
    }
    const tag = <Tag icon={icon} color={status}>{status}</Tag>;
    const messageItems: TableProps['dataSource'] = snapshot.messages.map((msg, msgIndex) => ({
        key: msgIndex,
        index: msgIndex,
        status: <Tag color={ShaderMessageType[msg.type]}>{ShaderMessageType[msg.type]}</Tag>,
        message: <p>{msg.content}</p>
    }));
    const columns: TableProps["columns"] = [
        {
            key: "index",
            title: "Index",
            dataIndex: "index"
        },
        {
            key: "type",
            title: "Type",
            dataIndex: "status"
        },
        {
            key: "content",
            title: "Content",
            dataIndex: "message"
        }
    ];
        
    return {
        creator: <ResLink id={snapshot.device}/>,
        attributes: [
            {
                key: "Status",
                value: tag
            },
            {
                key: "Message Count",
                value: snapshot.messages.length
            }
        ],
        customs: [
            ...messageItems.length > 0 ? 
            [{
                title: "Messages",
                content: <Table dataSource={messageItems} columns={columns}></Table>
            }] : [],
            {
                title: "Source",
                content: <ReactCodeMirror value={snapshot.src} editable={false} ></ReactCodeMirror>
            }
        ],
        refLink: "https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule"
    };
}
