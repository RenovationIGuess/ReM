import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';



const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Danh sách các bé nhận quà',
    },
    {
        key: '2',
        label: 'Phân tích theo hộ khẩu',
    },
    {
        key: '3',
        label: 'Danh sách phần quà',
    },
];

const TabList = (props: any) => {
    const { defaultActiveKey, eventId } = props
    const navigate = useNavigate()
    const onChange = (key: string) => {
        switch (key) {
            case '1':
                navigate(`/su-kien/${eventId}`)
                break
            case '2':
                navigate(`/su-kien/thong-ke-ho-khau/${eventId}`)
                break
            case '3':
                navigate(`/su-kien/phan-qua/${eventId}`)
        }
    };
    return (
        <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />
    )
}

export default TabList;