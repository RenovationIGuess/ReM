import React, { useEffect, useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Form, Modal, InputNumber, DatePicker, Select, Typography, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import TabListEvent from '~/components/Layout/TabListEvent'
import Item from './Item'
import CreateItemFormModal from './modals/CreateItemFormModal'
import EditItemFormModal from './modals/EditItemFormModal'

const { Title } = Typography;


const ItemList = () => {
    const [page, setPage] = useState<Page>({ page: 1, offset: 10 })
    const [items, getItems] = useEventStore(state => [
        state.items,
        state.getItems
    ])
    const total = items.length
    const navigate = useNavigate()
    const { id } = useParams()
    const [openCreateItem, setOpenCreateItem] = useState(false);
    const [openEditItem, setOpenEditItem] = useState(false)

    const onCreate = async (values: any) => {
        console.log('Received values of form:', values);
        try {
            await axiosClient.post(`/items/create`, values)
            alert("Success")
            setOpenCreateItem(false)
        } catch (e) {
            const result = (e as Error).message;
            console.log(result)
        }
    };

    const onEditItem = async (values: IItem) => {
        try {
            await axiosClient.put(`/su-kien/${id}/edit`, values)
            alert("Update user successfully")
        } catch (err) {
            console.error(err)
        }
        console.log('Received values of form: ', values);
        setOpenEditItem(false)
    };
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    <Button
                        type="primary"
                        htmlType="button"
                        className='bg-primary'
                        style={{ color: 'white' }}
                        onClick={() => setOpenCreateItem(true)}
                    >
                        Thêm vật phẩm mới
                    </Button>
                    <CreateItemFormModal
                        open={openCreateItem}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpenCreateItem(false);
                        }}
                    />
                    {/* <EditItemFormModal
                        open={openEditItem}
                        onCreate={onEditItem}
                        onCancel={() => { setOpenEditItem(false) }}
                    /> */}
                </div>
                <TabListEvent defaultActiveKey='2' />
                <Row gutter={[16, 32]} className='mb-10'>
                    {
                        items.map((item) => (
                            <Item key={item.id} itemId={item.id} title={item.name} cost={item.unit_price} />
                        ))}
                </Row>
                <Pagination
                    defaultPageSize={10}
                    showSizeChanger={true}
                    pageSizeOptions={['10', '15', '20']}
                    style={{ float: 'right' }}
                    defaultCurrent={1}
                    total={total}
                    className='mt-10'
                    onChange={(page, pageSize) => {
                        setPage({ page, offset: pageSize })
                    }} />
            </div>
        </HomeLayout>
    )
}

export default ItemList