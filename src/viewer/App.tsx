import React from "react";

import "./root.css";
import DropFile from "./model/drop";
import RcdDisplay from "./components/RcdDisplay";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import InspectorGroup from "./components/InspetorGroup";
import { Spin } from "antd";
import useGlobalState from "./utils/globalState";
import { replaying } from "./model/global";

export default function App() {
    const [loading] = useGlobalState(replaying);
    return <DropFile>
        <Spin spinning={loading} fullscreen />
        <div className="wgi-header">
            WGI
        </div>
        <PanelGroup direction="horizontal">
            <Panel minSize={10} defaultSize={15}>
                <RcdDisplay />
            </Panel>
            <PanelResizeHandle>
                <div className="panel-resize"></div>
            </PanelResizeHandle>
            <Panel>
                <InspectorGroup />
            </Panel>
        </PanelGroup>
    </DropFile>;
}