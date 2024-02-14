import TextArea from "antd/es/input/TextArea";
import React from "react";

interface FragmentStageViewerProps {
    code: string;
}

export default function FragmentStageViewer(props: FragmentStageViewerProps) {
    return <TextArea value={props.code} readOnly style={{
        resize: "none",
        height: "90%"
    }}></TextArea>
}