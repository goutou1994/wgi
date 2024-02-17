import React, { useEffect, useRef } from "react";
import TrackedGPUTexture from "../../../tracked/GPUTexture";
import { currentRcdId, globalProfile } from "../../model/global";
import vs from "./shaders/quad.wgsl";
import fs_f32 from "./shaders/frag_f32.wgsl";
import fs_depth from "./shaders/frag_depth.wgsl";

import styles from "./Thumbnail.module.css";
import useGlobalState from "../../utils/globalState";
import { isDepthFormat } from "../../../common/format";

interface ThumbnailProps {
    texture: UniversalResourceId;
    width?: number;
    height?: number;
}

export default function Thumbnail(props: ThumbnailProps) {
    const [rcdId] = useGlobalState(currentRcdId); //  do not delete this

    const texture = globalProfile!.get(props.texture) as TrackedGPUTexture;

    let width = props.width;
    let height = props.height;
    if (texture && texture.__authentic) {
        if (width === undefined && height !== undefined) {
            width = height * texture.__authentic!.width / texture.__authentic!.height;
        } else if (width !== undefined && height === undefined) {
            height = width * texture.__authentic!.height / texture.__authentic!.width;
        } else if (width === undefined && height === undefined) {
            height = 200;
            width = height * texture.__authentic!.width / texture.__authentic!.height;
        }
    } else {
        width = width ?? 200;
        height = height ?? 200;
    }

    if (!texture || !texture.__authentic || !texture.__snapshot) {
        return <div className={styles.notAvailable} style={{
            width: width!,
            height: width!
        }}>
            Texture not available.
        </div>;
    }

    const thumbnailRef = useRef<HTMLCanvasElement>(null);
    const s = texture.__snapshot!;

    useEffect(() => {
        const canvas = thumbnailRef.current!;

        canvas.id = `Thumbnail_${texture.__id}`;
        canvas.width = width!;
        canvas.height = height!;
        const device = globalProfile!.device!;
        const context = canvas.getContext("webgpu")!;
        const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device,
            format: canvasFormat
        });
        const canvasTexture = context.getCurrentTexture();

        const vsModule = device.createShaderModule({ code: vs });
        const fsModule = device.createShaderModule({ 
            code: isDepthFormat(s.format) ? fs_depth : fs_f32
        });

        const bindGroupLayout = device.createBindGroupLayout({
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {}
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: {
                        viewDimension: s.dimension,
                        sampleType: isDepthFormat(s.format) ? "depth" : "float"
                    }
                }
            ]
        });

        const bindGroup = device.createBindGroup({
            layout: bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: device.createSampler({
                        magFilter: "nearest",
                        minFilter: "linear",
                        addressModeU: "clamp-to-edge",
                        addressModeV: "clamp-to-edge",
                        addressModeW: "clamp-to-edge",
                        mipmapFilter: "nearest"
                    })
                },
                {
                    binding: 1,
                    resource: texture.__authentic!.createView({
                        dimension: "2d",
                        arrayLayerCount: 1
                    })
                }
            ]
        });

        const pipeline = device.createRenderPipeline({
            layout: "auto",
            vertex: {
                module: vsModule,
                entryPoint: "vertexMain"
            },
            fragment: {
                module: fsModule,
                entryPoint: "fragmentMain",
                targets: [{
                    format: canvasFormat
                }]
            },
            primitive: {
                cullMode: "none"
            }
        });

        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: canvasTexture.createView(),
                loadOp: "clear",
                storeOp: "store",
            }]
        });

        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(6);
        pass.end();

        device.queue.submit([encoder.finish()]);
    });

    return <canvas ref={thumbnailRef}></canvas>
}