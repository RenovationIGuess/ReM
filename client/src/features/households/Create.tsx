import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import AddResidentsModal from './AddResidentsModal'
import MembersList from './MembersList'

const Create = () => {
  const navigate = useNavigate()

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Thêm mới hộ khẩu" type="create" />
        <Form className="grid auto-rows-max grid-cols-8 items-center justify-center">
          <div className="col-span-3 col-start-3">
            <Form.Item
              name="chu-ho"
              label="Chủ hộ"
              rules={[{ required: true, message: 'Tên chủ hộ không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Select
                showSearch
                placeholder="Nhập tên chủ hộ"
                optionFilterProp="children"
                options={[{ value: '1', label: 'Trần Nhật Huy' }]}
              />
            </Form.Item>
            <Form.Item
              name="ma-khu-vuc"
              label="Mã khu vực"
              rules={[{ required: true, message: 'Mã khu vực không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Input placeholder="Nhập mã khu vực" className="w-full" />
            </Form.Item>

            <Form.Item
              name="dia-chi"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Input.TextArea placeholder="Nhập địa chỉ" className="w-full" maxLength={100} />
            </Form.Item>
            <div className="col-span-8 col-start-6 flex items-center justify-between gap-2">
              <p className="text-xl font-medium">Thành viên hộ khẩu</p>
              <AddResidentsModal />
            </div>

            <div className="col-span-8 col-start-6 gap-2">
              <MembersList membersList={[]} />
            </div>

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
                <Button type="primary" htmlType="submit" className="bg-primary">
                  Thêm
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default Create
