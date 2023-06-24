import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useResidentsStore } from './residentsStore'
import { ApiOutlined, EditOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import Death from './Death'

type ResidentInfoItemProps = {
  label: string
  value?: React.ReactNode
}

type EachResidentInfoDivProps = {
  label: React.ReactNode
  className?: string
  children: React.ReactNode
}

const ResidentInfoItem = ({ label, value }: ResidentInfoItemProps) => {
  return (
    <div>
      <p className="text-medium mb-1 text-base text-noneSelected">{label}</p>
      <p className={`text-base`}>{value ?? <span className="text-unknow">Chưa cập nhật</span>}</p>
    </div>
  )
}

const EachResidentInfoDiv = ({ label, className, children }: EachResidentInfoDivProps) => {
  return (
    <div className={`mb-6 rounded-md border border-disabled p-4 ${className}`}>
      <p className="mb-2 text-lg font-medium">{label}</p>
      {children}
    </div>
  )
}

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [resident, getResidentById] = useResidentsStore(state => [
    state.resident,
    state.getResidentById
  ])

  useEffect(() => {
    getResidentById(id as string)
  }, [id])

  return (
    <HomeLayout>
      <div className="h-full w-full rounded-lg bg-bgPrimary px-4 py-3 shadow-md">
        <SubHeader
          title="Thêm mới nhân khẩu"
          type="detail"
          editBtn={
            resident.ghiChu && (
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => navigate(`/nhan-khau/chinh-sua/${resident.id}`)}
              >
                Chỉnh sửa thông tin giấy khai tử
              </Button>
            )
          }
          deleteBtn={resident.ghiChu ? <></> : <Death currnetResident={resident} />}
          onEdit={() => navigate(`/nhan-khau/chinh-sua/${id}`)}
        />

        {Object.keys(resident).length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <LoadingOutlined className="text-4xl text-primary" />
          </div>
        ) : (
          <>
            <EachResidentInfoDiv label={`Mã nhân khẩu - ${resident.maNhanKhau}`}>
              <div className="flex items-center justify-start gap-8">
                <Avatar
                  className="flex items-center justify-center"
                  size={128}
                  icon={<UserOutlined />}
                />

                <div className="grid h-full grow grid-cols-3 gap-4">
                  <ResidentInfoItem label="Họ và tên" value={resident.hoTen} />
                  <ResidentInfoItem label="Giới tính" value={resident.gioiTinh} />
                  <ResidentInfoItem
                    label="Ngày sinh"
                    value={
                      resident.ngaySinh &&
                      new Intl.DateTimeFormat('vi-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(new Date(resident.ngaySinh))
                    }
                  />
                  <ResidentInfoItem label="Bí danh" value={resident.biDanh} />
                  {resident.ghiChu && (
                    <ResidentInfoItem
                      label="Ghi chú"
                      value={<span className="font-semibold text-danger">{resident.ghiChu}</span>}
                    />
                  )}
                </div>
              </div>
            </EachResidentInfoDiv>

            <EachResidentInfoDiv label="Thông tin nơi ở">
              <div className="grid grid-cols-3 gap-4">
                <ResidentInfoItem label="Nơi sinh" value={resident.noiSinh} />
                <ResidentInfoItem label="Nguyên quán" value={resident.nguyenQuan} />
                <ResidentInfoItem label="Địa chỉ thường trú" value={resident.diaChiThuongTru} />
                <ResidentInfoItem label="Địa chỉ hiện tại" value={resident.diaChiHienTai} />
              </div>
            </EachResidentInfoDiv>

            <EachResidentInfoDiv label="Thông tin về công việc">
              <div className="grid grid-cols-3 gap-4">
                <ResidentInfoItem label="Trình độ học vấn" value={resident.trinhDoHocVan} />
                <ResidentInfoItem label="Nghề nghiệp" value={resident.ngheNghiep} />
                <ResidentInfoItem label="Nơi làm việc" value={resident.noiLamViec} />
              </div>
            </EachResidentInfoDiv>

            <EachResidentInfoDiv label="Thông tin khác">
              <div className="grid grid-cols-3 gap-4">
                <ResidentInfoItem label="Dân tộc" value={resident.danToc} />
                <ResidentInfoItem label="Tôn giáo" value={resident.tonGiao} />
                <ResidentInfoItem label="Quốc tịch" value={resident.quocTich} />
                <ResidentInfoItem label="Số hộ chiếu" value={resident.soHoChieu} />
              </div>
            </EachResidentInfoDiv>
          </>
        )}
      </div>
    </HomeLayout>
  )
}

export default Detail
