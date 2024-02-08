import React from "react";
import { RcdEntries, rcdEntries, selectRcd } from "../model/global";
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
    const [rcds] = useGlobalState(rcdEntries);

    const menuItems = makeMenuProps(rcds);
    menuItems.unshift({
        label: "initial",
        key: "-1"
    });

    const handleClick: MenuProps['onClick'] = e => {
        selectRcd(Number(e.key));
    };

    return <div className={styles.container}>
        <Menu mode="inline" items={menuItems} onClick={handleClick} />
    </div>;
}