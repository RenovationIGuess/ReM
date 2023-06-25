import React, { useState } from 'react'
import { ApiOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd'
import { useResidentsStore } from './residentsStore'
import { useAuthStore } from '../auth/authStore'
import { khaiTuResident } from '~/lib/residents'
import { toast } from 'react-toastify'

type PropsType = {
  currnetResident: IResident
}

const Death = ({ currnetResident }: PropsType) => {
  const [form] = Form.useForm()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [currentUser] = useAuthStore(state => [state.currentUser])
  const [searchResult, searchResident] = useResidentsStore(state => [
    state.searchResult,
    state.searchResident
  ])

  const onSearch = (value: string) => {
    searchResident(value)
  }

  const onFinish = async (values: any) => {
    try {
      await khaiTuResident(currnetResident.id, {
        ...values,
        ngayChet: values.ngayChet.format('YYYY-MM-DD'),
        idNguoiTao: currentUser.id
      })
      toast.success('Bạn đã khai tử cho nhân khẩu này', {
        toastId: 'death-resident-success',
        icon: '📿'
      })
      setIsOpen(false)
      form.resetFields()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button type="primary" ghost danger icon={<ApiOutlined />} onClick={() => setIsOpen(true)}>
        Khai tử
      </Button>

      <Modal
        title="Đơn khai tử"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={<></>}
      >
        <Form form={form} onFinish={onFinish} labelCol={{ span: 6 }}>
          <Form.Item
            label="Số giấy khai tử"
            name="soGiayKhaiTu"
            rules={[{ required: true, message: 'Số giấy khai tử không được để trống' }]}
          >
            <Input placeholder="Nhập số giấy khai tử" />
          </Form.Item>

          <Form.Item
            label="Người khai tử"
            name="idNguoiKhaiTu"
            rules={[{ required: true, message: 'Người khai tử không được để trống' }]}
          >
            <Select
              showSearch
              placeholder="Nhập họ tên người khai tử"
              options={Array.from(searchResult)
                .filter(resident => resident.id !== currnetResident.id && !resident.ghiChu)
                .map(resident => ({
                  label: resident.hoTen,
                  value: resident.id
                }))}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            label="Ngày tử vong"
            name="ngayChet"
            rules={[{ required: true, message: 'Ngày tử vong không được để trống' }]}
          >
            <DatePicker placeholder="Ngày tử vong" />
          </Form.Item>

          <Form.Item
            label="Lý do tử vong"
            name="lyDoChet"
            rules={[{ required: true, message: 'Lý do tử vong không được để trống' }]}
          >
            <Input.TextArea placeholder="Nhập vào lý do tử vong" />
          </Form.Item>

          <Form.Item className="flex items-center justify-end">
            <Space>
              <Button htmlType="button" ghost danger onClick={() => setIsOpen(false)}>
                Hủy
              </Button>

              <Button type="primary" htmlType="submit" ghost>
                Khai tử
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Death
