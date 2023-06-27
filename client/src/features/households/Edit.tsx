import React, { useEffect, useState } from 'react'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty, Form, Input, Select } from 'antd'
import { useParams } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'

const initialRelation = (household: IHousehold) => {
  let obj = {
    idChuHo: household.chu_ho?.id,
    maHoKhau: household?.maHoKhau,
    maKhuVuc: household?.maKhuVuc,
    diaChi: household?.diaChi
  } as any

  household.nhan_khaus?.forEach(resident => {
    obj[`quanHe-${resident.id}`] = resident.pivot?.quanHeVoiChuHo
  })

  return obj
}

const Edit = () => {
  const { id } = useParams()
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState(false)

  const [householdData, getHouseholdById, updateHousehold] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById,
    state.updateHousehold
  ])

  const rules = {
    older: ['Ông', 'Bà', 'Bố', 'Mẹ'],
    younger: ['Con', 'Cháu', 'Anh', 'Chị', 'Em'],
    couple: ['Vợ', 'Chồng']
  }

  const [household, setHousehold] = useState<IHousehold>({} as IHousehold)
  const [relationOption, setRelationOption] = useState<{
    older: string[]
    younger: string[]
    couple: string[]
  }>(rules)

  useEffect(() => {
    getHouseholdById(id as string)
    setHousehold({ ...householdData })
  }, [householdData, id])

  const onFinish = async (values: any) => {
    // await updateHousehold({ ...householdData, ...values })
    console.log(values)
  }

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Cập nhật hộ khẩu" type="create" />
        {Object.keys(household).length === 0 ? (
          <LoadingOutlined className="text-4xl text-primary" />
        ) : (
          <Form
            initialValues={{
              ...initialRelation(household)
            }}
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
          >
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
                      options={household.nhan_khaus?.map(resident => ({
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
                          chu_ho: household?.nhan_khaus.find(
                            resident => resident.id === value
                          ) as IResident
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
                    {isLoading ? <LoadingOutlined /> : 'Cập nhật hộ khẩu'}
                  </Button>
                </Form.Item>
              </EachHouseholdInfoDiv>
              <EachHouseholdInfoDiv label="Chủ hộ" className="w-3/5">
                {household?.chu_ho ? (
                  <>
                    <div className="flex items-center justify-start gap-8">
                      <Avatar
                        className="flex items-center justify-center"
                        size={{ xs: 30.72, sm: 40.96, md: 51.2, lg: 81.92, xl: 102.4, xxl: 128 }}
                        icon={<UserOutlined />}
                      />

                      <div className="grid h-full grow grid-cols-2 gap-4">
                        <HouseholdInfoItem
                          label="Họ và tên chủ hộ"
                          value={household.chu_ho?.hoTen}
                        />
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
                  <Empty />
                )}
                <div className={`mt-6 rounded-md`}>
                  <p className="mb-2 text-lg font-medium">Thành viên hộ khẩu</p>
                  {household.nhan_khaus?.length > 0 ? (
                    <div className="grid max-h-[400px] grid-cols-2 gap-2 overflow-y-auto">
                      {household.nhan_khaus?.map(resident => (
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
                                  onSelect={value => {
                                    setHousehold({
                                      ...household,
                                      nhan_khaus: household.nhan_khaus.map(Tresident => {
                                        if (Tresident.id === resident.id) {
                                          return {
                                            ...Tresident,
                                            pivot: { ...Tresident.pivot, quanHeVoiChuHo: value }
                                          } as IResident
                                        }
                                        return Tresident
                                      })
                                    })
                                  }}
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
        )}
      </div>
    </HomeLayout>
  )
}

export default Edit
