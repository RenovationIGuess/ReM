import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Space } from "antd";
import { useState, useEffect } from "react";
import { useEventStore } from "~/app/eventStore";
import achiveType from "../enums/achieveType";
import capHocType from "../enums/capHocType";
import types from "../enums/types";
import Title from "antd/es/typography/Title";

interface CreateEventFormModalProps {
    open: boolean;
    onCreate: (values: IEvent) => void;
    onCancel: () => void;
}
const CreateEventFormModal: React.FC<CreateEventFormModalProps> = ({
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
                        valuePropName="checked"
                    >
                        <Checkbox value={typeEvent} checked={typeEvent ? true : false} onChange={(e) => {
                            const type = e.target.checked ? 1 : 0
                            setTypeEvent(type)
                            console.log(type)
                        }}>Có liên quan đến học tập</Checkbox>
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
                                                                            name={[name, 'idItem']}
                                                                            rules={[{ required: true, message: 'Missing item name' }]}
                                                                        >
                                                                            <Select
                                                                                style={{ width: '200px' }}
                                                                            >
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
                                                                                name={[name, 'idItem']}
                                                                                rules={[{ required: true, message: 'Missing item name' }]}
                                                                                style={{ width: '200px' }}
                                                                            >
                                                                                <Select
                                                                                >
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

                                                </Form.Item>
                                            </>
                                        ))}
                                        <Form.Item>
                                            <Button disabled={fields.length >= 1} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Thêm phần quà
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
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

export default CreateEventFormModal
