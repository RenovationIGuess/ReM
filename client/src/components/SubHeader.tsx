import React from 'react'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd'

type PropsType = {
  title: string
  type: 'create' | 'detail'
  onEdit?: () => void
  onDelete?: () => void
}

const SubHeader = ({ title, type, onEdit, onDelete }: PropsType) => {
  const navigate = useNavigate()

  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        className="flex items-center justify-center gap-2 transition-colors hover:text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined />
        <p>Trở về</p>
      </button>

      <>
        {type === 'create' ? (
          <p className="text-xl font-medium">{title}</p>
        ) : (
          <Space>
            <Button type="primary" ghost color="#40A9FF" icon={<EditOutlined />} onClick={onEdit}>
              Chỉnh sửa
            </Button>
            <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={onDelete}>
              Xóa
            </Button>
          </Space>
        )}
      </>
    </div>
  )
}

export default SubHeader
