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
function closeResTab(id: number) {
    const tabs = [...resInspecting.get()];
    const tabIndex = tabs.lastIndexOf(id);
    console.assert(tabIndex !== -1);

    tabs.splice(tabIndex, 1);
    if (currentTab.get() === id.toString()) {
        if (tabs.length == 0) {
            currentTab.set("rcd");
        } else if (tabIndex >= tabs.length) {
            currentTab.set(tabs[tabIndex - 1].toString());
        } else {
            currentTab.set(tabs[tabIndex].toString());
        }
    }
    resInspecting.set(tabs);
}

const showDetail = createGlobalState(false);

export {
    resInspecting,
    currentTab,
    showDetail,

    openResTab,
    closeResTab
};