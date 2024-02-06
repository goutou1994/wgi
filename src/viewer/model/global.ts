import ReplayProfile from "../../replay/profile";
import { createGlobalState } from "../utils/globalState";
import { logError, logSuccess, logWarning } from "../utils/message";
import { RecordKind } from "../../record/rcd";

export let globalProfile: ReplayProfile | null = null;
async function loadCapture(file: File) {
    loading.set(true);
    const reader = file.stream().getReader();
    const result = await reader.read();
    const buffer = result.value;

    if (!buffer) {
        logError("Read file failed.");
        return;
    }
    
    logSuccess("File read successfully.");

    const profile = new ReplayProfile();
    profile.setLogger(logSuccess, logWarning, logError);

    try {
        profile.deserialize(buffer);
        globalProfile = profile;
    } catch (e) {
        logError(e as string);
        return;
    }

    const rcds = profile.getRcds();
    rcdEntries.set(rcds.map((rcd, index) => ({
        label: RecordKind[rcd.__kind],
        id: index
    })));

    reader.releaseLock();
    loading.set(false);
}

interface RcdEntry {
    id: number;
    label: string;
};

export type RcdEntries = Array<RcdEntry>;
const rcdInitial: RcdEntries = [];
const rcdEntries = createGlobalState(rcdInitial);
const currentRcdId = createGlobalState<number | null>(null);

export async function selectRcd(id: number) {
    if (currentRcdId.get() === id) return;
    if (!globalProfile) {
        logError("No replay profile available.");
        return;
    }
    replaying.set(true);
    await globalProfile.replayTo(id);
    replaying.set(false);
    currentRcdId.set(id);
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
    count,

    // functions
    loadCapture,
};