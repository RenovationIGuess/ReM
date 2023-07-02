import React, { useEffect } from 'react'
import { LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { EachHouseholdInfoDiv, HouseholdInfoItem, HouseholdMember } from './Detail'
import { Avatar, Button, Empty, Pagination, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'

type ChangeType = {
  truongThayDoi: string
  thayDoiTu: string
  thayDoiThanh: string
}

const FieldChangeMap: Map<string, string> = new Map([
  ['maKhuVuc', 'Mã khu vực'],
  ['diaChi', 'Địa chỉ'],
  ['idChuHo', 'Chủ hộ']
])

function ChangeLog() {
  const { id } = useParams()

  const [household, changeLog, total, getHouseholdById, getChangeLog] = useHouseholdStore(state => [
    state.household,
    state.changeLog,
    state.totalChangeLog,
    state.getHouseholdById,
    state.getChangeLog
  ])

  // change from data to changeLog
  const columns: ColumnsType<ChangeType> = [
    {
      title: 'Thông tin thay đổi',
      dataIndex: 'truongThayDoi',
      key: 'truongThayDoi',
      width: '22%'
    },
    {
      title: 'Thay đổi từ',
      dataIndex: 'thayDoiTu',
      key: 'thayDoiTu',
      render: (text, record) => (
        <div className="rounded-md p-1" style={{ backgroundColor: 'rgb(254 202 202)' }}>
          {record.truongThayDoi === 'Tách hộ khẩu' ? (
            <>
              {record.thayDoiTu.split(',').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </>
          ) : (
            text
          )}
        </div>
      ),
      width: '39%'
    },
    {
      title: 'Thay đổi thành',
      dataIndex: 'thayDoiThanh',
      key: 'thayDoiThanh',
      render: (text, record) => (
        <div className="rounded-md p-1" style={{ backgroundColor: 'rgb(187 247 208)' }}>
          {record.truongThayDoi === 'Tách hộ khẩu' ? (
            <>
              {record.thayDoiThanh.split(',').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </>
          ) : (
            text
          )}
        </div>
      ),
      width: '39%'
    }
  ]

  useEffect(() => {
    getHouseholdById(id as string)
    getChangeLog(id as string, { page: 1, offset: 2 })
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
              {changeLog.length === 0 ? (
                <Empty />
              ) : (
                <>
                  {changeLog.map((item, index) => {
                    let obj: any = {
                      thongTinThayDoi: item.thongTinThayDoi.split(';'),
                      thayDoiTu: item.thayDoiTu.split(';'),
                      thayDoiThanh: item.thayDoiThanh.split(';')
                    }

                    let changeLog: ChangeType[] = obj.thongTinThayDoi.map(
                      (change: string, index: number) => {
                        return {
                          truongThayDoi: FieldChangeMap.get(change) ?? 'Tách hộ khẩu',
                          thayDoiTu: obj.thayDoiTu[index],
                          thayDoiThanh: obj.thayDoiThanh[index]
                        }
                      }
                    )

                    return (
                      <div key={index} className="mb-2">
                        <li>
                          Thay đổi vào ngày{' '}
                          {new Intl.DateTimeFormat('vi-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }).format(new Date(item.ngayThayDoi))}{' '}
                          bởi {item.nguoi_thay_doi.name}
                        </li>
                        <Table columns={columns} dataSource={changeLog} pagination={false} />
                      </div>
                    )
                  })}
                  <Pagination
                    total={total}
                    pageSize={2}
                    onChange={value => {
                      getChangeLog(id as string, { page: value, offset: 2 })
                    }}
                  />
                </>
              )}
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
