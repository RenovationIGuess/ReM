import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Space } from 'antd'
import { RcFile } from 'antd/es/upload'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useEffectOnce } from 'usehooks-ts'
import { IItem } from '~/@types'
import axiosClient from '~/app/axiosClient'
import { useEventStore } from '~/app/eventStore'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import UploadImage from '~/components/UploadImage'
import uploadFile from '~/firebase/uploadFile'

interface CreateFormFormProps {

}
type UploadFile = RcFile & { preview: string }
export const CreateItemForm: FC<CreateFormFormProps> = ({ }) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<UploadFile | null>(null)

    const onFinish = async (values: IItem) => {
        try {
            setLoading(true)
            let imageUrl: string | undefined = undefined
            if (image) imageUrl = await uploadFile(image)
            const { name, unit_price } = values
            const newItem = {
                name,
                unit_price,
                image_url: imageUrl
            }
            await axiosClient.post(`/items/create`, newItem)
            toast.success(`Đã thêm vật phẩm`, {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (error) {
            toast.error((error as Error).message, {
                position: toast.POSITION.TOP_RIGHT
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <HomeLayout>
            <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                <SubHeader title={`Thêm vật phẩm mới`} type="create" />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
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
                        <Form.Item
                            name="anhGiayKhen"
                            label="Ảnh giấy khen"
                        >
                            <UploadImage image={image} setImage={setImage} />
                        </Form.Item>
                        <Form.Item className="col-span-8 col-start-6 ms-32">
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    className="bg-danger"
                                    onClick={() =>
                                        showDeleteConfirm({
                                            title: 'Bạn có chắc chắn muốn hủy quá trình ?',
                                            icon: <ExclamationCircleFilled />,
                                            onOk() {
                                                navigate(-1)
                                            }
                                        })
                                    }
                                >
                                    Hủy
                                </Button>
                                <Button disabled={loading} type="primary" htmlType="submit" ghost>
                                    {loading ? <LoadingOutlined /> : 'Tạo'}
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
                <ToastContainer />
            </div>
        </HomeLayout>
    )
}

export default CreateItemForm