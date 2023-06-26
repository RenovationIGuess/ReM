import React from 'react'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useResidentsStore } from './residentsStore'
import { gender } from '~/app/config'

const ResidentsTable = () => {
  const navigate = useNavigate()
  const [residents, total, currentPage, setCurrentPage] = useResidentsStore(state => [
    state.residents,
    state.total,
    state.currentPage,
    state.setCurrentPage
  ])

  const columns: ColumnsType<IResident> = [
    {
      title: 'Mã nhân khẩu',
      dataIndex: 'maNhanKhau',
      key: 'maNhanKhau',
      render: (text, record) => (
        <button
          className="transition-colors hover:text-primary"
          onClick={() => navigate(`/nhan-khau/${record.id}`)}
        >
          {text}
        </button>
      )
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      render: (text, record) => (
        <button
          className="transition-colors hover:text-primary"
          onClick={() => navigate(`/nhan-khau/${record.id}`)}
        >
          {text}
        </button>
      )
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      render: (text, record) => <p>{gender[text]}</p>
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChiHienTai',
      key: 'diaChiHienTai'
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
      render: (text, record) => (
        <>
          {text === 'Đã qua đời' && <Tag color="volcano">{text}</Tag>}
          {text === 'Mới sinh' && <Tag color="green">{text}</Tag>}
          {!text && <p className="text-unknow">Không có</p>}
        </>
      )
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
        <button
          disabled={Boolean(record.duoc_khai_tu)}
          onClick={() => navigate(`/nhan-khau/chinh-sua/${record.id}`)}
        >
          <EditOutlined
            className={`cursor-pointer ${
              Boolean(record.duoc_khai_tu) ? 'text-unknow' : 'text-primary'
            }`}
          />
        </button>
      )
    }
  ]

  if (!residents) return <></>

  return (
    <Table
      columns={columns}
      dataSource={Array.from(residents.values())}
      pagination={{
        defaultPageSize: 10,
        defaultCurrent: currentPage ?? 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        total: total,
        onChange(page, pageSize) {
          setCurrentPage({ page, offset: pageSize })
        }
      }}
    />
  )
}

export default React.memo(ResidentsTable)
