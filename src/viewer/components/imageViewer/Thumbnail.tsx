import React, { useEffect, useRef } from "react";
import TrackedGPUTexture from "../../../tracked/GPUTexture";
import { globalProfile } from "../../model/global";
import vs from "./shaders/quad.wgsl";
import fs from "./shaders/frag.wgsl";

import styles from "./Thumbnail.module.css";

interface ThumbnailProps {
    texture: UniversalResourceId;
    width: number;
    height: number;
}

export default function Thumbnail(props: ThumbnailProps) {
    const texture = globalProfile!.get(props.texture) as TrackedGPUTexture;
    if (!texture || !texture.__authentic || !texture.__snapshot) {
        return <div className={styles.notAvailable} style={{
            width: props.width,
            height: props.width
        }}>
            Texture not available.
        </div>;
    }

    const thumbnailRef = useRef<HTMLCanvasElement>(null);
    const s = texture.__snapshot!;

    useEffect(() => {
        const canvas = thumbnailRef.current!;

        canvas.id = `Thumbnail_${texture.__id}`;
        canvas.width = props.width;
        canvas.height = props.height;
        const device = globalProfile!.device!;
        const context = canvas.getContext("webgpu")!;
        const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device,
            format: canvasFormat
        });
        const canvasTexture = context.getCurrentTexture();

        const vsModule = device.createShaderModule({ code: vs });
        const fsModule = device.createShaderModule({ code: fs });

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
                        viewDimension: s.dimension
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
                    resource: texture.__authentic!.createView()
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