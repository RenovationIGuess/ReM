import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import axiosClient from '~/app/axiosClient'


const ChildrenTable = (props: any) => {
    const navigate = useNavigate()
    const { eventId } = props

    const [page, setPage] = useState<Page>({ page: 1, offset: 10 })

    const [event, getEventById] = useEventStore(state => [
        state.event,
        state.getEventById
    ])

    useEffect(() => {
        getEventById(eventId ? eventId : '1')
    }, [])
    const total = event.duoc_nhan_thuongs.length
    const onDelete = (duocNhanThuongId: number) => {
        showDeleteConfirm({
            title: 'Bạn có chắc chắn muốn xóa bé khỏi sự kiện này không?',
            icon: <WarningFilled />,
            onOk: async () => {
                try {
                    await axiosClient.delete(`/duoc-nhan-thuong/${duocNhanThuongId}/delete`)
                    navigate(-1)
                } catch (e) {
                    const err = e as Error
                    console.log(err.message)
                    alert(err.message)
                }
            }
        })
    }
    const columns: ColumnsType<IDuocNhanThuong> = [
        {
            title: 'Mã nhân khẩu',
            dataIndex: 'idNhanKhau',
            key: 'idNhanKhau'
        },
        {
            title: 'Họ và tên',
            dataIndex: ["nhan_khau", "hoTen"],
            key: 'name',
            render: (text, record) => (
                <button
                    className="transition-colors hover:text-primary"
                    onClick={() => navigate(`/nhan-khau/${record.idNhanKhau}`)}
                >
                    {text}
                </button>
            )
        },
        {
            title: 'Giới tính',
            dataIndex: ["nhan_khau", "gioiTinh"],
            key: 'gender'
        },
        {
            title: 'Ngày sinh',
            dataIndex: ["nhan_khau", "ngaySinh"],
            key: 'dob'
        },
        {
            title: 'Trường',
            dataIndex: 'tenTruong',
            key: 'school'
        },
        {
            title: 'Lop',
            dataIndex: 'tenLop',
            key: 'clazz'
        },
        {
            title: 'Mã Phần quà',
            dataIndex: 'idPhanThuong',
            key: 'gifts'
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={() => navigate(`/nhan-khau/chinh-sua/${record.id}`)}
                        className="cursor-pointer text-primary"
                    />
                    <DeleteOutlined className="cursor-pointer text-danger" onClick={(e) => onDelete(record.id)} />
                </Space>
            )
        }
    ]

    return <Table
        columns={columns}
        dataSource={event.duoc_nhan_thuongs}
        pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20'],
            total: total,
            onChange: (page, pageSize) => {
                setPage({ page, offset: pageSize })
            }
        }}
    />
}

export default React.memo(ChildrenTable)
