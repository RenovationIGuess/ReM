import React, { useEffect, useState } from 'react'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty, Form, Input, Space, Tooltip, message } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'

function SplitHousehold() {
  const { id } = useParams()

  const [form] = Form.useForm()
  const navigate = useNavigate()

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
      nhanKhauMois: [...newHousehold.nhan_khaus.map(resident => resident.id), newHousehold.idChuHo],
      lyDoChuyenDi
    })
    navigate(-1)
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
        <Form className="" form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
          <div className="flex justify-between gap-4">
            <EachHouseholdInfoDiv label="Thông tin hộ khẩu mới" className="w-2/4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Mã hộ khẩu"
                  name="maHoKhau"
                  rules={[{ required: true, message: 'Mã hộ khẩu không được để trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mã khu vực"
                  name="maKhuVuc"
                  rules={[{ required: true, message: 'Mã khu vực không được để trống' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Địa chỉ"
                  name="diaChi"
                  rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  label="Lý do chuyển đi"
                  name="lyDoChuyenDi"
                  rules={[{ required: true, message: 'Lý do chuyển đi không được để trống' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
              <Form.Item>
                <Button size="large" type="primary" ghost htmlType="submit" className="mt-4" block>
                  Thêm mới hộ khẩu
                </Button>
              </Form.Item>
            </EachHouseholdInfoDiv>
            <EachHouseholdInfoDiv label="Chủ hộ" className="w-2/4">
              {Object.keys(newHousehold?.chu_ho ?? {}).length !== 0 ? (
                <>
                  <div className="flex items-center justify-start gap-8">
                    <Avatar
                      className="flex items-center justify-center"
                      size={128}
                      icon={<UserOutlined />}
                    />

                    <div className="grid h-full grow grid-cols-3 gap-4">
                      <HouseholdInfoItem
                        label="Họ và tên chủ hộ"
                        value={newHousehold.chu_ho?.hoTen}
                      />
                      <HouseholdInfoItem
                        label="Giới tính"
                        value={newHousehold.chu_ho?.gioiTinh == 1 ? 'Nam' : 'Nữ'}
                      />
                      <HouseholdInfoItem
                        label="Ngày sinh"
                        value={
                          newHousehold.chu_ho?.ngaySinh &&
                          new Intl.DateTimeFormat('vi-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }).format(new Date(newHousehold.chu_ho?.ngaySinh))
                        }
                      />
                      <HouseholdInfoItem label="Bí danh" value={newHousehold.chu_ho?.biDanh} />
                    </div>
                  </div>
                </>
              ) : (
                <Empty className="py-8" />
              )}
            </EachHouseholdInfoDiv>
          </div>
        </Form>
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
                onClick={() => {
                  if (residents.find(resident => resident.id === newHousehold?.idChuHo)) {
                    setNewHousehold({ ...newHousehold, nhan_khaus: residents })
                    return
                  }
                  setNewHousehold({
                    ...newHousehold,
                    idChuHo: undefined,
                    chu_ho: {} as IResident,
                    nhan_khaus: residents
                  })
                }}
              />
            </Tooltip>
          </div>
          <div className="w-2/4">
            <Table
              bordered
              rowSelection={{
                type: 'radio',
                onChange: selectedRow => {
                  setNewHousehold({
                    ...newHousehold,
                    idChuHo: selectedRow[0],
                    chu_ho: residents.find(resident => resident.id === selectedRow[0]) as IResident
                  })
                  console.log(newHousehold)
                },
                selectedRowKeys: [newHousehold?.idChuHo]
              }}
              rowKey={record => record.id}
              columns={columns}
              dataSource={newHousehold.nhan_khaus ?? []}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default SplitHousehold
