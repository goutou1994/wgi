
interface GlobalState<T> {
    get(): T;
    set(newState: T): void;
    joinReRender(reRender: Function): void;
    cancelReRender(reRender: Function): void;
}

export function createGlobalState<T>(initState: T | null): GlobalState<T> {
    const prototype = {
        data: { state: initState, reRenderFns: [] } as any,

        get() {
            return this.data.state;
        },

        set(newState: T) {
            if (newState === this.data.state) return;
            this.data.state = newState;
            this.data.reRenderFns.forEach((reRender: Function) => reRender());
            return this;
        },

        joinReRender(reRender: Function) {
            if (this.data.reRenderFns.includes(reRender)) return;
            this.data.reRenderFns.push(reRender);
        },

        cancelReRender(reRender: Function) {
            this.data.reRenderFns = this.data.reRenderFns.filter(
                (reRenderFn: Function) => reRenderFn !== reRender
            );
        },
    };

    return Object.freeze(Object.create(prototype));
}

// ##################################
import { useState, useEffect } from "react";

export default function useGlobalState<T>(globalState: GlobalState<T>): [T, (v: T) => void] {
    const [, set] = useState(0);
    const state = globalState.get();
    const reRender = () => set(v => v + 1);

    useEffect(() => {
        globalState.joinReRender(reRender);
        return () => {
            globalState.cancelReRender(reRender);
        };
    });

    function setState(newState: T) {
        globalState.set(newState);
    }

    return [state, setState];
}
