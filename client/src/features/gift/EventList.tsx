import React, { useEffect, useState } from 'react'
import Event from './Event'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEventsByPageQuery } from './api/events.slice'
import axiosClient from '~/app/axiosClient'
import moment from 'moment'
import TabListEvent from '~/components/Layout/TabListEvent'
import CreateEventFormModal from './modals/CreateEventFormModal'

const { Title } = Typography;


const EventList = () => {
    const [page, setPage] = useState<Page>({ page: 1, offset: 10 })
    const { data: eventsData } = useGetEventsByPageQuery(page)
    const navigate = useNavigate()
    const { id } = useParams()
    const [openCreateEvent, setOpenCreateEvent] = useState(false);

    const onCreate = async (values: any) => {
        console.log('Received values of form:', values);
        const inputDate = new Date(values.ngayBatDau);
        const formattedDate = moment(inputDate).format('YYYY-MM-DD');
        try {
            await axiosClient.post(`/su-kien/create`, {
                name: values.name,
                ngayBatDau: formattedDate,
                type: values.type ? 1 : 0,
                phan_thuongs: values.phan_thuongs
            })
            alert("Success")
        } catch (e) {
            const result = (e as Error).message;
            console.log(result)
        }
    };
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    <Button
                        type="primary"
                        htmlType="button"
                        className='bg-primary'
                        style={{ color: 'white' }}
                        onClick={() => setOpenCreateEvent(true)}
                    >
                        Thêm sự kiện mới
                    </Button>
                    <CreateEventFormModal
                        open={openCreateEvent}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpenCreateEvent(false);
                        }}
                    />
                </div>
                <TabListEvent defaultActiveKey='1' />
                <Row gutter={[16, 32]}>
                    {
                        eventsData?.data.data.map((event) => (
                            <Event key={event.id} eventId={event.id} title={event.name} />
                        ))}
                </Row>
                <Pagination
                    defaultPageSize={10}
                    showSizeChanger={true}
                    pageSizeOptions={['10', '15', '20']}
                    style={{ float: 'right' }}
                    defaultCurrent={1}
                    total={eventsData?.data.total}
                    className='my-16'
                    onChange={(page, pageSize) => {
                        setPage({ page, offset: pageSize })
                    }} />
            </div>
        </HomeLayout>
    )
}

export default EventList