import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'
import { toast } from 'react-toastify'

const Create = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)

  const [residents, filterResidents] = useResidentsStore(state => [
    state.searchResult,
    state.searchResident
  ])

  const [createHousehold] = useHouseholdStore(state => [state.createHousehold])

  const [newHousehold, setNewHousehold] = useState<IHousehold>({
    nhan_khaus: [] as IResident[]
  } as IHousehold)

  useEffect(() => {
    filterResidents('')
  }, [])

  const onFinish = async (values: any) => {
    setIsLoading(true)
    try {
      const { maHoKhau, idChuHo, maKhuVuc, diaChi, nhanKhaus } = values

      let data = {
        maHoKhau,
        idChuHo,
        maKhuVuc,
        diaChi,
        nhanKhaus: [] as { id: number; quanHeVoiChuHo: string }[]
      }

      nhanKhaus.forEach((resident: any) => {
        let quanHe = form.getFieldValue(`quanHe-${resident}`)
        data.nhanKhaus.push({ id: resident, quanHeVoiChuHo: quanHe })
      })
      // await createHousehold({
      //   maHoKhau,
      //   idChuHo,
      //   maKhuVuc,
      //   diaChi,
      //   nhanKhaus: [...nhanKhaus, idChuHo],
      //   ngayLap: new Date().toISOString().split('T')[0]
      // })
      // setNewHousehold({ nhan_khaus: [] as IResident[] } as IHousehold)
      // toast.success('Thêm hộ khẩu thành công', {
      //   toastId: 'create-household-successfully',
      //   icon: '👏'
      // })
      console.log(data)
    } catch (error) {
      console.log('Them ho khau loi r be oi :_(', error)
      toast.error('Thêm hộ khẩu lỗi rồiiiiii', {
        toastId: 'create-household-failed',
        icon: '😢'
      })
    } finally {
      setIsLoading(false)
      // form.resetFields()
      // setNewHousehold({ nhan_khaus: [] as IResident[] } as IHousehold)
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Thêm mới hộ khẩu" type="create" />
        <Form form={form} autoComplete="off" onFinish={onFinish} layout="vertical">
          <div className="flex justify-between gap-4">
            <EachHouseholdInfoDiv label="Thêm mới hộ khẩu" className="w-2/5">
              <div className="flex justify-between gap-2">
                <Form.Item
                  className="w-2/5"
                  label="Mã hộ khẩu"
                  name="maHoKhau"
                  rules={[{ required: true, message: 'Mã hộ khẩu không được để trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="w-1/5"
                  label="Mã KV"
                  name="maKhuVuc"
                  rules={[{ required: true, message: 'Mã KV không được để trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="w-2/5"
                  label="Chủ hộ"
                  name="idChuHo"
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
                      setNewHousehold({
                        ...newHousehold,
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
              <Form.Item label="Thêm nhân khẩu" name="nhanKhaus">
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
                    setNewHousehold({
                      ...newHousehold,
                      nhan_khaus: [
                        ...newHousehold.nhan_khaus,
                        residents.find(resident => resident.id === value) as IResident
                      ]
                    })
                  }}
                  onDeselect={value => {
                    setNewHousehold({
                      ...newHousehold,
                      nhan_khaus: newHousehold.nhan_khaus.filter(resident => resident.id !== value)
                    })
                  }}
                />
              </Form.Item>
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
                  {isLoading ? <LoadingOutlined /> : 'Tạo hộ khẩu'}
                </Button>
              </Form.Item>
            </EachHouseholdInfoDiv>
            <EachHouseholdInfoDiv label="Chủ hộ" className="w-3/5">
              {newHousehold?.chu_ho ? (
                <>
                  <div className="flex items-center justify-start gap-8">
                    <Avatar
                      className="flex items-center justify-center"
                      size={128}
                      icon={<UserOutlined />}
                    />

                    <div className="grid h-full grow grid-cols-2 gap-4">
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
                <Empty />
              )}
              <div className={`mt-6 rounded-md`}>
                <p className="mb-2 text-lg font-medium">Thành viên hộ khẩu</p>
                {newHousehold.nhan_khaus.length > 0 ? (
                  <div className="grid max-h-[500px] grid-cols-2 gap-y-2 overflow-y-scroll">
                    {newHousehold.nhan_khaus?.map(resident => (
                      <div
                        key={resident.id}
                        className="flex w-full items-center justify-start gap-8"
                      >
                        <Avatar
                          className="flex items-center justify-center"
                          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                          icon={<UserOutlined />}
                        />

                        <div className="grid gap-2">
                          <HouseholdInfoItem label="Họ và tên" value={resident.hoTen} />
                          <>
                            <p className="text-medium text-base text-noneSelected">
                              Quan hệ với chủ hộ
                            </p>
                            <Form.Item
                              name={`quanHe-${resident.id}`}
                              rules={[{ required: true, message: 'QHCH không được trống' }]}
                            >
                              <Select
                                className="w-[168px]"
                                options={[
                                  { value: 'Con', label: 'Con' },
                                  { value: 'Vợ', label: 'Vợ' },
                                  { value: 'Chồng', label: 'Chồng' },
                                  { value: 'Bố', label: 'Bố' },
                                  { value: 'Mẹ', label: 'Mẹ' },
                                  { value: 'Ông', label: 'Ông' },
                                  { value: 'Bà', label: 'Bà' },
                                  { value: 'Cháu', label: 'Cháu' },
                                  { value: 'Anh', label: 'Anh' },
                                  { value: 'Chị', label: 'Chị' },
                                  { value: 'Em', label: 'Em' },
                                  { value: 'Phức tạp', label: 'Phức tạp' }
                                ]}
                              />
                            </Form.Item>
                          </>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
              </div>
            </EachHouseholdInfoDiv>
          </div>
        </Form>
      </div>
    </HomeLayout>
  )
}

export default Create
