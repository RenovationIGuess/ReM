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
    school: string
    gifts: string
}

const data: DataType[] = [
    {
        key: '1',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '2',
        id: '20202020',
        name: 'Lê Duy Thái',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Trường Làng',
        gifts: 'Figure Hatsune Miku 1/10, Đĩa game Final Fantasy bản giới hạn'
    },
    {
        key: '3',
        id: '20202020',
        name: 'Bùi Đức Dũng',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '4',
        id: '20202020',
        name: 'Trần Nhật Huy',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Thẻ Roll ra SSR 100%'
    },
    {
        key: '5',
        id: '20202020',
        name: 'Phạm Tiến Lộc',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '6',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '7',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '8',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '9',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '10',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '11',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '12',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '13',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '14',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    },
    {
        key: '15',
        id: '20202020',
        name: 'Nguyễn Tùng Lâm',
        gender: 'Nam',
        dob: '2002-01-01',
        school: 'Havard',
        gifts: 'Nitendo Switch, Thẻ Roll ra SSR 100%'
    }
]

const ChildrenTable = () => {
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
            title: 'Trường lớp',
            dataIndex: 'school',
            key: 'school'
        },
        {
            title: 'Phần quà',
            dataIndex: 'gifts',
            key: 'gifts'
        }
    ]

    return <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={data} />
}

export default React.memo(ChildrenTable)
