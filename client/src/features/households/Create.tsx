import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'

const Create = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [residents, filterResidents] = useResidentsStore(state => [
    state.searchResult,
    state.searchResident
  ])

  const createHousehold = useHouseholdStore(state => state.createHousehold)

  const [household, setHousehold] = useState<IHousehold>({
    nhan_khaus: []
  } as unknown as IHousehold)

  useEffect(() => {
    filterResidents('')
  }, [])

  const onFinish = async (values: any) => {
    try {
      const { idChuHo, maKhuVuc, diaChi } = values
      createHousehold({
        idChuHo,
        maKhuVuc,
        diaChi,
        nhan_khaus: household.nhan_khaus.map(nhan_khau => nhan_khau.id)
      })
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Thêm mới hộ khẩu" type="create" />
        <Form className="" form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
          <div className="flex justify-between gap-4">
            <EachHouseholdInfoDiv label="Thêm mới hộ khẩu" className="w-2/4">
              <div className="grid grid-cols-3 gap-2">
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
                <Form.Item
                  label="Chủ hộ"
                  name="chuHo"
                  rules={[{ required: true, message: 'Chủ hộ không được để trống' }]}
                >
                  <Select
                    showSearch
                    onSearch={value => filterResidents(value)}
                    options={residents.map(resident => ({
                      value: resident.id,
                      label: resident.hoTen
                    }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onSelect={value => {
                      setHousehold({
                        ...household,
                        idChuHo: value,
                        chu_ho: residents.find(resident => resident.id === value) as IResident
                      })
                    }}
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="Địa chỉ"
                name="diaChi"
                rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Thêm nhân khẩu" name="nhan_khaus">
                <Select
                  className="h-full"
                  mode="multiple"
                  showSearch
                  onSearch={value => filterResidents(value)}
                  options={residents.map(resident => ({
                    value: resident.id,
                    label: resident.hoTen
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onFocus={() => filterResidents('')}
                  onSelect={value => {
                    setHousehold({
                      ...household,
                      nhan_khaus: [
                        ...household.nhan_khaus,
                        residents.find(resident => resident.id === value) as IResident
                      ]
                    })
                  }}
                  onDeselect={value => {
                    setHousehold({
                      ...household,
                      nhan_khaus: household.nhan_khaus.filter(resident => resident.id !== value)
                    })
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" ghost htmlType="submit" className="mt-4" block>
                  Thêm mới hộ khẩu
                </Button>
              </Form.Item>
            </EachHouseholdInfoDiv>
            <EachHouseholdInfoDiv label="Chủ hộ" className="w-2/4">
              {household?.chu_ho ? (
                <>
                  <div className="flex items-center justify-start gap-8">
                    <Avatar
                      className="flex items-center justify-center"
                      size={128}
                      icon={<UserOutlined />}
                    />

                    <div className="grid h-full grow grid-cols-3 gap-4">
                      <HouseholdInfoItem label="Họ và tên chủ hộ" value={household.chu_ho?.hoTen} />
                      <HouseholdInfoItem
                        label="Giới tính"
                        value={household.chu_ho?.gioiTinh == 1 ? 'Nam' : 'Nữ'}
                      />
                      <HouseholdInfoItem
                        label="Ngày sinh"
                        value={
                          household.chu_ho?.ngaySinh &&
                          new Intl.DateTimeFormat('vi-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }).format(new Date(household.chu_ho?.ngaySinh))
                        }
                      />
                      <HouseholdInfoItem label="Bí danh" value={household.chu_ho?.biDanh} />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {household.nhan_khaus.length > 0 ? (
                <div className={`mt-6 rounded-md`}>
                  <p className="mb-2 text-lg font-medium">Thành viên hộ khẩu</p>
                  <div className="grid max-h-[500px] grid-cols-2 gap-y-2 overflow-y-scroll">
                    {household.nhan_khaus?.map(resident => (
                      <HouseholdMember resident={resident} type="edit" />
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </EachHouseholdInfoDiv>
          </div>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default Create
