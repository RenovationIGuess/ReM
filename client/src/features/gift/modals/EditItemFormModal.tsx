import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react'
import axiosClient from '~/app/axiosClient';

interface EditItemFormModalProps {
    open: boolean;
    onCreate: (values: IItem) => void;
    onCancel: () => void;
    itemId: number
}

const EditItemFormModal: FC<EditItemFormModalProps> = ({ open, onCreate, onCancel, itemId }) => {
    const [form] = Form.useForm()
    const [item, setItem] = useState<IItem>()
    const fetchItem = async (id: number) => {
        try {
            const response: AxiosResponse<IItem> = await axiosClient.get(`/items/${id}`)
            setItem(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchItem(itemId)
    }, [])
    return (
        <Modal
            open={open}
            title="Chỉnh sửa vật phẩm"
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
                initialValues={{ modifier: 'public', name: item?.name, unit_price: item?.unit_price }}
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

export default EditItemFormModal