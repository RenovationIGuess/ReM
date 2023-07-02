import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Space } from 'antd'
import { RcFile } from 'antd/es/upload'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useEffectOnce } from 'usehooks-ts'
import axiosClient from '~/app/axiosClient'
import { useEventStore } from '~/app/eventStore'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import UploadImage from '~/components/UploadImage'
import uploadFile from '~/firebase/uploadFile'

interface EditItemFormProps { }
type UploadFile = RcFile & { preview: string }
export const EditItemForm: FC<EditItemFormProps> = ({ }) => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<UploadFile | null>(null)

  const [item, getItemById] = useEventStore(state => [state.item, state.getItemById])

  useEffect(() => {
    form.setFieldsValue(item)
  }, [item, form])

  useEffectOnce(() => {
    getItemById(id)
  })

  const onFinish = async (values: IItem) => {
    try {
      setLoading(true)
      let imageUrl: string | undefined = undefined
      if (image) imageUrl = await uploadFile(image)
      const { name, unit_price, image_url } = values
      const editedItem = {
        ...item,
        name,
        unit_price,
        image_url: imageUrl
      }
      await axiosClient.put(`/items/${item.id}/edit`, editedItem)
      toast.success(`Thông tin vật phẩm mã ${item.id} đã được chỉnh sửa`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { success: boolean; message: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { success: boolean; message: string }
      const messageError = dataError2.message
      toast.error(messageError ? messageError : (error as Error).message, {
        position: toast.POSITION.TOP_RIGHT
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title={`Chỉnh sửa vật phẩm mã ${item.id}`} type="create" />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          name="form_in_modal"
          title="Thêm sự kiện"
          initialValues={{ modifier: 'public', item }}
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
            <Form.Item name="anhGiayKhen" label="Ảnh vật phẩm">
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
                  {loading ? <LoadingOutlined /> : 'Sửa'}
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
