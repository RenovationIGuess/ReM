import React from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface DataType {
    key: string
    id: string
    mainName: string
    numOfChild: number
    total: number
}

const data: DataType[] = [
    {
        key: '1',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '2',
        id: '20202020',
        mainName: 'Bùi Đức Dũng',
        numOfChild: 2,
        total: 9000
    },
    {
        key: '3',
        id: '20202020',
        mainName: 'Trần Nhật Huy',
        numOfChild: 2,
        total: 8000
    },
    {
        key: '4',
        id: '20202020',
        mainName: 'Phạm Tiến Lộc',
        numOfChild: 3,
        total: 15000
    },
    {
        key: '5',
        id: '20202020',
        mainName: 'Lê Duy Thái',
        numOfChild: 1,
        total: 10000
    },
    {
        key: '6',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '7',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '8',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '9',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '10',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '11',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '12',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '13',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '14',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    },
    {
        key: '15',
        id: '20202020',
        mainName: 'Nguyễn Tùng Lâm',
        numOfChild: 3,
        total: 12000
    }
]

const StatisticTable = () => {
    const navigate = useNavigate()

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã hộ khẩu',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Tên chủ hộ',
            dataIndex: 'mainName',
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
            title: 'Số bé được nhận quà',
            dataIndex: 'numOfChild',
            key: 'numOfChild'

        },
        {
            title: 'Tổng giá trị',
            dataIndex: 'total',
            key: 'total'
        },
    ]
    return <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={data} />
}

export default StatisticTable