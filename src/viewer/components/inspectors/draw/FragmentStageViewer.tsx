import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";

interface FragmentStageViewerProps {
    code: string;
}

export default function FragmentStageViewer(props: FragmentStageViewerProps) {
    return <ReactCodeMirror value={props.code} editable={false}></ReactCodeMirror>
}