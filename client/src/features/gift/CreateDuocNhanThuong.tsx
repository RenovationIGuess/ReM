import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Radio, Select, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useHouseholdStore } from '~/app/householdStore'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import achiveType from './enums/achieveType'
import capHocType from './enums/capHocType'
import UploadImage from '~/components/UploadImage'
import uploadFile from '~/firebase/uploadFile'
import { set } from 'immer/dist/internal'
import { RcFile } from 'antd/es/upload'
import { toast, ToastContainer } from 'react-toastify'
type UploadFile = RcFile & { preview: string }

const CreateDuocNhanThuong = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [form] = Form.useForm()
    const [image, setImage] = useState<UploadFile | null>(null)
    const [loading, setLoading] = useState(false)

    const [event, getEventById] = useEventStore(state => [
        state.event,
        state.getEventById
    ])

    useEffect(() => {
        console.log(id)
        getEventById(id)
    }, [])
    const type = event.type
    const onFinish = async (values: IDuocNhanThuong) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        try {
            let imageUrl: string | undefined = undefined
            if (image) imageUrl = await uploadFile(image)
            await axiosClient.post(`/su-kien/${id}/duoc-nhan-thuong/create`, {
                idNhanKhau: values.idNhanKhau,
                capHoc: values.capHoc,
                thanhTichHocTap: values.thanhTichHocTap,
                anhGiayKhen: imageUrl,
                tenTruong: values.tenTruong,
                tenLop: values.tenLop
            })
            toast.success(`Thêm bé thành công`, {
                position: toast.POSITION.TOP_RIGHT
            })
            navigate(`/su-kien/${event.id}`)
        } catch (error) {
            console.error(error)
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                <SubHeader title={`Tạo bé được nhận thưởng cho sự kiện ${event.name}`} type="create" />
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    title="Thêm sự kiện"
                    onFinish={onFinish}
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

                        {type ? (
                            <>
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
                                    <Radio.Group>
                                        {achiveType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                    </Radio.Group>
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
                                    <Radio.Group>
                                        {capHocType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    name="anhGiayKhen"
                                    label="Ảnh giấy khen"
                                >
                                    <UploadImage image={image} setImage={setImage} />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item
                                    name='thanhTichHocTap'
                                    hidden
                                    initialValue={0}
                                >
                                    <InputNumber defaultValue={0} />
                                </Form.Item>

                                <Form.Item
                                    name='capHoc'
                                    hidden
                                    initialValue={0}
                                >
                                    <InputNumber defaultValue={0} />
                                </Form.Item>

                                <Form.Item
                                    name='anhGiayKhen'
                                    hidden
                                    initialValue={null}
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        )}
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
            </div>
            <ToastContainer />
        </HomeLayout>
    )
}

export default CreateDuocNhanThuong
