import React from "react";
import { RcdEntries, rcds as globalRcds } from "../model/global";
import useGlobalState from "../utils/globalState";
import { Menu, MenuProps } from "antd";

import styles from "./RcdDisplay.module.css";

type MenuItems = Required<MenuProps>['items'];

function makeMenuProps(rcds: RcdEntries): MenuItems {
    return rcds.map(rcd => ({
        label: rcd.label,
        key: rcd.id
    }));
}

export default function RcdDisplay() {
    const [rcds] = useGlobalState(globalRcds);

    const menuItems = makeMenuProps(rcds);

    return <div className={styles.container}>
        <Menu mode="inline" items={menuItems} />
    </div>;
}