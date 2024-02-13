import React from "react";

import styles from "./DrawDetail.module.css";
import Thumbnail from "../../imageViewer/Thumbnail";
import type TrackedGPUTexture from "../../../../tracked/GPUTexture";
import type { GPURenderPipelineSnapshot } from "../../../../tracked/GPURenderPipeline";
import type { GPURenderPassEncoderRuntime } from "../../../../tracked/GPURenderPassEncoder";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export interface DrawDetailProps {
    summary: {
        colorAttachments: Array<TrackedGPUTexture>;
        depthStencilAttachment?: TrackedGPUTexture;
        vbs: Array<{
            layout: GPURenderPipelineSnapshot["vbs"]["0"],
            bound?: GPURenderPassEncoderRuntime["vbs"]["0"]
        }>
    }
};

export default function DrawDetail({summary}: DrawDetailProps) {
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
                        <Thumbnail texture={summary.colorAttachments[0].__id} width={300}/> :
                        <span>No Color Attachments</span>
                    }
                </div>
                <div className={styles.attDivierVertical}></div>
                <div className={styles.noAtt}>
                    {
                        summary.depthStencilAttachment ? 
                        <Thumbnail texture={summary.depthStencilAttachment.__id} width={300}/> :
                        <span>No DepthStencil Attachment</span>
                    }
                </div>
            </div>
            <h2>
                Vertex Buffers
            </h2>
            <div className={[styles.card, styles.vbWrapper].join(' ')}>
                {
                    summary.vbs.map((vb,vbIndex) => {
                        return <div className={styles.vbCard} key={vbIndex}>
                            <h3>Slot#{vbIndex}</h3>
                            <p>Number of Attributes: {vb.layout.attributes.length}</p>
                            <p>Step Mode: {vb.layout.stepMode}</p>
                            {
                                vb.bound ? <p>Buffer Bound: buffer#{vb.bound.buffer.__id}</p> :
                                <p>No Buffer Bound<ExclamationCircleOutlined /></p>
                            }
                            <div className={styles.vbCardPopout}>
                                Open in Vertex Viewer
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}