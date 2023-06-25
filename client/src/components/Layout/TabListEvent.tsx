import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Danh sách sự kiện'
    },
    {
        key: '2',
        label: 'Danh sách phần quà'
    }
]

const TabList = (props: any) => {
    const { defaultActiveKey, eventId } = props
    const navigate = useNavigate()
    const onChange = (key: string) => {
        switch (key) {
            case '1':
                navigate(`/su-kien`)
                break
            case '2':
                navigate(`/danh-sach-phan-qua`)
                break
        }
    }
    return <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />
}

export default TabList
