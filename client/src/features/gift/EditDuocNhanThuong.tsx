import React, { useEffect } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Form, Input, Radio, Select, Space } from 'antd'
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


const EditDuocNhanThuong = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [form] = Form.useForm()

    const [children, getChildrenById, event, getEventById] = useEventStore(state => [
        state.children,
        state.getChildrenById,
        state.event,
        state.getEventById
    ])

    useEffect(() => {
        getChildrenById(id as string)
        console.log(id)
        getEventById(children.idSuKien.toString())
    }, [])
    const type = event.type
    const onFinish = async (values: IDuocNhanThuong) => {
        if (type) {
            try {
                const { tenTruong, tenLop, thanhTichHocTap, capHoc, anhGiayKhen } = values
                // await updateHousehold({ id, idChuHo, maKhuVuc, diaChi }).unwrap()
                // navigate(`/ho-khau/${id}`)
                const editedChildren = {
                    ...children,
                    tenTruong,
                    tenLop,
                    thanhTichHocTap,
                    capHoc,
                    anhGiayKhen
                }
                await axiosClient.put(`/duoc-nhan-thuong/${children.id}/edit`, editedChildren)
                console.log(editedChildren)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Đây là sự kiện không liên quan đến học tập nên không được chỉnh sửa!")
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                <SubHeader title={`Chỉnh sửa phần quà mã ${children.idPhanThuong}`} type="create" />
                <Form
                    className="grid auto-rows-max grid-cols-8 items-center justify-center"
                    form={form}
                    autoComplete="off"
                    onFinish={onFinish}
                    initialValues={{
                        tenTruong: `${children.tenTruong}`,
                        tenLop: children.tenLop,
                        thanhTichHocTap: children.thanhTichHocTap,
                        capHoc: children.capHoc,
                        anhGiayKhen: children.anhGiayKhen
                    }}
                >
                    <div className="col-span-3 col-start-3">
                        <Form.Item
                            name="tenTruong"
                            label="Tên trường"
                            rules={[{ required: true, message: 'Hãy nhập tên trường' }]}
                            labelCol={{ span: 8 }}
                        >
                            <Input.TextArea className='w-full' />
                        </Form.Item>
                        <Form.Item
                            name="tenLop"
                            label="Tên lớp"
                            rules={[{ required: true, message: 'Hãy nhập tên lớp' }]}
                            labelCol={{ span: 8 }}
                        >
                            <Input.TextArea className="w-full" />
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
                            <Radio.Group className='w-full'>
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
                            <UploadImage />
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
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-primary"
                                    onSubmit={() => navigate(-1)}
                                >
                                    Lưu
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </HomeLayout>
    )
}

export default EditDuocNhanThuong
