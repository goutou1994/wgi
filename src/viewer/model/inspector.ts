import { createGlobalState } from "../utils/globalState";

const resInspecting = createGlobalState<Array<UniversalResourceId>>([]);
const currentTab = createGlobalState("rcd");
function openResTab(id: number) {
    const tabs = resInspecting.get();
    const tabIndex = tabs.lastIndexOf(id);
    if (tabIndex === -1) {
        resInspecting.set([...resInspecting.get(), id]);
    }
    currentTab.set(id.toString());
}

export {
    resInspecting,
    currentTab,

    openResTab
};