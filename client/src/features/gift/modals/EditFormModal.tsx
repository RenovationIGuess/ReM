import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import achiveType from "../enums/achieveType";
import types from "../enums/types";
import capHocType from "../enums/capHocType";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { useEventStore } from "~/app/eventStore";
import axiosClient from "~/app/axiosClient";

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
                        valuePropName="checked"
                        rules={[{ required: true, message: 'Hãy chọn loại sự kiện', type: 'number' }]}
                    >
                        <Checkbox value={type} checked={type ? true : false} onChange={(e) => {
                            const type = e.target.checked ? 1 : 0
                            setType(type)
                            console.log(type)
                        }}>Có liên quan đến học tập</Checkbox>
                        {/* <Select
                            value={type}
                            te
                            onChange={(e: number) => {
                                setType(e)
                                console.log(type)
                            }}>
                            {types.map((type) => <Select.Option value={type.enum} key={type.enum} id={type.enum}>{type.text}</Select.Option>)}
                        </Select> */}
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
                                                        {/* <Select>
                                                            {achiveType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                                                        </Select> */}
                                                        <Radio.Group>
                                                            {achiveType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                                        </Radio.Group>
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
                                                        {/* <Select>
                                                            {capHocType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                                                        </Select> */}
                                                        <Radio.Group>
                                                            {capHocType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                                        </Radio.Group>
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
                                                                            name={[name, 'id']}
                                                                            rules={[{ required: true, message: 'Missing item name' }]}
                                                                        >
                                                                            <Select>
                                                                                {itemsList.map((item) => <Select.Option value={item.id} key={item.id} id={item.id}>{item.name}</Select.Option>)}
                                                                            </Select>
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'pivot', 'soLuong']}
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
                            <Form.List name="phan_thuongs">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <>
                                                <Title level={5}>Thêm các vật phẩm:</Title>
                                                <Form.Item key={key}>
                                                    <Form.List name={[name, 'items']}>
                                                        {(items, { add, remove }) => {
                                                            return (
                                                                <div>
                                                                    {items.map(({ key, name, ...restField }) =>
                                                                    (
                                                                        <Space key={key} align="start">
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'id']}
                                                                                rules={[{ required: true, message: 'Missing item name' }]}
                                                                            >
                                                                                <Select>
                                                                                    {itemsList.map((item) => <Select.Option value={item.id} key={item.id} id={item.id}>{item.name}</Select.Option>)}
                                                                                </Select>
                                                                            </Form.Item>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                name={[name, 'pivot', 'soLuong']}
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

                                                </Form.Item>
                                            </>
                                        ))}
                                        <Form.Item>
                                            <Button disabled={fields.length >= 2} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Thêm phần quà
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </>
                    )}
                </div>
            </Form>
        </Modal>
    )
}

export default EditFormModal