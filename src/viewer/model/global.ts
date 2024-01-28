import { createGlobalState } from "../utils/globalState";

interface RcdDisplayEntry {
    id: number;
    label: string;
};

type RcdDiplay = Array<RcdDisplayEntry>;

const count = createGlobalState(0);

export {
    count
};