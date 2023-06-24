import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import { EditOutlined } from '@ant-design/icons'

const HouseholdsTable = () => {
  const navigate = useNavigate()

  const [households, householdsTotal, currentPage, getHouseholdByPage] = useHouseholdStore(
    state => [state.households, state.householdsTotal, state.currentPage, state.getHouseholdByPage]
  )

  const columns: ColumnsType<IHousehold> = [
    {
      title: 'Mã hộ khẩu',
      dataIndex: 'maHoKhau',
      key: 'maHoKhau',
      render: (text, record) => (
        <button
          className="transition-color hover:text-primary"
          onClick={() => navigate(`/ho-khau/${record.id}`)}
        >
          {text}
        </button>
      )
    },
    {
      title: 'Tên chủ hộ',
      render: (_, record) => {
        return record.chu_ho?.hoTen
      }
    },
    {
      title: 'Số thành viên',
      key: 'soThanhVien',
      render: (_, record) => {
        return record.nhan_khaus.length
      }
    },
    {
      title: 'Mã khu vực',
      dataIndex: 'maKhuVuc',
      key: 'maKhuVuc'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
      render: value => {
        return new Date(value).toLocaleDateString()
      }
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <EditOutlined
          onClick={() => navigate(`/ho-khau/chinh-sua/${record.id}`)}
          className="cursor-pointer text-primary"
        />
      )
    }
  ]

  return (
    <Table
      rowKey={record => record.id}
      dataSource={households}
      columns={columns}
      scroll={{ y: 600 }}
      pagination={{
        current: currentPage.page,
        defaultPageSize: currentPage.offset,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        total: householdsTotal,
        onChange: (page, pageSize) => {
          getHouseholdByPage({ page, offset: pageSize })
        }
      }}
    />
  )
}

export default HouseholdsTable
