import React, { useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Space } from 'antd'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { createTamVang } from '~/lib/temporary'
import { toast } from 'react-toastify'

type PropType = {
  currentResident: IResident
}

const TamVangCreate = ({ currentResident }: PropType) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    setIsLoading(true)
    let isError = false
    createTamVang(currentResident.id, {
      ...values,
      tuNgay: values.tuNgay.format('YYYY-MM-DD'),
      denNgay: values.denNgay.format('YYYY-MM-DD')
    })
      .then(() => {
        toast.success('Đăng ký tạm vắng thành công')
        form.resetFields()
      })
      .catch(err => {
        toast.error('Đăng ký tạm vắng thất bại')
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
        Đăng ký tạm vắng
      </Button>

      <Modal
        title="Đăng ký tạm vắng"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={<></>}
      >
        <Form
          form={form}
          name="dangKyTamVang"
          autoComplete="off"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
        >
          <Form.Item
            label="Mã giấy tạm vắng"
            name="maGiayTamVang"
            rules={[{ required: true, message: 'Mã giấy tạm vắng không được để trống' }]}
          >
            <Input placeholder="Nhập mã giấy tạm vắng" />
          </Form.Item>

          <Form.Item
            label="Nơi tạm trú"
            name="noiTamTru"
            rules={[{ required: true, message: 'Nơi tạm trú không được để trống' }]}
          >
            <Input placeholder="Nhập nơi tạm trú" />
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
                      form.resetFields()
                      setIsOpen(false)
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

export default TamVangCreate
