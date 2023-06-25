import React, { useState } from 'react'
import { Button, Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons';
import EditItemFormModal from './modals/EditItemFormModal';
import axiosClient from '~/app/axiosClient';

const gridStyle: React.CSSProperties = {
    width: '240px',
    height: '252px',
};

const Item = (props: any) => {
    const navigate = useNavigate()
    const { itemId, title, cost } = props
    const [openEditItem, setOpenEditItem] = useState(false)
    const onEdit = (itemId: string | undefined) => {
        setOpenEditItem(true)
    }
    const onEditItem = async (values: IItem) => {
        try {
            await axiosClient.put(`/items/${itemId}/edit`, values)
            alert("Update user successfully")
        } catch (err) {
            console.error(err)
        }
        console.log('Received values of form: ', values);
        setOpenEditItem(false)
    };
    return (
        <Col span={8} className='my-16'>
            <EditItemFormModal
                open={openEditItem}
                onCreate={onEditItem}
                onCancel={() => { setOpenEditItem(false) }}
                itemId={itemId}
            />
            <Card
                hoverable
                style={gridStyle}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title={`Tên vật phẩm: ${title}`} />
                <Meta title={`Đơn giá: ${cost}`} />
                <Button type="primary" ghost color="#40A9FF" icon={<EditOutlined />} onClick={e => onEdit(itemId)}>
                    Chỉnh sửa
                </Button>
            </Card>
        </Col>

    )
}

export default Item