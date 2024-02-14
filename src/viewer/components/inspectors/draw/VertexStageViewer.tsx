import TextArea from "antd/es/input/TextArea";
import React from "react";

interface VertexStageViewerProps {
    code: string;
}

export default function VertexStageViewer(props: VertexStageViewerProps) {
    return <TextArea value={props.code} readOnly style={{
        resize: "none",
        height: "90%"
    }}></TextArea>
}