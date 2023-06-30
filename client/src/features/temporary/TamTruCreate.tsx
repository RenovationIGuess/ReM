import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Space } from 'antd'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const TamTruCreate = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log('==> create tam tru', values)
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
            rules={[{ required: true, message: 'Số điẹn thoại không được để trống' }]}
          >
            <Input placeholder="Nhập số điện thoại đăng ký" />
          </Form.Item>

          <Form.Item
            label="Từ ngày"
            name="tuNgay"
            rules={[{ required: true, message: 'Từ ngày không được để trống' }]}
          >
            <DatePicker className="w-full" placeholder="Từ ngày" format={'YYYY-MM-DD'} />
          </Form.Item>

          <Form.Item
            label="Đến ngày"
            name="denNgay"
            rules={[{ required: true, message: 'Đến ngày không được để trống' }]}
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
                      navigate(-1)
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
