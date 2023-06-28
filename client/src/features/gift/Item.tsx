import React, { useState } from 'react'
import { Button, Card, Col, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons';
import axiosClient from '~/app/axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import { useEventStore } from '~/app/eventStore';
import { showDeleteConfirm } from '~/components/ConfirmModal';

const gridStyle: React.CSSProperties = {
    width: '240px',
    height: '252px',
};


const Item = (props: any) => {
    const navigate = useNavigate()
    const { displayItem, setItem } = props
    const { itemId, title, cost } = props
    const [openEditItem, setOpenEditItem] = useState(false)
    const onEdit = (itemId: string | undefined) => {
        setOpenEditItem(true)
    }
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
        <Col span={8} className='my-16'>
            <Card
                hoverable
                style={gridStyle}
                cover={<img alt="example" src="https://media.istockphoto.com/id/628925698/vector/pile-of-hardcover-books.jpg?s=612x612&w=0&k=20&c=UskxzCZAQ4LXrgMhgW3M8Q5jdtWFPZ8WxwosF6h6euI=" />}
            >
                <Meta title={`Tên vật phẩm: ${title}`} />
                <Meta title={`Đơn giá: ${cost}`} />
                <Space>
                    <Button type="primary" className='mt-2' ghost color="#40A9FF" icon={<EditOutlined />} onClick={e => navigate(`/items/chinh-sua/${itemId}`)}>
                        Chỉnh sửa
                    </Button>
                    <Button type="primary" ghost danger icon={<DeleteOutlined />} onClick={(e) => onDelete(itemId)}>
                        Xóa
                    </Button>
                </Space>
            </Card>
            <ToastContainer />
        </Col>

    )
}

export default Item