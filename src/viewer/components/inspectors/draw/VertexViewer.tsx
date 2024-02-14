import React, { useState } from "react";
import type { DrawDetailProps } from "./DrawDetail";
import { Table, TableProps } from "antd";

import styles from "./VertexViewer.module.css";

interface VertexFormatInfo {
    bytesPerComp: number;
    viewCtor: new (ab: ArrayBuffer, byteOffset?: number, length?: number) => Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array;
    numComps: number;
    normalized?: boolean;
    customReader?: any;
}

interface VertexViewerProps {
    vbInfo: DrawDetailProps["summary"]["vbs"][0],
    ibInfo?: DrawDetailProps["summary"]["ib"],
    numIndices: number;
    firstIndex?: number;
    baseVertex?: number;
    numInstance?: number;
    firstInstance?: number;
}

const VertexFormatMap: { [type in GPUVertexFormat]?: VertexFormatInfo } = {
    "float32x2": {
        bytesPerComp: 4,
        viewCtor: Float32Array,
        numComps: 2
    },
    "float32x3": {
        bytesPerComp: 4,
        viewCtor: Float32Array,
        numComps: 3
    },
    "float32x4": {
        bytesPerComp: 4,
        viewCtor: Float32Array,
        numComps: 4
    },
    "sint8x2": {
        bytesPerComp: 1,
        viewCtor: Int8Array,
        numComps: 2
    },
    "sint8x4": {
        bytesPerComp: 1,
        viewCtor: Int8Array,
        numComps: 4
    },
    "uint8x2": {
        bytesPerComp: 1,
        viewCtor: Uint8Array,
        numComps: 2
    },
    "uint8x4": {
        bytesPerComp: 1,
        viewCtor: Uint8Array,
        numComps: 4
    },
    "sint16x2": {
        bytesPerComp: 2,
        viewCtor: Int16Array,
        numComps: 2
    },
    "sint16x4": {
        bytesPerComp: 2,
        viewCtor: Int16Array,
        numComps: 4
    },
    "uint16x2": {
        bytesPerComp: 2,
        viewCtor: Uint16Array,
        numComps: 2
    },
    "uint16x4": {
        bytesPerComp: 2,
        viewCtor: Uint16Array,
        numComps: 4
    },
    "sint32x2": {
        bytesPerComp: 4,
        viewCtor: Int32Array,
        numComps: 2
    },
    "sint32x4": {
        bytesPerComp: 4,
        viewCtor: Int32Array,
        numComps: 4
    },
    "uint32x2": {
        bytesPerComp: 4,
        viewCtor: Uint32Array,
        numComps: 2
    },
    "uint32x4": {
        bytesPerComp: 4,
        viewCtor: Uint32Array,
        numComps: 4
    },
    "float16x2": {
        bytesPerComp: 2,
        viewCtor: Float32Array,
        numComps: 2
    },
    "float16x4": {
        bytesPerComp: 2,
        viewCtor: Float32Array,
        numComps: 4
    },
    "unorm8x2": {
        bytesPerComp: 1,
        viewCtor: Uint8Array,
        numComps: 2,
        normalized: true
    },
    "unorm8x4": {
        bytesPerComp: 1,
        viewCtor: Uint8Array,
        numComps: 4,
        normalized: true
    },
    "unorm16x2": {
        bytesPerComp: 2,
        viewCtor: Uint16Array,
        numComps: 2,
        normalized: true
    },
    "unorm16x4": {
        bytesPerComp: 2,
        viewCtor: Uint16Array,
        numComps: 4,
        normalized: true
    },
    "snorm8x2": {
        bytesPerComp: 1,
        viewCtor: Int8Array,
        numComps: 2,
        normalized: true
    },
    "snorm8x4": {
        bytesPerComp: 1,
        viewCtor: Int8Array,
        numComps: 4,
        normalized: true
    },
    "snorm16x2": {
        bytesPerComp: 2,
        viewCtor: Int16Array,
        numComps: 2,
        normalized: true
    },
    "snorm16x4": {
        bytesPerComp: 2,
        viewCtor: Int16Array,
        numComps: 4,
        normalized: true
    },
    "sint32": {
        bytesPerComp: 4,
        viewCtor: Int32Array,
        numComps: 1
    },
    "float32": {
        bytesPerComp: 4,
        viewCtor: Float32Array,
        numComps: 1
    },
    "uint32": {
        bytesPerComp: 4,
        viewCtor: Uint32Array,
        numComps: 1
    },
    "uint32x3": {
        bytesPerComp: 4,
        viewCtor: Uint32Array,
        numComps: 3
    },
    "sint32x3": {
        bytesPerComp: 4,
        viewCtor: Int32Array,
        numComps: 3
    }
};

