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


interface Values {
    id: string;
    gifts: { name: string, price: number }[];
}

interface CollectionCreateChidrenProps {
    open: boolean;
    onCreate: (values: IDuocNhanThuong) => void;
    onCancel: () => void;
}

interface CollectionCEditFormProps {
    open: boolean;
    onCreate: (values: IEvent) => void;
    onCancel: () => void;
}

const EditFormModal: React.FC<CollectionCEditFormProps> = ({
    open,
    onCreate,
    onCancel
}) => {
    const { id } = useParams();
    const [name, setName] = useState<string | undefined>('')
    const [ngayBatDau, setNgayBatDau] = useState<Date>(new Date())
    const [type, setType] = useState<number | undefined>(0)
    const [gifts, setGifts] = useState<IPhanThuongThongKe[]>([])
    const [event, setEvent] = useState<IEvent>()
    let duoc_nhan_thuongs: IDuocNhanThuong[] = []
    const [form] = Form.useForm();
    const [itemsList, getItemsList] = useEventStore(state => [
        state.items,
        state.getItems
    ])

    const fetchEvent = async (id: string | undefined) => {
        try {
            const response: AxiosResponse<IEvent> = await axiosClient.get(`/su-kien/${id}`)
            setName(response.data.name)
            setNgayBatDau(response.data.ngayBatDau)
            setType(response.data.type)
            setGifts(response.data.phan_thuongs)
            setEvent(response.data)
            duoc_nhan_thuongs = response.data.duoc_nhan_thuongs
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchEvent(id)
        getItemsList()
    }, [])
    return (
        <Modal
            open={open}
            title="Chỉnh sửa sự kiện"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            destroyOnClose={true}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                title="Chỉnh sửa sự kiện"
                initialValues={{ modifier: 'public', phan_thuongs: gifts }}
                className="grid auto-rows-max grid-cols-8"
            >
                <div className="col-span-6 col-start-1">

                    <Form.Item
                        initialValue={name}
                        name="name"
                        label="Tên sự kiện"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên của sự kiện' }]}
                    >
                        <Input onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name="ngayBatDau"
                        initialValue={moment(ngayBatDau)}
                        label="Ngày bắt đầu"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy chọn ngày bắt đầu của sự kiện', type: 'date' }]}
                    >
                        <DatePicker
                            picker="date"
                            onChange={(_, dateString) => setNgayBatDau(new Date(dateString))}
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Loại sự kiện"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy chọn loại sự kiện' }]}
                    >
                        <Select
                            value={type}
                            onChange={(e: number) => {
                                setType(e)
                                console.log(type)
                            }}>
                            {types.map((type) => <Select.Option value={type.enum} key={type.enum} id={type.enum}>{type.text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    {type ? (
                        <>
                            <Title level={3}>Các phần quà cho sự kiện</Title>
                            <Form.List name="phan_thuongs">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <>
                                                <Form.Item key={key}>
                                                    <Form.Item
                                                        {...restField}
                                                        label="Thành tích học tập"
                                                        name={[name, 'thanhTichHocTap']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập thành tích',
                                                            },
                                                        ]}
                                                    >
                                                        <Select>
                                                            {achiveType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        label="Cấp học"
                                                        name={[name, 'capHoc']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập cấp học',
                                                            },
                                                        ]}
                                                    >
                                                        <Select>
                                                            {capHocType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Form.Item>
                                                <Title level={5}>Thêm các vật phẩm:</Title>
                                                <Form.List name={[name, 'items']}>
                                                    {(items, { add, remove }) => {
                                                        return (
                                                            <div>
                                                                {items.map(({ key, name, ...restField }) =>
                                                                (
                                                                    <Space key={key} align="start">
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'idItem']}
                                                                            rules={[{ required: true, message: 'Missing item name' }]}
                                                                        >
                                                                            <Select>
                                                                                {itemsList.map((item) => <Select.Option value={item.id} key={item.id} id={item.id}>{item.name}</Select.Option>)}
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'soLuong']}
                                                                            rules={[{ required: true, message: 'Missing item name' }]}
                                                                        >
                                                                            <InputNumber />
                                                                        </Form.Item>

                                                                        <MinusCircleOutlined
                                                                            onClick={() => {
                                                                                remove(name);
                                                                            }}
                                                                        />
                                                                    </Space>
                                                                ))}
                                                                <Form.Item>
                                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                                        Thêm vật phẩm
                                                                    </Button>
                                                                </Form.Item>
                                                            </div>
                                                        )
                                                    }}
                                                </Form.List>
                                            </>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Thêm phần quà
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </>

                    ) : (
                        <>
                            <Title level={5}>Thêm các vật phẩm:</Title>
                            <Form.List name={["phan_thuong", "items"]}>
                                {(items, { add, remove }) => {
                                    return (
                                        <div>
                                            {items.map(({ key, name, ...restField }) =>
                                            (
                                                <Space key={key} align="start">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'idItem']}
                                                        rules={[{ required: true, message: 'Missing item name' }]}
                                                    >
                                                        <Select>
                                                            {itemsList.map((item) => <Select.Option value={item.id} key={item.id} id={item.id}>{item.name}</Select.Option>)}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'soLuong']}
                                                        rules={[{ required: true, message: 'Missing item name' }]}
                                                    >
                                                        <InputNumber />
                                                    </Form.Item>

                                                    <MinusCircleOutlined
                                                        onClick={() => {
                                                            remove(name);
                                                        }}
                                                    />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Thêm vật phẩm
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    )
                                }}
                            </Form.List>
                        </>
                    )}
                </div>
            </Form>
        </Modal>
    )
}

const CreateChildrenFormModal: React.FC<CollectionCreateChidrenProps> = ({
    open,
    onCreate,
    onCancel
}) => {
    const { id } = useParams()
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Thêm bé mới được nhận thưởng"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            destroyOnClose={true}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                title="Thêm sự kiện"
                initialValues={{ modifier: 'public' }}
                className="grid auto-rows-max grid-cols-8"
            >
                <div className="col-span-6 col-start-1">
                    <Form.Item
                        name="tenTruong"
                        label="Tên trường"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên trường của bé' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenLop"
                        label="Tên Lớp"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên lớp của bé' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="idNhanKhau"
                        label="Mã nhân khẩu"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy nhập mã nhân khẩu của bé là một số', type: 'number' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Thành tích học tập"
                        name={'thanhTichHocTap'}
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập thành tích',
                            },
                        ]}
                    >
                        <Select>
                            {achiveType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cấp học"
                        name={'capHoc'}
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập cấp học',
                            },
                        ]}
                    >
                        <Select>
                            {capHocType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
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


    const onCreateChildren = async (values: IDuocNhanThuong) => {
        console.log('Received values of form: ', values);
        dispatch(setOpen(false));
        try {
            await axiosClient.post(`/su-kien/${id}/duoc-nhan-thuong/create`, values)
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
        dispatch(setOpen(false));
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
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate('/tang-qua')} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div>
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
                    />
                </div>
                <TabList defaultActiveKey='1' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2xl font-medium">{`${event.name}`} - Danh sách các bé nhận quà</p>
                        <p className="text-2xl font-medium"> Ngày bắt đầu: {`${event.ngayBatDau}`}</p>
                        <p className="text-2x1 font-medium">Tổng số bé: {`${event.duoc_nhan_thuongs.length}`}</p>
                    </div>
                    <ChildrenTable eventId={id} />
                </div>
            </div>
        </HomeLayout>
    )
}