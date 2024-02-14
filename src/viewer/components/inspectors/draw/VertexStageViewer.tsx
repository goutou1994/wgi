import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";

interface VertexStageViewerProps {
    code: string;
}

export default function VertexStageViewer(props: VertexStageViewerProps) {
    return <ReactCodeMirror value={props.code} editable={false}></ReactCodeMirror>
}