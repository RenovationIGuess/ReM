import Table, { ColumnsType } from 'antd/es/table'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getGiftsSelector } from './gifts.slice'

export interface DataType {
    key: string
    id: string
    name: string
    price: number
    imageUrl: string
}

export const GiftTable = () => {
    const gifts = useSelector(getGiftsSelector)
    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã phần quà',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Tên quà',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá trị',
            dataIndex: 'price',
            key: 'price'

        }
    ]
    return <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={gifts} />
}