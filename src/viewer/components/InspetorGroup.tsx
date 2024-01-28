import React, { useRef, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
// import { TabItem, makeWindow } from './window';

export type TabItem = Required<TabsProps>["items"][number];

const initialItems: Array<TabItem> = [
    { label: 'Tab 1', children: 'Content of Tab 1', key: '1' }
];

export default function InspectorGroup() {
    const [current, setCurrent] = useState("-1");
    const windowCount = useRef(0);
    const [items, setItems] = useState(initialItems);

    const onChange = (newActiveKey: string) => {
        setCurrent(newActiveKey);
    };

    const add = () => {
        // const newActiveKey = `newTab${windowCount.current++}`;
        // const newPanes = [...items];
        // newPanes.push(makeWindow(newActiveKey));
        // setItems(newPanes);
        // setCurrent(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const remove = (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
        let newActiveKey = current;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setCurrent(newActiveKey);
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
            onChange={onChange}
            activeKey={current}
            onEdit={onEdit}
            items={items}
        ></Tabs>
    </>;
}