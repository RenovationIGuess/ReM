import React from 'react'
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button, Space } from 'antd'

type PropsType = {
  title: string
  type: 'create' | 'detail'
  editBtn?: React.ReactNode
  deleteBtn?: React.ReactNode
  tamTruBtn?: React.ReactNode
  tamVangBtn?: React.ReactNode
  onEdit?: () => void
  onDelete?: () => void
}

const SubHeader = ({
  title,
  type,
  tamTruBtn,
  tamVangBtn,
  editBtn,
  deleteBtn,
  onEdit,
  onDelete
}: PropsType) => {
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
            {editBtn ?? (
              <Button type="primary" ghost icon={<EditOutlined />} onClick={onEdit}>
                Chỉnh sửa
              </Button>
            )}

            {deleteBtn ?? (
              <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={onDelete}>
                Xóa
              </Button>
            )}

            {tamTruBtn ?? <></>}
            {tamVangBtn ?? <></>}
          </Space>
        )}
      </>
    </div>
  )
}

export default SubHeader
