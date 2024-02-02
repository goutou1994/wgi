import React from "react";
import styles from "./common.module.css";
import { openResTab } from "../../model/inspector";

interface ResLinkProps {
    label: React.JSX.Element | string;
    id: number;
};

export default function ResLink({ label, id }: ResLinkProps) {
    const handleClick = () => {
        openResTab(id);
    };

    return <span className={styles.resLink} onClick={handleClick}>{label}</span>
}