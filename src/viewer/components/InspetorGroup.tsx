import React, { useRef, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import RcdDetail from './inspectors/rcd/RcdDetail';
import useGlobalState from '../utils/globalState';
import { globalProfile } from '../model/global';
import { brandMap } from '../../common/utils';
import { currentTab, resInspecting } from '../model/inspector';
import ResDetail from './inspectors/res/ResDetail';
// import { TabItem, makeWindow } from './window';

export type TabItem = Required<TabsProps>["items"][number];

const initialItems: Array<TabItem> = [
    { label: 'Record', children: <RcdDetail />, key: 'rcd' , closable: false}
];

const resTabMap: Map<UniversalResourceId, React.JSX.Element> = new Map();

export default function InspectorGroup() {
    const [current, setCurrent] = useGlobalState(currentTab);
    const [resTabIds, setResTabIds] = useGlobalState(resInspecting);
    // const [items, setItems] = useState(initialItems);

    const items: Array<TabItem> = [
        ...initialItems,
        ...resTabIds.map(id => {
            let children: React.JSX.Element;
            const res = globalProfile!.get(id);
            if (resTabMap.has(id)) {
                children = resTabMap.get(id)!;
            } else {
                children = <ResDetail id={id}></ResDetail>
                resTabMap.set(id, children);
            }
            return {
                label: `${brandMap[res.__kind]}#${id}`,
                key: id.toString(),
                children
            };
        })
    ];


    const onChange = (newActiveKey: string) => {
        setCurrent(newActiveKey);
    };

    // const add = () => {
        // const newActiveKey = `newTab${windowCount.current++}`;
        // const newPanes = [...items];
        // newPanes.push(makeWindow(newActiveKey));
        // setItems(newPanes);
        // setCurrent(newActiveKey);
    // };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            // add();
        } else {
            remove(Number(targetKey));
        }
    };

    const remove = (id: number) => {
        const tabIndex = resTabIds.lastIndexOf(id);
        console.assert(tabIndex !== -1);

        resTabIds.splice(tabIndex, 1);
        setResTabIds(resTabIds);
        if (tabIndex > 1) {
            setCurrent((tabIndex - 1).toString());
        } else {
            setCurrent("rcd");
        }
    };

    // const onClick: MenuProps['onClick'] = (e) => {
    //     console.log('click ', e);
    //     if (e.key != "add") {
    //         setCurrent(e.key);
    //     } else {
    //         const window = makeWindow(windowCount.current.toFixed(0));
    //         windows.current[windowCount.current] = window;
    //         windowCount.current += 1;
    //         items.splice(items.length - 1, 0, window.menuItem as any);
    //         setItems(items);
    //         setCurrent((windowCount.current - 1).toFixed(0));
    //     }
    // };

    return <>
        <Tabs
            type="editable-card"
            hideAdd
            onChange={onChange}
            activeKey={current}
            onEdit={onEdit}
            items={items}
        ></Tabs>
    </>;
}