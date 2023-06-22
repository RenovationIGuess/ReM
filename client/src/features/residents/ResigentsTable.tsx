import React, { useState } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useGetResidentsByPageQuery } from './api/residentsApiSlice'

const ResigentsTable = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState<Page>({ page: 1, offset: 10 })
  const { data: residentsData } = useGetResidentsByPageQuery(page)

  const columns: ColumnsType<IResident> = [
    {
      title: 'Mã nhân khẩu',
      dataIndex: 'maNhanKhau',
      key: 'maNhanKhau'
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
        <Space size="middle">
          <EditOutlined
            onClick={() => navigate(`/nhan-khau/chinh-sua/${record.id}`)}
            className="cursor-pointer text-primary"
          />
          <DeleteOutlined className="cursor-pointer text-danger" />
        </Space>
      )
    }
  ]

  return (
    <Table
      rowSelection={{ type: 'checkbox' }}
      columns={columns}
      dataSource={residentsData?.data.data}
      scroll={{ y: 600 }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        total: residentsData?.data.total,
        onChange(page, pageSize) {
          setPage({ page, offset: pageSize })
        }
      }}
    />
  )
}

export default React.memo(ResigentsTable)
