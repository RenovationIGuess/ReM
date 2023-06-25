import React, { useEffect, useState } from 'react'
import Event from './Event'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Form, Modal, InputNumber, DatePicker, Select, Typography, Space } from 'antd'
import TabList from '~/components/Layout/TabList'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '~/hooks/useRedux'
import { useGetEventsByPageQuery } from './api/events.slice'
import GiftFormItem from './GiftFormItem'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import moment from 'moment'
import types from './enums/types'
import achiveType from './enums/achieveType'
import capHocType from './enums/capHocType'

const { Title } = Typography;


interface Values {
    name: string;
    ngayBatDau: Date;
    type: number,
    phan_thuongs: {
        itemId: number,
        soLuong: number
    },
    phan_thuong: {
        itemId: number,
        soLuong: number
    }
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [typeEvent, setTypeEvent] = useState(0);
    const [itemsList, getItemsList] = useEventStore(state => [
        state.items,
        state.getItems
    ])
    useEffect(() => {
        getItemsList()
    }, [])
    return (
        <Modal
            open={open}
            title="Tạo sự kiện"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        //dispatch(addGift({ key: '6', id: '6', name: nameValue, price: priceValue }))
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
                        name="name"
                        label="Tên sự kiện"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên của sự kiện' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ngayBatDau"
                        label="Ngày bắt đầu"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy chọn ngày bắt đầu của sự kiện', type: 'date' }]}
                    >
                        <DatePicker
                            picker="date"
                        />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Loại sự kiện"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy chọn loại sự kiện' }]}
                    >
                        <Select
                            value={typeEvent}
                            onChange={(e: number) => {
                                setTypeEvent(e)
                                console.log(typeEvent)
                            }}>
                            {types.map((type) => <Select.Option value={type.enum} key={type.enum} id={type.enum}>{type.text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    {typeEvent ? (
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
                    {/* <Button
                        className='bg-primary'
                        style={{ color: 'white' }}
                        onClick={handleAddGift}
                    >
                        Thêm phần quà
                    </Button> */}
                </div>
            </Form>
        </Modal >
    );
};





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
                type: values.type,
                phan_thuongs: values.phan_thuongs
            })
            console.log("Success")
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
                    <CollectionCreateForm
                        open={openCreateEvent}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpenCreateEvent(false);
                        }}
                    />
                </div>
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