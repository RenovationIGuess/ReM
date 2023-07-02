import React, { useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Pagination, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '~/app/eventStore'
import TabListEvent from '~/components/Layout/TabListEvent'
import Item from './Item'
import { ToastContainer } from 'react-toastify'
import { useGetItemsByPageQuery } from './api/items.slice'
import { useEffectOnce } from 'usehooks-ts'

const ItemList = () => {
  const [page, setPage] = useState<Page>({ page: 1, offset: 10 })
  const { data: giftsData } = useGetItemsByPageQuery(page)
  const [items, getItems] = useEventStore(state => [state.items, state.getItems])
  const navigate = useNavigate()

  useEffectOnce(() => {
    getItems()
  })

  return (
    <HomeLayout>
      <div className="mb-2 flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
          <Button type="primary" ghost htmlType="button" onClick={() => navigate(`/items/create/`)}>
            Thêm vật phẩm mới
          </Button>
        </div>
        <TabListEvent defaultActiveKey="2" />
        <div className="grid grid-cols-4 gap-4">
          {items?.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        <Pagination
          defaultPageSize={8}
          showSizeChanger={true}
          pageSizeOptions={['8', '12', '16']}
          style={{ float: 'right' }}
          defaultCurrent={1}
          total={giftsData?.data.total}
          className="mx-4 mt-4 flex items-center justify-end"
          onChange={(page, pageSize) => {
            setPage({ page, offset: pageSize })
          }}
        />
      </div>
      <ToastContainer />
    </HomeLayout>
  )
}

export default ItemList
