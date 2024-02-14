import React, { useState } from "react";
import type { DrawDetailProps } from "./DrawDetail";
import { Table, TableProps } from "antd";

interface VertexFormatInfo {
    bytesPerComp: number;
    viewCtor: new (ab: ArrayBuffer, byteOffset?: number, length?: number) => Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array;
    numComps: number;
    normalized?: boolean;
    customReader?: any;
}

interface VertexViewerProps {
    info: DrawDetailProps["summary"]["vbs"][0],
    numIndices: number;
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

export default function VertexViewer({ info, numIndices }: VertexViewerProps) {
    if (!info.bound) return <p>No Buffer Bound.</p>

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const startIndex = (page - 1) * rowsPerPage;

    const bound = info.bound!;
    const layout = info.layout;
    const numPages = Math.ceil(numIndices / rowsPerPage);
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
        readers.push((vi: number) => {
            const values: Array<number> = [];
            for (let i = 0; i < formatInfo.numComps; i++) {
                values.push(view[(bound.offset + attr.offset + layout.arrayStride * vi + i * formatInfo.bytesPerComp) / formatInfo.bytesPerComp]);
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

    const columns: Array<any> = [
        {
            title: "Index",
            dataIndex: "index",
            fixed: 'left',
            width: 100
        }
    ];
    layout.attributes.forEach((attr, attrIndex) => {
        columns.push({
            title: "Attrbitue@" + attr.shaderLocation,
            dataIndex: attrIndex.toString(),
            render: (values: Array<string>) => values.join(" | ")
        });
    })

    const data: Array<any> = [];
    for (let i = startIndex; i < startIndex + rowsPerPage && i < numIndices; i++) {
        const data_i: any = { index: i };
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
    />
}