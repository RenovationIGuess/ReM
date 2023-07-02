import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Space } from 'antd'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { createTamTru } from '~/lib/temporary'
import { toast } from 'react-toastify'

type PropType = {
  currentResident: IResident
}

const TamTruCreate = ({ currentResident }: PropType) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    let isError = false
    setIsLoading(true)
    createTamTru(currentResident.id, {
      ...values,
      tuNgay: values.tuNgay.format('YYYY-MM-DD'),
      denNgay: values.denNgay.format('YYYY-MM-DD')
    })
      .then(() => {
        toast.success('Đăng ký tạm trú thành công')
        // form.resetFields()
      })
      .catch(err => {
        toast.error('Đăng ký tạm trú thất bại')
        isError = true
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
        if (!isError) setIsOpen(false)
      })
  }

  return (
    <>
      <Button type="primary" ghost onClick={() => setIsOpen(true)}>
        Đăng ký tạm trú
      </Button>

      <Modal
        title="Đăng ký tạm trú"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={<></>}
      >
        <Form
          form={form}
          name="dangKyTamTru"
          autoComplete="off"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
        >
          <Form.Item
            label="Mã giấy tạm trú"
            name="maGiayTamTru"
            rules={[{ required: true, message: 'Mã giấy tạm trú không được để trống' }]}
          >
            <Input placeholder="Nhập mã giấy tạm trú" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại đăng ký"
            name="soDienThoaiDangKy"
            rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
          >
            <Input placeholder="Nhập số điện thoại đăng ký" />
          </Form.Item>

          <Form.Item
            label="Từ ngày"
            name="tuNgay"
            rules={[{ required: true, message: 'Ngày bắt đầu không được để trống' }]}
          >
            <DatePicker className="w-full" placeholder="Từ ngày" format={'YYYY-MM-DD'} />
          </Form.Item>

          <Form.Item
            label="Đến ngày"
            name="denNgay"
            rules={[{ required: true, message: 'Ngày kết thúc không được để trống' }]}
          >
            <DatePicker className="w-full" placeholder="Đến ngày" format={'YYYY-MM-DD'} />
          </Form.Item>

          <Form.Item label="Lý do" name="lyDo">
            <Input.TextArea placeholder="Nhập lý do đăng ký" />
          </Form.Item>

          <Form.Item className="flex items-center justify-end">
            <Space>
              <Button
                type="primary"
                htmlType="button"
                ghost
                danger
                onClick={() =>
                  showDeleteConfirm({
                    title: 'Bạn có chắc chắn muốn hủy quá trình ?',
                    icon: <ExclamationCircleFilled />,
                    onOk() {
                      setIsOpen(false)
                      form.resetFields()
                    }
                  })
                }
              >
                Hủy
              </Button>
              <Button disabled={isLoading} type="primary" htmlType="submit" ghost>
                {isLoading ? <LoadingOutlined /> : 'Đăng ký'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TamTruCreate
