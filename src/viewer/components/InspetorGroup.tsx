import React, { useRef, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import RcdDetail from './inspectors/rcd/RcdDetail';
import useGlobalState from '../utils/globalState';
import { globalProfile } from '../model/global';
import { brandMap } from '../../common/utils';
import { closeResTab, currentTab, resInspecting } from '../model/inspector';
import ResDetail from './inspectors/res/ResDetail';

export type TabItem = Required<TabsProps>["items"][number];

const initialItems: Array<TabItem> = [
    { label: 'Record', children: <RcdDetail />, key: 'rcd' , closable: false}
];

const resTabMap: Map<UniversalResourceId, React.JSX.Element> = new Map();

export default function InspectorGroup() {
    const [current, setCurrent] = useGlobalState(currentTab);
    const [resTabIds, setResTabIds] = useGlobalState(resInspecting);

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

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            // add();
        } else {
            closeResTab(Number(targetKey))
        }
    };

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