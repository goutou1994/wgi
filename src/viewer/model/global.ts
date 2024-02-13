import ReplayProfile from "../../replay/profile";
import { createGlobalState } from "../utils/globalState";
import { logError, logSuccess, logWarning } from "../utils/message";
import RcdBase, { RecordKind } from "../../record/rcd";
import { currentTab } from "./inspector";

export let globalProfile: ReplayProfile | null = null;
async function loadCapture(file: File) {
    loading.set(true);
    // const reader = file.stream().getReader();
    const buffer = await file.arrayBuffer();

    if (!buffer) {
        logError("Read file failed.");
        return;
    }
    
    const profile = new ReplayProfile();
    profile.setLogger(logSuccess, logWarning, logError);

    try {
        profile.deserialize(buffer);
        globalProfile = profile;
    } catch (e) {
        console.error(e);
        logError(e as string);
        return;
    }

    const rcds = profile.getRcds();
    rcdEntries.set([...rcds]);

    // reader.releaseLock();
    loading.set(false);
}

interface RcdEntry {
    id: number;
    label: string;
};

// export type RcdEntries = Array<RcdEntry>;
const rcdInitial: Array<RcdBase<any, any, any>> = [];
const rcdEntries = createGlobalState(rcdInitial);
const currentRcdId = createGlobalState<number | null>(null);
const selectedRcdId = createGlobalState<number | null>(null);

export function selectRcd(id: number) {
    if (selectedRcdId.get() === id) return;
    selectedRcdId.set(id);
    currentTab.set("rcd");
}

export const rcdPlayed = new Set<number>();
export async function playRcd(id: number) {
    if (currentRcdId.get() === id) return;
    if (!globalProfile) {
        logError("No replay profile available.");
        return;
    }
    replaying.set(true);
    const played = await globalProfile.replayTo(id);
    rcdPlayed.clear();
    played.forEach(id => rcdPlayed.add(id));
    replaying.set(false);
    currentRcdId.set(id);
    // currentTab.set("rcd");
}

const loading = createGlobalState(false);
const loaded = createGlobalState(false);
const replaying = createGlobalState(false);
const count = createGlobalState(0);

export {
    // global states
    loaded,
    rcdEntries,
    replaying,
    currentRcdId,
    selectedRcdId,
    count,

    // functions
    loadCapture,
};