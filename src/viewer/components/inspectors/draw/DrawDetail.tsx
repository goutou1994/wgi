import React, { useState } from "react";

import styles from "./DrawDetail.module.css";
import Thumbnail from "../../imageViewer/Thumbnail";
import type TrackedGPUTexture from "../../../../tracked/GPUTexture";
import type { GPURenderPipelineSnapshot } from "../../../../tracked/GPURenderPipeline";
import type { GPURenderPassEncoderRuntime } from "../../../../tracked/GPURenderPassEncoder";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import VertexViewer from "./VertexViewer";
import VertexStageViewer from "./VertexStageViewer";
import FragmentStageViewer from "./FragmentStageViewer";
import { openResTab } from "../../../model/inspector";
import { extractResourceId, makeResourceText } from "../res/dGPUBindGroup";

export interface DrawDetailProps {
    summary: {
        numIndices: number;
        firstIndex?: number;
        baseVertex?: number;
        numInstance?: number;
        firstInstance?: number;
        colorAttachments: Array<TrackedGPUTexture>;
        depthStencilAttachment?: TrackedGPUTexture;
        vbs: Array<{
            layout: GPURenderPipelineSnapshot["vbs"]["0"],
            bound?: GPURenderPassEncoderRuntime["vbs"]["0"]
        }>,
        ib?: GPURenderPassEncoderRuntime['ib'];
        vertexShader: string;
        fragmentShader?: string;
        bindGroups: GPURenderPassEncoderRuntime["bindGroups"]
    }
};

enum DrawerType {
    Vertex,
    VS,
    FS
}

export default function DrawDetail({ summary }: DrawDetailProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerInfo, setDrawerInfo] = useState<any>(null);
    const handleDrawerOpen = (info: any) => { setDrawerOpen(true); setDrawerInfo(info); }
    const handleDrawerClose = () => { setDrawerOpen(false); }

    let drawer: React.JSX.Element | undefined = undefined;
    let drawerTitle = "";
    if (drawerOpen) {
        if (!drawerInfo) {
        } else if (drawerInfo.type === DrawerType.Vertex) {
            drawer = <VertexViewer
                vbInfo={summary.vbs[drawerInfo.slot ?? 0]}
                ibInfo={summary.ib}
                numIndices={summary.numIndices}
                firstIndex={summary.firstIndex}
                baseVertex={summary.baseVertex}
                numInstance={summary.numIndices}
                firstInstance={summary.firstInstance}
            />;
            drawerTitle = "Vertex Viewer";
        } else if (drawerInfo.type === DrawerType.VS) {
            drawer = <VertexStageViewer code={summary.vertexShader} />;
            drawerTitle = "Vertex Stage Viewer";
        } else if (drawerInfo.type === DrawerType.FS) {
            drawer = <FragmentStageViewer code={summary.fragmentShader ?? "No frag stage."} />;
            drawerTitle = "Fragment Stage Viewer";
        }
    }

    return <div className={styles.body}>
        <div>
            <h1>
                Draw Summary
            </h1>
            <h2>
                Attachments
            </h2>
            <div className={[styles.card, styles.attWrapper].join(' ')}>
                <div>
                    {
                        summary.colorAttachments.length > 0 ?
                            <Thumbnail texture={summary.colorAttachments[0].__id} width={300} /> :
                            <span>No Color Attachments</span>
                    }
                </div>
                <div className={styles.attDivierVertical}></div>
                <div className={styles.noAtt}>
                    {
                        summary.depthStencilAttachment ?
                            <Thumbnail texture={summary.depthStencilAttachment.__id} width={300} /> :
                            <span>No DepthStencil Attachment</span>
                    }
                </div>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.infoItem}>
                    <h2>
                        Pipeline Stages
                    </h2>
                    <div className={styles.card}>
                        <div className={styles.itemCard} style={{ width: "130px" }} onClick={() => handleDrawerOpen({ type: DrawerType.VS })}>
                            <h3>Vertex Stage</h3>
                            <div className={styles.itemCardPopout}>
                                Open in Vertex Stage Viewer
                            </div>
                        </div>
                        {
                            summary.fragmentShader ? <div className={styles.itemCard} style={{ width: "130px" }} onClick={() => handleDrawerOpen({ type: DrawerType.FS })}>
                                <h3>Fragment Stage</h3>
                                <div className={styles.itemCardPopout}>
                                    Open in Fragment Stage Viewer
                                </div>
                            </div> : undefined
                        }
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>
                        Vertex Inputs
                    </h2>
                    {
                        summary.vbs.length > 0 ?
                            <div className={styles.card}>
                                {
                                    summary.ib ? <div className={styles.itemCard} style={{ width: "200px", cursor: "default" }} >
                                        <h3>Index Buffer</h3>
                                        <p>Number of Indices: {summary.numIndices}</p>
                                        <p>Index Format: {summary.ib!.format}</p>
                                    </div> : undefined
                                }
                                {
                                    summary.vbs.map((vb, vbIndex) => {
                                        return <div className={styles.itemCard} key={vbIndex} style={{ width: "200px" }} onClick={() => handleDrawerOpen({ type: DrawerType.Vertex, slot: vbIndex })}>
                                            <h3>Slot#{vbIndex}</h3>
                                            <p>Number of Attributes: {vb.layout.attributes.length}</p>
                                            <p>Step Mode: {vb.layout.stepMode}</p>
                                            {
                                                vb.bound ? <p>Buffer Bound: buffer#{vb.bound.buffer.label}</p> :
                                                    <p>No Buffer Bound<ExclamationCircleOutlined /></p>
                                            }
                                            <div className={styles.itemCardPopout}>
                                                Open in Vertex Viewer
                                            </div>
                                        </div>
                                    })
                                }
                            </div> : <p>No Vertex Inputs</p>
                    }
                </div>
                <div className={styles.infoItem}>
                    <h2>
                        Bind Group Resources
                    </h2>
                    {
                        Object.keys(summary.bindGroups).length > 0 ?
                            <div className={styles.card}>
                                {
                                    Object.entries(summary.bindGroups).map(([binding, info]) => {
                                        return info.bindGroup.__snapshot!.entries.map(e => {
                                            return <div className={[styles.itemCard, styles.smallItemCard].join(' ')} key={`g${binding}b${e.binding}`} onClick={() => openResTab(extractResourceId(e))}>
                                                <h4>group@{binding}<br />binding@{e.binding}</h4>
                                                {makeResourceText(e)}
                                            </div>
                                        })
                                    })
                                }
                            </div> : <p>No Resource Bound</p>
                    }
                </div>
            </div>
        </div>
        <Drawer
            title={drawerTitle}
            placement="bottom"
            closable={true}
            onClose={handleDrawerClose}
            open={drawerOpen}
            height="90%"
        >
            {drawer}
        </Drawer>
    </div>
}