import React from 'react'
import { Modal } from 'antd'

type PropsType = {
  title: string
  icon: React.ReactNode
  onOk: () => void
  onCancel?: () => void
}

export const showDeleteConfirm = ({ title, icon, onOk, onCancel }: PropsType) => {
  Modal.confirm({
    title,
    icon,
    okText: 'Xác nhận',
    okType: 'danger',
    cancelText: 'Hủy',
    centered: true,
    onOk,
    onCancel
  })
}
