import React, { useEffect, useState } from 'react'
import { Checkbox, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined, EyeOutlined, WarningFilled } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import axiosClient from '~/app/axiosClient'
import Title from 'antd/es/typography/Title'
import { PhanThuongDetailModal } from './modals/PhanThuongDetailModal'
import { render } from 'react-dom'


const ChildrenTable = (props: { eventId: string | undefined, event: IEvent }) => {
    const navigate = useNavigate()
    const { eventId, event } = props

    const [page, setPage] = useState<Page>({ page: 1, offset: 10 })

    const [openPhanThuongDetail, setOpenPhanThuongDetail] = useState(false)
    const [phanThuongId, setphanThuongId] = useState(44)
    const [phanThuong, setPhanThuong] = useState<IPhanThuongThongKe | undefined>()

    const onPhanThuongDetail = (duocNhanThuong: IPhanThuongThongKe | undefined) => {
        setOpenPhanThuongDetail(true)
        setPhanThuong(duocNhanThuong)
        console.log(duocNhanThuong)
    }

    const total = event.duoc_nhan_thuongs.length
    const [data, setData] = useState<IDuocNhanThuong[]>([])
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

    const handleRewarded = async (record: IDuocNhanThuong) => {
        const updatedData = data?.map((item) => {
            return item.id === record.id ? { ...item, hasRewarded: +!item.hasRewarded } : item
        }
        );
        setData(updatedData);
        try {
            await axiosClient.patch(`/duoc-nhan-thuong/${record.id}/${record.hasRewarded ? 'uncheck' : 'check'}`)
            record.hasRewarded ?
                alert(`Bé có mã được nhận thưởng ${record.id} đã chuyển sang trạng thái chưa nhận`) :
                alert(`Bé có mã được nhận thưởng ${record.id} đã chuyển sang trạng thái đã nhận`)
        } catch (err) {
            console.error(err)
        } finally {

        }
    }
    useEffect(() => {
        setData(event.duoc_nhan_thuongs)
    }, [event])
    console.log(data)
    const columns: ColumnsType<IDuocNhanThuong> = [
        {
            title: 'Mã nhận thưởng',
            dataIndex: 'id',
            key: 'id'
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
            key: 'gender',
            render: (_, record) => (
                <>{record.nhan_khau.gioiTinh === 1 ? 'Nam' : 'Nữ'}</>
            )
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
            key: 'gifts',
            render: (_, record) => (
                <Title level={5} onClick={(e) => onPhanThuongDetail(event.phan_thuongs.find((phan_thuong: IPhanThuongThongKe) => {
                    console.log(phan_thuong.id)
                    return phan_thuong.id === record.idPhanThuong
                }))}>{record.idPhanThuong}</Title>
            )
        },
        {
            title: 'Đã nhận',
            dataIndex: 'hasRewarded',
            render: (_, record) => (
                <input
                    type="checkbox"
                    checked={record.hasRewarded ? true : false}
                    onChange={() => handleRewarded(record)}
                />
            ),
        },
        {
            title: ' ',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.anhGiayKhen ? (
                        <a title='Ảnh giấy khen' target="_blank" href={record.anhGiayKhen}>
                            <EyeOutlined className="cursor-pointer text-primary" />
                        </a>
                    ) :
                        (<></>)
                    }
                    <EditOutlined
                        onClick={() => navigate(`/duoc-nhan-thuong/chinh-sua/${record.id}`)}
                        className="cursor-pointer text-primary"
                    />
                    <DeleteOutlined className="cursor-pointer text-danger" onClick={(e) => onDelete(record.id)} />
                </Space>
            )
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data?.length === 0 ? event.duoc_nhan_thuongs : data}
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
            <PhanThuongDetailModal
                open={openPhanThuongDetail}
                onOk={() => {
                    setOpenPhanThuongDetail(false)
                }}
                onCancel={() => {
                    setOpenPhanThuongDetail(false)
                }}
                phan_thuong={phanThuong} />
        </>
    )
}

export default React.memo(ChildrenTable)
