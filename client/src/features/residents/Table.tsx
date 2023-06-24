import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useResidentsStore } from './residentsStore'

const ResidentsTable = () => {
  const navigate = useNavigate()
  const [residents, total, setCurrentPage] = useResidentsStore(state => [
    state.residents,
    state.total,
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
      key: 'gioiTinh'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh'
    },
    {
      title: 'Dân tộc',
      dataIndex: 'danToc',
      key: 'danToc'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChiHienTai',
      key: 'diaChiHienTai'
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
        <EditOutlined
          onClick={() => navigate(`/nhan-khau/chinh-sua/${record.id}`)}
          className="cursor-pointer text-primary"
        />
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
