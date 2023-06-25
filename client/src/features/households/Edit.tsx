import React, { useEffect } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useHouseholdStore } from '~/app/householdStore'

interface IFormValues {
  idChuHo: number
  maKhuVuc: string
  diaChi: string
}

const Edit = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [household, getHouseholdById] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById
  ])

  const onFinish = async (values: IFormValues) => {
    try {
      const { idChuHo, maKhuVuc, diaChi } = values
      // await updateHousehold({ id, idChuHo, maKhuVuc, diaChi }).unwrap()
      // navigate(`/ho-khau/${id}`)
      const editedHousehold = {
        ...household,
        idChuHo,
        maKhuVuc,
        diaChi
      }
      console.log(editedHousehold)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHouseholdById(id as string)
  }, [id])

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title={household.maHoKhau as string} type="create" />
        <Form
          className="grid auto-rows-max grid-cols-8 items-center justify-center"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{
            idChuHo: `${household.chu_ho?.id}`,
            maKhuVuc: household.maKhuVuc,
            diaChi: household.diaChi
          }}
        >
          <div className="col-span-3 col-start-3">
            <Form.Item
              name="idChuHo"
              label="Chủ hộ"
              rules={[{ required: true, message: 'Tên chủ hộ không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Select
                showSearch
                placeholder="Nhập tên chủ hộ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: '138', label: 'Trần Nhật Huy' },
                  { value: '2', label: 'Nguyễn Văn A' }
                ]}
              />
            </Form.Item>
            <Form.Item
              name="maKhuVuc"
              label="Mã khu vực"
              rules={[{ required: true, message: 'Mã khu vực không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Input placeholder="Nhập mã khu vực" className="w-full" />
            </Form.Item>

            <Form.Item
              name="diaChi"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
              labelCol={{ span: 8 }}
            >
              <Input.TextArea placeholder="Nhập địa chỉ" className="w-full" maxLength={100} />
            </Form.Item>
            <div className="col-span-8 col-start-6 flex items-center justify-between gap-2">
              <p className="text-xl font-medium">Thành viên hộ khẩu</p>
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

export default Edit