type VertexReader = (index: number) => Array<string>;

export default function VertexViewer(props: VertexViewerProps) {
    if (!props.vbInfo.bound) return <p>No Buffer Bound.</p>

    const vbInfo = props.vbInfo;
    const ibInfo = props.ibInfo;
    const numIndices = props.numIndices;
    const firstIndex = props.firstIndex ?? 0;
    const baseVertex = props.baseVertex ?? 0;
    const numInstance = props.numInstance ?? 1;
    const firstInstance = props.firstInstance ?? 0;

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const startRow = (page - 1) * rowsPerPage;

    let ibView: Uint16Array | Uint32Array | undefined = undefined;
    if (ibInfo) {
        if (ibInfo.format === "uint16") {
            ibView = new Uint16Array(ibInfo.buffer.__snapshot!.content, ibInfo.offset, ibInfo.size / 2);
        } else {
            ibView = new Uint32Array(ibInfo.buffer.__snapshot!.content, ibInfo.offset, ibInfo.size / 4);
        }
    }
    const bound = vbInfo.bound!;
    const layout = vbInfo.layout;
    const count = layout.stepMode === "vertex" ? numIndices : numInstance;
    const numPages = Math.ceil(count / rowsPerPage);
    const readers: Array<VertexReader | undefined> = [];
    for (const attr of layout.attributes) {
        const formatInfo = VertexFormatMap[attr.format];
        if (!formatInfo) {
            readers.push(undefined);
            continue;
        }
        const view = new formatInfo.viewCtor(
            bound.buffer.__snapshot!.content,
            bound.offset, bound.size / formatInfo.bytesPerComp
        );
        readers.push((index: number) => {
            const values: Array<number> = [];
            let vbIndex = 0;
            if (layout.stepMode === "vertex") {
                vbIndex = (ibInfo ? ibView![index + firstIndex] : index) + baseVertex;
            } else {
                vbIndex = index + firstInstance;
            }
            for (let i = 0; i < formatInfo.numComps; i++) {
                values.push(view[(bound.offset + attr.offset + layout.arrayStride * vbIndex + i * formatInfo.bytesPerComp) / formatInfo.bytesPerComp]);
                if (formatInfo.normalized) {
                    values[length - 1] /= (1 << formatInfo.bytesPerComp) - 1;
                }
            }
            if (formatInfo.normalized || formatInfo.viewCtor === Float32Array) {
                return values.map(value => value.toPrecision(5));
            } else {
                return values.map(value => value.toString());
            }
        });
    }

    let columns: Array<any> = [];
    if (layout.stepMode === "vertex") {
        columns.push({
            title: "Index",
            dataIndex: "index",
            fixed: 'left',
            width: 100
        });
        if (ibInfo) {
            columns.push({
                title: "Vertex Index",
                dataIndex: "vbIndex",
                fixed: "left",
                width: 100
            });
        }
    } else {
        columns.push({
            title: "Instance",
            dataIndex: "index",
            fixed: 'left',
            width: 100
        });
    }
    layout.attributes.forEach((attr, attrIndex) => {
        columns.push({
            title: `Attrbitue@${attr.shaderLocation}: ${attr.format}`,
            dataIndex: attrIndex.toString(),
            render: (values: Array<string>) => values.join(" | ")
        });
    })

    const data: Array<any> = [];
    for (let i = startRow; i < startRow + rowsPerPage && i < count; i++) {
        const data_i: any = { };
        if (layout.stepMode === "vertex") {
            data_i.index = i;
            if (ibInfo) {
                data_i.vbIndex = ibView![i + firstIndex];
            }
        } else {
            data_i.instance = i;
        }
        
        for (let j = 0; j < layout.attributes.length; j++) {
            if (readers[j]) {
                data_i[j.toString()] = readers[j]!(i);
            } else {
                data_i[j.toString()] = "Unsupported Format"
            }
        }
        data.push(data_i);
    }

    const pagination = {
        current: page,
        total: numPages
    };

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setPage(pagination.current ?? 1);
    }

    return <Table
        columns={columns}
        dataSource={data}
        rowKey={row => row.index}
        pagination={pagination}
        onChange={handleTableChange}
        className={styles.table}
    />
}