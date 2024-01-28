import React, { useEffect, useState } from "react";
import useGlobalState from "../utils/globalState";
import { loaded as globalLoaded, loadCapture } from "./global";

let overlayStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    zIndex: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
}

export default function DropFile({ children }: React.PropsWithChildren) {
    const [showOverlay, setShowOverlay] = useState(true);
    overlayStyle = {
        ...overlayStyle,
        display: showOverlay ? "flex" : "none"
    };
    function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        setShowOverlay(true);
    }
    function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
        if (ev.dataTransfer.items.length == 0) return;
        const item = ev.dataTransfer.items[0];
        if (item.kind === "file") {
            const file = item.getAsFile()!;
            console.log(`dropping file: ${file.name}`);
            loadCapture(file);
            setShowOverlay(false);
        }
    }
    return <div onDrop={handleDrop} onDragOver={handleDragOver} className="app-body">
        <div style={overlayStyle}>
            <span>Drop your file here.</span>
        </div>
        { children }
    </div>
}