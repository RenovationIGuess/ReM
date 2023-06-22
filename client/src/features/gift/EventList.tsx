import React, { useState } from 'react'
import Event from './Event'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Form, Modal, InputNumber } from 'antd'
import TabList from '~/components/Layout/TabList'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '~/hooks/useRedux'
import UploadImage from '~/components/UploadImage'

interface EventType {
    id: string,
    title: string
}

const data: EventType[] = [
    {
        id: '1',
        title: "Su kien cuoi nam 1986"
    },
    {
        id: '2',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '3',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '4',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '5',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '6',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '7',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '8',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '9',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '10',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '11',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '12',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '13',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '14',
        title: "Su kien tet trung thu 1987"
    },
    {
        id: '15',
        title: "Su kien tet trung thu 1987"
    },
]

const perPage = 6
const total = data.length

interface Values {
    name: string;
    price: string;
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
    const dispatch = useAppDispatch()
    const formRef: React.RefObject<any> | null = React.createRef();
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        const nameValue = formRef.current.getFieldValue(`name`);
                        const desValue = formRef.current.getFieldValue(`description`);
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
                ref={formRef}
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
                        name="description"
                        label="Mô tả"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi mô tả của sự kiện' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item className="ms-4">
                        <UploadImage />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};




const EventList = () => {
    const [state, setState] = useState({ minValue: 0, maxValue: perPage })
    const navigate = useNavigate()
    const handleChange = (value: number) => {
        setState({
            minValue: (value - 1) * perPage,
            maxValue: value * perPage
        });
    };
    const { id } = useParams()
    const [openCreateEvent, setOpenCreateEvent] = useState(false);

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpenCreateEvent(false);
    };
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    <Button onClick={() => setOpenCreateEvent(true)}>Thêm sự kiện mới</Button>
                    <CollectionCreateForm
                        open={openCreateEvent}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpenCreateEvent(false);
                        }}
                    />
                </div>
                <Row gutter={[16, 32]}>
                    {data &&
                        data.length > 0 &&
                        data.slice(state.minValue, state.maxValue).map((event) => (
                            <Event eventId={event.id} title={event.title} />
                        ))}
                </Row>
                <Pagination style={{ float: 'right' }} defaultCurrent={1} total={total} className='my-16' onChange={handleChange} defaultPageSize={perPage} />
            </div>
        </HomeLayout>
    )
}

export default EventList