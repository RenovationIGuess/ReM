import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import React, { FC } from 'react'

interface CreateItemFormModalProps {
    open: boolean;
    onCreate: (values: IItem) => void;
    onCancel: () => void;
}

const CreateItemFormModal: FC<CreateItemFormModalProps> = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm()
    return (
        <Modal
            open={open}
            title="Tạo vật phẩm"
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
                        label="Tên vật phẩm"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên của vật phẩm' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="unit_price"
                        label="Đơn giá"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy nhập đơn giá sản phẩm', type: 'number' }]}
                    >
                        <InputNumber addonAfter="$" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default CreateItemFormModal