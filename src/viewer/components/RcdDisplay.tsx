import React from "react";
import { currentRcdId, playRcd, rcdPlayed, rcdEntries, selectRcd, selectedRcdId } from "../model/global";
import useGlobalState from "../utils/globalState";
import { Menu, MenuProps } from "antd";

import styles from "./RcdDisplay.module.css";
import { BarsOutlined, CaretRightOutlined, GlobalOutlined, SignatureOutlined } from "@ant-design/icons";
import { RecordKind } from "../../record/rcd";
import { brandMap } from "../../common/brand";

type MenuItems = Required<MenuProps>['items'];

interface TimelineItem {
    label: string;
    rcdId: number;
    icon: React.JSX.Element | null;
}

function RcdDisplayItem({ desc }: { desc: TimelineItem }) {
    const [current] = useGlobalState(currentRcdId);
    const [selected] = useGlobalState(selectedRcdId);

    let iconColor: string | null = null;
    if (rcdPlayed.has(desc.rcdId)) {
        iconColor = "rgb(255 187 187)";
    }
    if (current == desc.rcdId) {
        iconColor = "rgb(255 140 140)";
    }

    const handlePlay = () => {
        playRcd(desc.rcdId);
    }
    const handleSelect = () => {
        selectRcd(desc.rcdId);
    }

    return <div className={styles.displayItem} style={desc.rcdId === selected ? { backgroundColor: "rgb(220 227 252)" } : {}}>
        <div
            className={styles.displayItemLabel}
            onClick={handleSelect}
        >
            { desc.label }
        </div>
        <div className={styles.displayItemLine}></div>
        <div className={styles.displayItemIcon} style={iconColor ? { backgroundColor: iconColor } : {}}>
            { desc.icon }
        </div>
        <div className={styles.displayItemButtons}>
            <CaretRightOutlined style={{
                cursor: "pointer"
            }} onClick={handlePlay} />
        </div>
    </div>
}

const iconMap: { [key in brandMap]?: any } = {
    [brandMap.GPUDevice]: GlobalOutlined,
    [brandMap.GPUCommandEncoder]: BarsOutlined,
    [brandMap.GPURenderPassEncoder]: SignatureOutlined
};

export default function RcdDisplay() {
    const [rcds] = useGlobalState(rcdEntries);

    const timelineItems = [];
    rcds.forEach((rcd, index) => {
        let icon = null;
        if (rcd.caller && iconMap[rcd.caller!.__kind as brandMap]) {
            icon = React.createElement(iconMap[rcd.caller!.__kind as brandMap]);
        }
        timelineItems.push({
            label: RecordKind[rcd.__kind],
            rcdId: index,
            icon: icon
        });
    });
    timelineItems.unshift({
        label: "InitialState",
        rcdId: -1,
        icon: null
    });

    // return <div className={styles.container}>
    //     <Menu mode="inline" items={menuItems} onClick={handleClick} />
    // </div>;
    return <div className={styles.displayWrapper}>
        {
            timelineItems.map(item => <RcdDisplayItem key={item.rcdId} desc={ item } /> )
        }
    </div>
}