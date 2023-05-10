import { Button, Input, Statistic } from 'antd'
import React, { FC } from 'react'
import TabList from '~/components/Layout/TabList'
import ChildrenTable from './ChildrenTable'
import HomeLayout from '~/components/Layout/HomeLayout'
import { useNavigate, useParams } from 'react-router-dom'
import StatisticTable from './StatisticTable'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface StatisticListProps {

}

export const StatisticList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate('/tang-qua')} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div>
                </div>
                <TabList defaultActiveKey='2' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2xl font-medium">Tết trung thu 1987 - Thống kê theo hộ khẩu</p>
                        <Statistic value={112893} />
                    </div>
                    <StatisticTable />
                </div>
            </div>
        </HomeLayout>
    )
}