import { Button, Input, Statistic } from 'antd'
import React, { FC, useEffect } from 'react'
import TabList from '~/components/Layout/TabList'
import HomeLayout from '~/components/Layout/HomeLayout'
import { useNavigate, useParams } from 'react-router-dom'
import StatisticTable from './StatisticTable'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useEventStore } from '~/app/eventStore'
import { EventSubHeader } from '~/components/Layout/EventSubHeader'

export const StatisticList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [event, getEventById, statistics, getStatisticById] = useEventStore(state => [
        state.event,
        state.getEventById,
        state.statistics,
        state.getStatisticById
    ])
    useEffect(() => {
        getEventById(id ? id : '1')
        getStatisticById(id ? id : '1')
    }, [])
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate(-1)} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div>
                    {/* <EventSubHeader /> */}
                </div>
                <TabList defaultActiveKey='2' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2x2 font-medium">{`${event.name}`} - Thống kê theo hộ khẩu</p>
                        <p className="text-2x1 font-medium">Tổng số hộ: {`${statistics.length}`}</p>
                        <p className="text-2x1 font-medium">Tổng tiền: {`${event.total_cost}`}</p>
                    </div>
                    <StatisticTable event={event} statistics={statistics} />
                </div>
            </div>
        </HomeLayout>
    )
}