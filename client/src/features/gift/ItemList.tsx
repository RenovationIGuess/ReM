import React, { useEffect, useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Form, Modal, InputNumber, DatePicker, Select, Typography, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import TabListEvent from '~/components/Layout/TabListEvent'
import Item from './Item'
import { ToastContainer, toast } from 'react-toastify'
import { useGetItemsByPageQuery } from './api/items.slice'
import { Page, IItem } from '~/@types'
import { useEffectOnce } from 'usehooks-ts'

const { Title } = Typography;


const ItemList = () => {
    const [page, setPage] = useState<Page>({ page: 1, offset: 10 })
    const { data: giftsData } = useGetItemsByPageQuery(page)
    const [items, getItems] = useEventStore(state => [
        state.items,
        state.getItems
    ])
    const total = items.length
    const navigate = useNavigate()
    const { id } = useParams()
    const [openCreateItem, setOpenCreateItem] = useState(false);
    const [displayItem, setDisplayItem] = useState<IItem[]>([])
    useEffectOnce(() => {
        getItems()
        setDisplayItem(items)
    })
    console.log(giftsData)

    const onCreate = async (values: any) => {
        console.log('Received values of form:', values);
        try {
            await axiosClient.post(`/items/create`, values)
            setOpenCreateItem(false)
            setDisplayItem(prev => (
                [...prev, values]
            ))
            toast.success('Tạo vật phẩm thành công', {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (e) {
            const result = (e as Error).message;
            toast.error(result, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
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
                        onClick={(e) => navigate(`/items/create/`)}
                    >
                        Thêm vật phẩm mới
                    </Button>
                </div>
                <TabListEvent defaultActiveKey='2' />
                <Row gutter={[16, 32]} className='mb-10'>
                    {
                        giftsData?.data.data.map((item) => (
                            <Item items={displayItem} setItem={setDisplayItem} key={item.id} itemId={item.id} title={item.name} cost={item.unit_price} image_url={item.image_url} />
                        ))}
                </Row>
                <Pagination
                    defaultPageSize={10}
                    showSizeChanger={true}
                    pageSizeOptions={['10', '15', '20']}
                    style={{ float: 'right', marginTop: '70px' }}
                    defaultCurrent={1}
                    total={giftsData?.data.total}
                    onChange={(page, pageSize) => {
                        setPage({ page, offset: pageSize })
                    }} />
            </div>
            <ToastContainer />
        </HomeLayout>
    )
}

export default ItemList