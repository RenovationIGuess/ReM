import React, { useEffect } from 'react'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'
import { Avatar, Button, Empty, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'

type ChangeLogType = {
  truongThayDoi: string
  thayDoiTu: string
  thayDoiDen: string
}

function ChangeLog() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [household, getHouseholdById] = useHouseholdStore(state => [
    state.household,
    state.getHouseholdById
  ])

  const data = [
    {
      idHoKhau: 1,
      thongTinThayDoi: 'idChuHo;diaChi;maKhuVuc',
      thayDoiTu: 'idChuHo: 3;diaChi: A;maKhuVuc: B',
      thayDoiDen: 'idChuHo: 4;diaChi: B;maKhuVuc: C',
      ngayThayDoi: new Date(),
      idNguoiThayDoi: 1
    },
    {
      idHoKhau: 1,
      thongTinThayDoi: 'idChuHo;diaChi',
      thayDoiTu: 'idChuHo: 3;diaChi: A',
      thayDoiDen: 'idChuHo: 4;diaChi: B',
      ngayThayDoi: new Date(),
      idNguoiThayDoi: 2
    }
  ]

  // change from data to changeLog

  const columns: ColumnsType<ChangeLogType> = [
    {
      title: 'Thông tin thay đổi',
      dataIndex: 'truongThayDoi',
      key: 'truongThayDoi'
    },
    {
      title: 'Thay đổi từ',
      dataIndex: 'thayDoiTu',
      key: 'thayDoiTu',
      render: text => (
        <Tag className="text-sm" color="volcano">
          {text}
        </Tag>
      )
    },
    {
      title: 'Thay đổi đến',
      dataIndex: 'thayDoiDen',
      key: 'thayDoiDen',
      render: text => (
        <Tag className="text-sm" color="green">
          {text}
        </Tag>
      )
    }
  ]

  useEffect(() => {
    getHouseholdById(id as string)
  }, [id])

  return (
    <HomeLayout>
      <div className="w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title="Lịch sử sửa đổi" type="create" />
        {Object.keys(household).length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <LoadingOutlined className="text-4xl text-primary" />
          </div>
        ) : (
          <div className="flex justify-between gap-4">
            <EachHouseholdInfoDiv
              label={`Lịch sử thay đổi - ${household.maHoKhau}`}
              className="w-2/4"
            >
              {data.map((item, index) => {
                let obj: any = {
                  ...item,
                  thongTinThayDoi: item.thongTinThayDoi.split(';'),
                  thayDoiTu: item.thayDoiTu.split(';'),
                  thayDoiDen: item.thayDoiDen.split(';')
                }

                let changeLog: ChangeLogType[] = []

                obj.thongTinThayDoi.forEach((itemT: string, indexT: number) => {
                  changeLog.push({
                    truongThayDoi: itemT,
                    thayDoiTu: obj.thayDoiTu[indexT],
                    thayDoiDen: obj.thayDoiDen[indexT]
                  })
                })

                return (
                  <div key={index} className="mb-2">
                    <li>
                      Thay đổi vào ngày{' '}
                      {new Intl.DateTimeFormat('vi-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(item.ngayThayDoi)}{' '}
                      bởi nhân khẩu có id là {item.idNguoiThayDoi}
                    </li>
                    <Table columns={columns} dataSource={changeLog} pagination={false} />
                  </div>
                )
              })}
            </EachHouseholdInfoDiv>
            <div className="w-2/4">
              <EachHouseholdInfoDiv
                label={`Thông tin hộ khẩu - ${household.maHoKhau}`}
                className="w-full"
              >
                <div className={`grid gap-4 ${household.lyDoChuyen ? 'grid-cols-2' : ''}`}>
                  <HouseholdInfoItem label="Địa chỉ" value={household.diaChi} />
                  {household.lyDoChuyen && (
                    <HouseholdInfoItem label="Lý do chuyển đi" value={household.lyDoChuyen} />
                  )}
                  <HouseholdInfoItem label="Mã khu vực" value={household.maKhuVuc} />
                </div>
              </EachHouseholdInfoDiv>
              <EachHouseholdInfoDiv label="Chủ hộ" className="w-full">
                <div className="flex items-center justify-start gap-8">
                  <Avatar
                    className="flex items-center justify-center"
                    size={128}
                    icon={<UserOutlined />}
                  />

                  <div className="grid h-full grow grid-cols-2 gap-4">
                    <HouseholdInfoItem label="Họ và tên chủ hộ" value={household.chu_ho.hoTen} />
                    <HouseholdInfoItem
                      label="Giới tính"
                      value={household.chu_ho.gioiTinh == 1 ? 'Nam' : 'Nữ'}
                    />
                    <HouseholdInfoItem
                      label="Ngày sinh"
                      value={
                        household.chu_ho.ngaySinh &&
                        new Intl.DateTimeFormat('vi-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).format(new Date(household.chu_ho.ngaySinh))
                      }
                    />
                    <HouseholdInfoItem label="Bí danh" value={household.chu_ho.biDanh} />
                  </div>
                </div>
              </EachHouseholdInfoDiv>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  )
}

export default ChangeLog
