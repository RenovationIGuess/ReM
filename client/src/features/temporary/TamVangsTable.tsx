import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useTemporaryStore } from './temporaryStore'

const TamVangsTable = () => {
  const navigate = useNavigate()
  const [tamvangs, total, currentPage, setCurrentPage] = useTemporaryStore(state => [
    state.tamvangs,
    state.totalTamvangs,
    state.currentPage,
    state.setCurrentPage
  ])

  const columns: ColumnsType<ITamVang> = [
    {
      title: 'Mã giấy tạm vắng',
      dataIndex: 'maGiayTamVang',
      key: 'maGiayTamVang',
      render: (text, record) => (
        <button
          className="transition-colors hover:text-primary"
          onClick={() => navigate(`/nhan-khau/${record.nhan_khau.id}`)}
        >
          {text}
        </button>
      )
    },
    {
      title: 'Họ và tên',
      key: 'hoTen',
      render: (text, record) => (
        <button
          className="transition-colors hover:text-primary"
          onClick={() => navigate(`/nhan-khau/${record.nhan_khau.id}`)}
        >
          {record.nhan_khau.hoTen}
        </button>
      )
    },
    {
      title: 'Nơi chuyển đến',
      dataIndex: 'noiTamTru',
      key: 'noiTamTru'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'tuNgay',
      key: 'tuNgay'
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'denNgay',
      key: 'denNgay'
    },
    {
      title: 'Lý do',
      dataIndex: 'lyDo',
      key: 'lyDo'
    }
  ]

  if (!tamvangs) return <></>

  return (
    <Table
      columns={columns}
      dataSource={Array.from(tamvangs.values())}
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

export default React.memo(TamVangsTable)
