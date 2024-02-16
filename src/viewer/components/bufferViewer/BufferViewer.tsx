import React, { useState } from "react";

import styles from "./BufferView.module.css"
import { Input } from "antd";
import { ShrinkOutlined } from "@ant-design/icons";

interface BufferViewProps {
    buffer: Uint8Array;
    columns?: number;
    maxRows?: number;
}

function byteToHex2Digit(d: number): string {
    return d.toString(16).padStart(2, "0");
}

export default function BufferView(props: BufferViewProps) {
    const buffer = props.buffer;
    const columns = props.columns ?? 4;
    const maxRows = props.maxRows ?? 20;
    const byteLength = buffer.byteLength;
    const bytesPerDoubleHex = 1;
    const bytesPerCell = bytesPerDoubleHex * 4;
    const bytesPerRow = bytesPerCell * columns;

    const minRows = 10;
    const totalRows = Math.ceil(byteLength / bytesPerRow);
    const rows = Math.max(Math.min(totalRows, maxRows), minRows);
    const bytesInSight = rows * bytesPerRow;

    const [currentOffset, setCurrentOffset] = useState<number | null>(null);
    const [startRow, setStartRow] = useState<number | 0>(0);
    const [selectedViewDisplay, selecteViewDisplay] = useState<string | null>(null);
    const startOffset = startRow * bytesPerRow;
    const valueDisplays = {
        ByteOffset: currentOffset ?? "-",
        Uint8Value: currentOffset !== null ? buffer[currentOffset] : "-",
        Int8Value: currentOffset !== null ? new Int8Array(buffer)[currentOffset] : "-",
        Uint16Value: currentOffset !== null && (currentOffset % 2 === 0) && (currentOffset + 1 < byteLength) ? new Uint16Array(buffer.buffer)[currentOffset / 2] : "-",
        Int16Value: currentOffset !== null && (currentOffset % 2 === 0) && (currentOffset + 1 < byteLength) ? new Int16Array(buffer.buffer)[currentOffset / 2] : "-",
        Uint32Value: currentOffset !== null && (currentOffset % 4 === 0) && (currentOffset + 3 < byteLength) ? new Uint32Array(buffer.buffer)[currentOffset / 4] : "-",
        Int32Value: currentOffset !== null && (currentOffset % 4 === 0) && (currentOffset + 3 < byteLength) ? new Int32Array(buffer.buffer)[currentOffset / 4] : "-",
        Float32Value: currentOffset !== null && (currentOffset % 4 === 0) && (currentOffset + 3 < byteLength) ? new Float32Array(buffer.buffer)[currentOffset / 4].toPrecision(5) : "-",
        // Float64Value : currentOffset !== null && (currentOffset % 8 === 0) && (currentOffset + 7 < byteLength) ? new Float64Array(buffer.buffer)[currentOffset / 8].toPrecision(5) : "-",
    };
    const viewCtors: any = {
        Uint8Value: Uint8Array,
        Int8Value: Int8Array,
        Uint16Value: Uint16Array,
        Int16Value: Int16Array,
        Uint32Value: Uint32Array,
        Int32Value: Int32Array,
        Float32Value: Float32Array
    };

    const handleClickDoubleHex = (byteOffset: number) => {
        setCurrentOffset(byteOffset);
    };

    const handleChangeLine = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const newOffset = Number((e.target as HTMLInputElement).value);
        if (newOffset < 0) return;
        const newStartRow = Math.floor(newOffset / bytesPerRow);
        setStartRow(Math.min(newStartRow, totalRows - 1));
    };

    const handleSelectViewDiplay = (key: string) => {
        selecteViewDisplay(key);
    };

    const [viewDisplayRowMajor, setViewDisplayRowMajor] = useState(true);
    const handleTranspose = () => {
        setViewDisplayRowMajor(!viewDisplayRowMajor);
    };

    let values: ArrayLike<any> = Array(16);
    if (selectedViewDisplay !== null && currentOffset !== null) {
        const ctor = viewCtors[selectedViewDisplay];
        if (currentOffset % ctor.BYTES_PER_ELEMENT === 0) {
            values = new ctor(buffer.buffer, currentOffset, Math.min(16, (buffer.byteLength - currentOffset) / viewCtors[selectedViewDisplay].BYTES_PER_ELEMENT));
            if (ctor === Float32Array) {
                values = Array.from(values).map((value: any) => value.toPrecision(5));
            } else {
                // nothing
            }
        }
    }
    const valueArrDisplay = <table className={[styles.valueDisplayTable, viewDisplayRowMajor ? styles.rowMajor : styles.colMajor].join(' ')}><tbody>
        {Array.from(Array(4).keys()).map(row => <tr key={row}>{
            Array.from(Array(4).keys()).map(col => <td key={col}>{
                viewDisplayRowMajor ? 
                (values[row * 4 + col] ?? '\u00A0') :
                (values[col * 4 + row] ?? '\u00A0')
            }</td>)
        }</tr>)}
    </tbody></table>;

    return <table className={styles.table}><tbody>
        {Array.from(Array(rows).keys()).map(row => {
            return <tr className={styles.row} key={row}>
                <td className={styles.lineOffset}>
                    {startOffset + row * bytesPerRow}
                </td>
                <td className={styles.dividerCell} />
                {Array.from(Array(columns).keys()).map(column => {
                    return <>
                        <td className={styles.fourDoubleHex} >
                            {[0, 1, 2, 3].map(hexIndex => {
                                let byteOffset = startOffset + row * bytesPerRow + column * bytesPerCell + hexIndex * bytesPerDoubleHex;
                                if (byteOffset >= byteLength) {
                                    return <div className={styles.doubleHex} key={"hex" + hexIndex}></div>
                                } else {
                                    const byte = buffer[byteOffset];
                                    return <div
                                        className={styles.doubleHex}
                                        key={"hex" + hexIndex}
                                        onClick={() => handleClickDoubleHex(byteOffset)}
                                        style={{ backgroundColor: currentOffset === byteOffset ? "aquamarine" : "white" }}
                                    >
                                        {byteToHex2Digit(byte)}
                                    </div>
                                }
                            })}
                        </td>
                        <td className={styles.dividerCell} key={"divcol" + column} />
                    </>
                })}
                {
                    row === 0 ? <td rowSpan={rows + 1} className={styles.rightColumn}>
                        <div>
                            {Object.entries(valueDisplays).map(([key, value]) => <p key={key}>
                                {
                                    key === "ByteOffset" ? <><span>{key}:</span> {value}</> :
                                        <><span
                                            className={styles.displayViewKey}
                                            style={{
                                                backgroundColor: selectedViewDisplay === key ? "#e9bdff" : "white"
                                            }}
                                            onClick={() => handleSelectViewDiplay(key)}
                                        >{key}:</span> {value}
                                        </>
                                }
                            </p>)}
                        </div>
                        <div className={styles.rightColumnDivider}></div>
                        <div>
                            <h6 style={{margin: "10px 0"}}>TypedView:&nbsp;
                                <ShrinkOutlined style={{
                                    cursor: "pointer"
                                }} onClick={handleTranspose}/>
                            </h6>
                            {valueArrDisplay}
                        </div>
                    </td> : undefined
                }
            </tr>

        })}
        <tr className={styles.bottomRow}>
            <td className={styles.lineOffset}>
                <Input size="small" onPressEnter={handleChangeLine}></Input>
            </td>
            <td colSpan={columns * 2 + 1} className={styles.bottomInfo}>
                Total bytes: {buffer.byteLength}, Total rows: {totalRows}, Bytes per page: {bytesInSight}
            </td>
        </tr>
    </tbody></table>
}