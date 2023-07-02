import React, { useState } from 'react'
import { Button, Card, Col, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons'
import axiosClient from '~/app/axiosClient'
import { ToastContainer, toast } from 'react-toastify'
import { showDeleteConfirm } from '~/components/ConfirmModal'

type PropType = {
  item: IItem
}

const Item = ({ item }: PropType) => {
  const navigate = useNavigate()

  const onDelete = (itemId: number) => {
    showDeleteConfirm({
      title: 'Bạn có chắc chắn muốn xóa vật phẩm này không?',
      icon: <WarningFilled />,
      onOk: async () => {
        try {
          await axiosClient.delete(`/items/${itemId}/delete`)
          toast.success('Xóa bé thành công', {
            position: toast.POSITION.TOP_RIGHT
          })
          navigate(-1)
        } catch (e) {
          const err = e as Error
          console.log(err.message)
          toast.error((err as Error).message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      }
    })
  }

  return (
    <div className="relative rounded-md bg-bgPrimary shadow-sm transition-shadow hover:shadow-md">
      <button onClick={() => navigate(`/su-kien/${item.id}`)}>
        <img
          className="rounded-t-md object-contain"
          alt="example"
          src={
            item.image_url ??
            'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
          }
        />
        <div className="flex flex-col items-center justify-start gap-1 py-4">
          <p className="w-full truncate text-xl font-medium">{item.name}</p>
          <p className="w-full truncate text-lg text-noneSelected">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              item.unit_price ?? 0
            )}
          </p>
        </div>
      </button>
      <Space className="absolute right-2 top-2 gap-3">
        <EditOutlined
          className="text-xl text-primary"
          onClick={e => navigate(`/items/chinh-sua/${item.id}`)}
        />
        <DeleteOutlined className="text-xl text-danger" onClick={e => onDelete(item.id)} />
      </Space>
    </div>
  )
}

export default Item
