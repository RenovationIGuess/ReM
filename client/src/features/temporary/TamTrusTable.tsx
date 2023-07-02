import React, { useEffect } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { useTemporaryStore } from './temporaryStore'

const TamTrusTable = () => {
  const navigate = useNavigate()
  const [tamtrus, total, currentPage, setCurrentPage] = useTemporaryStore(state => [
    state.tamtrus,
    state.totalTamtrus,
    state.currentTamTruPage,
    state.setCurrentTamTruPage
  ])

  const columns: ColumnsType<ITamTru> = [
    {
      title: 'Mã giấy tạm trú',
      dataIndex: 'maGiayTamTru',
      key: 'maGiayTamTru',
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
      title: 'Số điện thoại',
      dataIndex: 'soDienThoaiDangKy',
      key: 'soDienThoaiDangKy'
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

  if (!tamtrus) return <></>

  return (
    <Table
      columns={columns}
      dataSource={Array.from(tamtrus.values())}
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

export default React.memo(TamTrusTable)
