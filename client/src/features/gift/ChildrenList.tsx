import { Button, Checkbox, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ChildrenTable from './ChildrenTable'
import TabList from '~/components/Layout/TabList'
import { EditOutlined, WarningFilled, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useAppDispatch } from '~/hooks/useRedux'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import moment from 'moment'
import { EventSubHeader } from '~/components/Layout/EventSubHeader'
import { ToastContainer, toast } from 'react-toastify'
import { useEffectOnce } from 'usehooks-ts'


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
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<IDuocNhanThuong[] | undefined>([]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);

        const filteredList = event.duoc_nhan_thuongs.filter((obj: IDuocNhanThuong) =>
            obj.nhan_khau.hoTen.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filteredList);
    };

    const handleSelectChange = (value: string) => {
        setSearchQuery(value);
    };

    const [event, getEventById] = useEventStore(state => [
        state.event,
        state.getEventById
    ])
    const [isDone, setIsDone] = useState(event.isDone)

    const onEditEvent = async (values: IEvent) => {
        const inputDate = new Date(values.ngayBatDau);
        const formattedDate = moment(inputDate).format('YYYY-MM-DD');
        try {
            const updatedEvent = {
                ...values,
                ngayBatDau: formattedDate
            }
            await axiosClient.put(`/su-kien/${id}/edit`, updatedEvent)
            toast.success('Cập nhật sự kiện thành công', {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (err) {
            toast.error((err as Error).message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        console.log('Received values of form: ', values);
        setOpenEditEvent(false)
    };

    const onDelete = () => {
        showDeleteConfirm({
            title: 'Bạn có chắc chắn muốn sự kiện khẩu này không?',
            icon: <WarningFilled />,
            onOk: async () => {
                try {
                    await axiosClient.delete(`/su-kien/${id}/delete`)
                    toast.success('Xóa sự kiện thành công', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate(`/su-kien/${event.id}`)
                } catch (e) {
                    const err = e as Error
                    toast.error(err.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }
        })
    }

    const handleIsDone = async (event: IEvent) => {
        setIsDone(!isDone);
        try {
            await axiosClient.patch(`/su-kien/${event.id}/${isDone ? 'done-uncheck' : 'done-check'}`)
            !isDone ?
                toast.success(`Sự kiện đã chuyển sang trạng thái kết thúc`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                }) :
                toast.success(`Sự kiện đã chuyển lại chưa kết thúc`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000
                })
        } catch (err) {
            toast.error((err as Error).message, {
                position: toast.POSITION.TOP_RIGHT
            })
        } finally {

        }
    }

    const fetchInitChecked = async () => {
        const response = await axiosClient.get(`/su-kien/${id}`)
        const initialValue = response.data.isDone;
        setIsDone(initialValue)
    }
    useEffectOnce(() => {
        getEventById(id ? id : '1')
        fetchInitChecked()
        // handleIsDone(event)
        console.log(event.isDone)
    })
    console.log(event, id, isDone)
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate(-1)} />
                        <Select
                            mode="multiple"
                            style={{ width: '500px' }}
                            value={searchQuery}
                            placeholder="Tìm kiếm bé"
                            onChange={handleSelectChange}
                            onSearch={handleSearch}
                            filterOption={false}
                            notFoundContent={null}
                        >
                            {filteredOptions?.map(obj => (
                                <Select.Option key={obj.nhan_khau.hoTen} value={obj.nhan_khau.hoTen}>
                                    <Link to={`/duoc-nhan-thuong/chinh-sua/${obj.id}`}>{obj.nhan_khau.hoTen}</Link>
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <span>
                        <Space>
                            <Button type="primary" ghost color="#40A9FF" icon={<EditOutlined />} onClick={e => navigate(`/su-kien/chinh-sua/${event.id}`)}>
                                Chỉnh sửa
                            </Button>
                            <Button disabled={isDone} type="primary" ghost danger icon={<DeleteOutlined />} onClick={onDelete}>
                                Xóa
                            </Button>
                            <Button onClick={() => {
                                navigate(`/su-kien/duoc-nhan-thuong/create/${event.id}`)
                            }}>Thêm bé mới</Button>
                        </Space>
                    </span>
                </div>
                <TabList defaultActiveKey='1' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2x1 font-medium">Loại sự kiện: {`${event.type}`}</p>
                        <p className="text-2x1 font-medium">{`${event.name}`} - Danh sách các bé nhận quà</p>
                        <p className="text-2x1 font-medium"> Ngày bắt đầu: {`${event.ngayBatDau}`}</p>
                        <p className="text-2x1 font-medium">Tổng số bé: {`${event.duoc_nhan_thuongs.length}`}</p>
                        {/* <input
                            type="checkbox"
                            checked={event.isDone ? true : false}
                            onChange={() => handleIsDone(event)}
                        >
                            {event.isDone ? 'Đã kết thúc' : "Cho sự kiện kết thúc"}
                        </input> */}
                        <Checkbox defaultChecked={event.isDone === 1 ? true : false}
                            checked={isDone ? true : false}
                            onChange={(e) => handleIsDone(event)}>
                            {isDone ? "Đã kết thúc" : 'Chưa kết thúc. Cho kết thúc'}
                        </Checkbox>
                    </div>
                    <ChildrenTable eventId={id} event={event} />
                </div>
            </div>
            <ToastContainer />
        </HomeLayout>
    )
}