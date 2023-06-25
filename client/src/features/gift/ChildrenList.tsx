import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { useNavigate, useParams } from 'react-router-dom'
import ChildrenTable from './ChildrenTable'
import TabList from '~/components/Layout/TabList'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined, WarningFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getGiftsChildrenSelector, addGift, emptyGift } from './giftsChildren.slice'
import { useAppDispatch } from '~/hooks/useRedux'
import { getAddGiftDisabledSelector, setDisabled } from './disableAddGift.slice'
import { GiftType } from './giftsChildren.slice'
import { openSelector, setOpen } from './open.slice'
import { getGiftsSelector } from './gifts.slice'
import UploadImage from '~/components/UploadImage'
import { useEventStore } from '~/app/eventStore'
import GiftFormItem from './GiftFormItem'
import axiosClient from '~/app/axiosClient'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { AxiosResponse } from 'axios'
import types from './enums/types'
import Title from 'antd/es/typography/Title'
import achiveType from './enums/achieveType'
import capHocType from './enums/capHocType'
import moment from 'moment'
import CreateChildrenFormModal from './modals/CreateChildrenFormModal'
import EditFormModal from './modals/EditFormModal'
import { EventSubHeader } from '~/components/Layout/EventSubHeader'


interface Values {
    id: string;
    gifts: { name: string, price: number }[];
}

export const ChildrenList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [openCreateChildren, setOpenCreateChildren] = useState(false);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    //const openCreateChildren: boolean = useSelector(openSelector)

    const [event, getEventById] = useEventStore(state => [
        state.event,
        state.getEventById
    ])

    useEffect(() => {
        getEventById(id ? id : '1')
    }, [])
    console.log(event, id)
    const onCreateChildren = async (values: IDuocNhanThuong) => {
        console.log('Received values of form: ', values);
        dispatch(setOpen(false));
        try {
            await axiosClient.post(`/su-kien/${id}/duoc-nhan-thuong/create`, {

            })
            console.log("Success")
        } catch (error) {
            console.error(error)
        }
    };

    const onEditEvent = async (values: IEvent) => {
        const inputDate = new Date(values.ngayBatDau);
        const formattedDate = moment(inputDate).format('YYYY-MM-DD');
        try {
            const updatedEvent = {
                ...values,
                ngayBatDau: formattedDate
            }
            await axiosClient.put(`/su-kien/${id}/edit`, updatedEvent)
            alert("Update user successfully")
        } catch (err) {
            console.error(err)
        }
        console.log('Received values of form: ', values);
        setOpenEditEvent(false)
    };

    const onDelete = () => {
        showDeleteConfirm({
            title: 'Bạn có chắc chắn muốn xóa hộ khẩu này không?',
            icon: <WarningFilled />,
            onOk: async () => {
                try {
                    await axiosClient.delete(`/su-kien/${id}/delete`)
                    navigate(`/tang-qua`)
                } catch (e) {
                    const err = e as Error
                    console.log(err.message)
                    alert(err.message)
                }
            }
        })
    }
    const onEdit = () => {
        setOpenEditEvent(true)
    }
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate('/tang-qua')} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div> */}
                    <EventSubHeader />
                    <span>
                        <Space>
                            <Button type="primary" ghost color="#40A9FF" icon={<EditOutlined />} onClick={onEdit}>
                                Chỉnh sửa
                            </Button>
                            <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={onDelete}>
                                Xóa
                            </Button>
                            <Button onClick={() => {
                                setOpenCreateChildren(true)
                            }}>Thêm bé mới</Button>
                        </Space>
                    </span>
                    <EditFormModal
                        open={openEditEvent}
                        onCreate={onEditEvent}
                        onCancel={() => {
                            setOpenEditEvent(false)
                        }}
                    />
                    <CreateChildrenFormModal
                        open={openCreateChildren}
                        onCreate={onCreateChildren}
                        onCancel={() => {
                            setOpenCreateChildren(false)
                        }}
                        event={event}
                    />
                </div>
                <TabList defaultActiveKey='1' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2xl font-medium">{`${event.name}`} - Danh sách các bé nhận quà</p>
                        <p className="text-2xl font-medium"> Ngày bắt đầu: {`${event.ngayBatDau}`}</p>
                        <p className="text-2x1 font-medium">Tổng số bé: {`${event.duoc_nhan_thuongs.length}`}</p>
                    </div>
                    <ChildrenTable eventId={id} event={event} />
                </div>
            </div>
        </HomeLayout>
    )
}