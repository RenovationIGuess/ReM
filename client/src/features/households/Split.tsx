import React, { useEffect, useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Tooltip } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useParams } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'

function SplitHousehold() {
  const { id } = useParams()

  const [form] = Form.useForm()

  const [household, getHouseholdById, splitHousehold] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById,
    state.splitHousehold
  ])

  const [residents, setResidents] = useState<IResident[]>([])
  const [newHousehold, setNewHousehold] = useState<IHousehold>({} as IHousehold)

  const onFinish = (values: any) => {
    const { lyDoChuyenDi, maHoKhau, maKhuVuc, diaChi } = values
    splitHousehold(id as string, {
      idChuHo: newHousehold.idChuHo,
      maHoKhau,
      maKhuVuc,
      diaChi,
      nhanKhauMois: newHousehold.nhan_khaus.map(resident => resident.id),
      lyDoChuyenDi
    })
  }

  useEffect(() => {
    if (household && household.id !== parseInt(id as string)) getHouseholdById(id as string)
  }, [id])

  const columns: ColumnsType<IResident> = [
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      key: 'hoTen'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh'
    },
    {
      title: 'Quan hệ với chủ hộ',
      render: (_, record) => record.pivot?.quanHeVoiChuHo
    }
  ]

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Tách hộ khẩu" type="create" />
        <Form autoComplete="off" form={form} onFinish={onFinish}>
          <Form.Item
            label="Mã hộ khẩu"
            name="maHoKhau"
            rules={[{ required: true, message: 'Mã hộ khẩu không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input className="w-2/4" />
          </Form.Item>
          <Form.Item
            label="Mã khu vực"
            name="maKhuVuc"
            rules={[{ required: true, message: 'Mã khu vực không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input className="w-2/4" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="diaChi"
            rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input.TextArea className="w-2/4" />
          </Form.Item>
          <Form.Item
            label="Lý do chuyển đi"
            name="lyDoChuyenDi"
            rules={[{ required: true, message: 'Lý do chuyển đi không được để trống' }]}
            labelCol={{ span: 8 }}
          >
            <Input.TextArea className="w-2/4" />
          </Form.Item>
          <div className="flex justify-between">
            <div className="w-2/4">
              <Table
                bordered
                rowKey={record => record.id}
                rowSelection={{
                  type: 'checkbox',
                  onChange: (_, selectedRows) => {
                    setResidents([...selectedRows])
                  },
                  getCheckboxProps: record => ({
                    disabled: record.id === household?.idChuHo
                  })
                }}
                columns={columns}
                dataSource={household?.nhan_khaus}
                pagination={false}
              />
            </div>
            <div className="flex w-1/12 items-center justify-center">
              <Tooltip placement="bottom" title={'Tách thành viên'} arrow={false}>
                <Button
                  type="link"
                  icon={<RightOutlined />}
                  onClick={() => setNewHousehold({ ...newHousehold, nhan_khaus: residents })}
                />
              </Tooltip>
            </div>
            <div className="w-2/4">
              <Table
                bordered
                rowSelection={{
                  type: 'radio',
                  onChange: selectedRow => {
                    setNewHousehold({ ...newHousehold, idChuHo: selectedRow[0] })
                    console.log(newHousehold)
                  }
                }}
                rowKey={record => record.id}
                columns={columns}
                dataSource={newHousehold.nhan_khaus ?? []}
                pagination={false}
              />
            </div>
          </div>
          <Space className="flex items-center justify-center gap-4">
            <Button ghost danger type="primary">
              Hủy
            </Button>
            <Button ghost type="primary" htmlType="submit">
              Tách hộ khẩu
            </Button>
          </Space>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default SplitHousehold
