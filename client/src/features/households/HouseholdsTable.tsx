import Table, { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useHouseholdStore } from '~/app/householdStore'

const HouseholdsTable = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState<Page>({ page: 1, offset: 10 })

  const [households, getHouseholdByPage] = useHouseholdStore(state => [
    state.households,
    state.getHouseholdByPage
  ])

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
        console.log(record.chu_ho)
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
    }
  ]

  return (
    <Table
      dataSource={households}
      columns={columns}
      scroll={{ y: 600 }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        total: 100,
        onChange: (page, pageSize) => {
          getHouseholdByPage({ page, offset: pageSize })
          setPage({ page, offset: pageSize })
        }
      }}
    />
  )
}

export default HouseholdsTable
