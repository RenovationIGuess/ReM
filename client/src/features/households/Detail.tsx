import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import { ArrowLeftOutlined, EditOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { useHouseholdStore } from '~/app/householdStore'
import { Avatar, Button, Input, Select, Space } from 'antd'

type HouseholdInfoItemProps = {
  label: string
  value?: React.ReactNode
  type?: 'detail' | 'edit'
}

type EachHouseholdInfoDivProps = {
  label: React.ReactNode
  className?: string
  children: React.ReactNode
}

type HouseholdMemberProps = {
  resident: IResident
  type?: 'detail' | 'edit'
}

export const HouseholdInfoItem = ({ label, value, type = 'detail' }: HouseholdInfoItemProps) => {
  return (
    <div>
      <p className="text-medium text-base text-noneSelected">{label}</p>
      {type === 'detail' ? (
        <p className={`text-base`}>{value ?? <span className="text-unknow">Chưa cập nhật</span>}</p>
      ) : (
        <Select
          className="w-full"
          placeholder="Quan hệ với chủ hộ"
          showSearch
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
      )}
    </div>
  )
}

export const EachHouseholdInfoDiv = ({ label, className, children }: EachHouseholdInfoDivProps) => {
  return (
    <div className={`mb-6 rounded-md border border-disabled p-4 ${className}`}>
      <p className="mb-2 text-lg font-medium">{label}</p>
      {children}
    </div>
  )
}

export const HouseholdMember = ({ resident, type = 'detail' }: HouseholdMemberProps) => {
  return (
    <div className="flex items-center justify-start gap-8">
      <Avatar className="flex items-center justify-center" size={100} icon={<UserOutlined />} />

      <div className="grid gap-2">
        <HouseholdInfoItem label="Họ và tên" value={resident.hoTen} />
        <HouseholdInfoItem
          label="Quan hệ với chủ hộ"
          type={type}
          value={resident.pivot?.quanHeVoiChuHo}
        />
      </div>
    </div>
  )
}

const Detail = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [household, getHouseholdById] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById
  ])

  useEffect(() => {
    getHouseholdById(id as string)
  }, [id])

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <button
            className="flex items-center justify-center gap-2 transition-colors hover:text-primary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined />
            <p>Trở về</p>
          </button>

          <>
            <Space>
              <Button
                type="primary"
                ghost
                color="#40A9FF"
                icon={<EditOutlined />}
                onClick={() => navigate(`/ho-khau/chinh-sua/${id}`)}
              >
                Chỉnh sửa
              </Button>
              <Button type="primary" ghost onClick={() => navigate(`/ho-khau/tach/${id}`)}>
                Tách hộ khẩu
              </Button>
            </Space>
          </>
        </div>
        {Object.keys(household).length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <LoadingOutlined className="text-4xl text-primary" />
          </div>
        ) : (
          <>
            <div className="flex justify-between gap-4">
              <EachHouseholdInfoDiv
                label={`Thông tin hộ khẩu - ${household.maHoKhau}`}
                className="w-2/4"
              >
                <div className="grid gap-4">
                  <HouseholdInfoItem label="Địa chỉ" value={household.diaChi} />
                  <HouseholdInfoItem label="Mã khu vực" value={household.maKhuVuc} />
                </div>
              </EachHouseholdInfoDiv>
              <EachHouseholdInfoDiv label="Chủ hộ" className="w-2/4">
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
                      value={household.chu_ho?.gioiTinh === 1 ? 'Nam' : 'Nữ'}
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
              </EachHouseholdInfoDiv>
            </div>
            <EachHouseholdInfoDiv label="Thành viên hộ khẩu">
              <div className="grid grid-cols-4 gap-6">
                {household.nhan_khaus.map(resident => (
                  <HouseholdMember resident={resident} />
                ))}
              </div>
            </EachHouseholdInfoDiv>
          </>
        )}
      </div>
    </HomeLayout>
  )
}

export default Detail
