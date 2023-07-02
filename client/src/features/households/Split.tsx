import React, { useEffect, useState } from 'react'
import { LoadingOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty, Form, Input, Select, Tooltip } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'
import { getHouseholdByPage, splitHousehold } from '~/lib/household'
import { toast } from 'react-toastify'
import { householdRelationship } from '~/app/config'

function SplitHousehold() {
  const { id } = useParams()

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [isError, setIsError] = useState(false)

  const leftColumns: ColumnsType<IResident> = [
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

  const rightColumns: ColumnsType<IResident> = [
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
      render: (_, record) => {
        if (record.id === newHousehold?.idChuHo) return <p>{'Chủ hộ'}</p>
        return (
          <Select
            placeholder="Quan hệ với chủ hộ"
            className="m-0 w-40"
            options={Object.values(householdRelationship).map(each => ({
              value: each,
              label: each
            }))}
            onSelect={value => {
              setNewHousehold({
                ...newHousehold,
                nhan_khaus: newHousehold.nhan_khaus?.map(resident => {
                  if (resident.id === record.id)
                    return {
                      ...resident,
                      pivot: { ...resident.pivot, quanHeVoiChuHo: value }
                    } as IResident
                  return resident
                })
              })
            }}
          />
        )
      }
    }
  ]

  const [isLoading, setIsLoading] = useState(false)

  const [household, getHouseholdById, splitHousehold] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById,
    state.splitHousehold
  ])

  const [residents, setResidents] = useState<IResident[]>([])
  const [newHousehold, setNewHousehold] = useState<IHousehold>({} as IHousehold)

  useEffect(() => {
    if (household && household.id !== parseInt(id as string)) getHouseholdById(id as string)
  }, [household, id])

  const onFinish = async (values: any) => {
    setIsLoading(true)
    const { lyDoChuyen, maHoKhau, maKhuVuc, diaChi } = values
    let isError = false
    let response: any
    try {
      response = splitHousehold(id as string, {
        idChuHo: newHousehold.idChuHo,
        maHoKhau,
        maKhuVuc,
        diaChi,
        nhanKhauMois: [
          ...newHousehold.nhan_khaus
            .map(resident => ({
              id: resident.id,
              quanHeVoiChuHo: resident.pivot?.quanHeVoiChuHo
            }))
            .filter(({ id }) => id !== newHousehold.idChuHo)
        ],
        lyDoChuyen
      })
      setNewHousehold({} as IHousehold)
      toast.success('Tách được rồi bé ơi', {
        toastId: 'split-household-successfully',
        icon: '👏'
      })
    } catch (error) {
      console.log('Tách hộ khẩu lỗi rồi bé ơi :(', error)
      isError = true
      toast.error('Tách hộ khẩu lỗi rồi bé ơi :(', {
        toastId: 'split-household-failed',
        icon: '😢'
      })
    } finally {
      setIsLoading(false)
      // if (!isError) navigate(`/ho-khau/${response.id}`)
    }
  }

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Tách hộ khẩu" type="create" />
        <Form form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
          <div className="flex justify-between gap-4">
            <EachHouseholdInfoDiv label="Thông tin hộ khẩu mới" className="w-2/5">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Mã hộ khẩu"
                  name="maHoKhau"
                  rules={[{ required: true, message: 'Mã hộ khẩu không được để trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mã KV"
                  name="maKhuVuc"
                  rules={[{ required: true, message: 'Mã KV không được để trống' }]}
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
                  name="lyDoChuyen"
                  rules={[{ required: true, message: 'Lý do chuyển đi không được để trống' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  disabled={isLoading}
                  size="large"
                  type="primary"
                  ghost
                  htmlType="submit"
                  className="mt-4"
                  block
                >
                  {isLoading ? <LoadingOutlined /> : 'Tách hộ khẩu'}
                </Button>
              </Form.Item>
            </EachHouseholdInfoDiv>
            <EachHouseholdInfoDiv label="Chủ hộ" className="w-3/5">
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
                columns={leftColumns}
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
                      chu_ho: residents.find(
                        resident => resident.id === selectedRow[0]
                      ) as IResident
                    })
                  },
                  selectedRowKeys: [newHousehold?.idChuHo]
                }}
                rowKey={record => record.id}
                columns={rightColumns}
                dataSource={newHousehold.nhan_khaus ?? []}
                pagination={false}
              />
            </div>
          </div>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default SplitHousehold
