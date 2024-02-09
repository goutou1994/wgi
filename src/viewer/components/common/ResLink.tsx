import React from "react";
import styles from "./common.module.css";
import { openResTab } from "../../model/inspector";
import { globalProfile } from "../../model/global";
import { brandMap } from "../../../common/brand";

interface ResLinkProps {
    id: number;
};

export default function ResLink({ id }: ResLinkProps) {
    const tracked = globalProfile!.get(id);
    const label = `${brandMap[tracked.__kind]}#${id}`;

    const handleClick = () => {
        openResTab(id);
    };

    return <span className={styles.resLink} onClick={handleClick}>{label}</span>
}