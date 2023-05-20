import React from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface DataType {
  key: string
  id: string
  name: string
  gender: string
  dob: string
  ethnic: string
  address: string
}

const data: DataType[] = [
  {
    key: '1',
    id: '20202020',
    name: 'Nguyễn Tùng Lâm',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '2',
    id: '20202020',
    name: 'Trần Nhật Huy',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '3',
    id: '20202020',
    name: 'Phạm Tiến Lộc',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '4',
    id: '20202020',
    name: 'Lê Duy Thái',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '5',
    id: '20202020',
    name: 'Bùi Đức Dũng',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '6',
    id: '20202020',
    name: 'Nguyễn Tùng Lâm',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '7',
    id: '20202020',
    name: 'Trần Nhật Huy',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '8',
    id: '20202020',
    name: 'Phạm Tiến Lộc',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '9',
    id: '20202020',
    name: 'Lê Duy Thái',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '10',
    id: '20202020',
    name: 'Bùi Đức Dũng',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '11',
    id: '20202020',
    name: 'Nguyễn Tùng Lâm',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '12',
    id: '20202020',
    name: 'Trần Nhật Huy',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '13',
    id: '20202020',
    name: 'Phạm Tiến Lộc',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '14',
    id: '20202020',
    name: 'Lê Duy Thái',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  },
  {
    key: '15',
    id: '20202020',
    name: 'Bùi Đức Dũng',
    gender: 'Nam',
    dob: '2002-01-01',
    ethnic: 'Kinh',
    address: '1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'
  }
]

const ResigentsTable = () => {
  const navigate = useNavigate()

  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã nhân khẩu',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob'
    },
    {
      title: 'Dân tộc',
      dataIndex: 'ethnic',
      key: 'ethnic'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
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

  return <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={data} />
}

export default React.memo(ResigentsTable)
