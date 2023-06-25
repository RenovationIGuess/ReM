import { ArrowLeftOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface EventSubHeaderProps {

}

export const EventSubHeader: FC<EventSubHeaderProps> = ({ }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between">
            <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate(-1)} />
            <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
        </div>
    )
}