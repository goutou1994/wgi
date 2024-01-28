import { NotificationInstance } from "antd/es/notification/interface";
import ReplayProfile from "../../replay/profile";
import { createGlobalState } from "../utils/globalState";
import { logError, logSuccess } from "../utils/message";

const globalProfile: ReplayProfile | null = null;
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

    const profile = new ReplayProfile(buffer!);
    // mock
    rcds.set([{
        label: "CreateBuffer",
        id: 0
    }]);

    reader.releaseLock();
    loading.set(false);
}

interface RcdEntry {
    id: number;
    label: string;
};

export type RcdEntries = Array<RcdEntry>;
const rcdInitial: RcdEntries = [];
const rcds = createGlobalState(rcdInitial);

function chooseRcd(id: number) {
    if (currentRcdId.get() === id) return;
    if (!globalProfile) {
        logError("No replay profile available.");
        return;
    }
    replaying.set(true);
    globalProfile.replayTo(id);
    replaying.set(false);
    currentRcdId.set(id);
}

const loading = createGlobalState(false);
const loaded = createGlobalState(false);
const replaying = createGlobalState(false);
const currentRcdId = createGlobalState(-1);
const count = createGlobalState(0);

export {
    // global states
    loaded,
    rcds,
    replaying,
    currentRcdId,
    count,

    // functions
    loadCapture,
};