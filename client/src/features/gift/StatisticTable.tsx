import React, { useEffect } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'

const StatisticTable = (props: any) => {
  const { event, statistics } = props
  const navigate = useNavigate()

  const columns: ColumnsType<IThongKeSuKien> = [
    {
      title: 'Mã hộ khẩu',
      dataIndex: 'maHoKhau',
      key: 'id'
    },
    {
      title: 'Tên chủ hộ',
      dataIndex: ['chu_ho', 'hoTen'],
      key: 'mainName',
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
      title: 'Tổng giá trị',
      dataIndex: 'totalCost',
      key: 'total',
      sorter: (a, b) => a.totalCost - b.totalCost
    },
    {
      title: 'Chi tiết',
      key: 'chiTiet',
      render: (_, record) => (
        <ul>
          {record.duocNhanThuongs?.map(child => (
            <li>
              {`${child.nhan_khau.hoTen}: `}
              {child.phan_thuong.items.map(item => (
                <h5>{`${item.name}: ${child.phan_thuong.count}`}</h5>
              ))}
            </li>
          ))}
        </ul>
      )
    }
  ]
  return <Table columns={columns} dataSource={statistics} />
}

export default StatisticTable
