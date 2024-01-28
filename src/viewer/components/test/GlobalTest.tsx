import React from "react";
import { count as globalCount } from "../../model/global";
import useGlobalState from "../../utils/globalState";

export default function GlobalTest() {
    const [count, setCount] = useGlobalState(globalCount);
    function handleClick() {
        setCount(count + 1);
    }
    return <>
        <h1>Global count is {count}.</h1>
        <button onClick={handleClick}>inc global</button>
    </>
}