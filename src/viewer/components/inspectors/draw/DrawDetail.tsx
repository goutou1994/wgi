import React from "react";

import styles from "./DrawDetail.module.css";
import Thumbnail from "../../imageViewer/Thumbnail";
import type TrackedGPUTexture from "../../../../tracked/GPUTexture";

export interface DrawDetailProps {
    summary: {
        colorAttachments: Array<TrackedGPUTexture>;
        depthStencilAttachment?: TrackedGPUTexture;
    }
};

export default function DrawDetail({summary}: DrawDetailProps) {
    return <div className={styles.body}>
        <div>
            <h1>
                Draw(...)
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
        </div>
    </div>
}