import React from 'react'
import { Button, Input, Statistic } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import ResidentsTable from './Table'
import { useNavigate } from 'react-router-dom'
import { useResidentsStore } from './residentsStore'

const List = () => {
  const navigate = useNavigate()

  const [total] = useResidentsStore(state => [state.total])

  return (
    <HomeLayout>
      <>{console.log('==> re-render')}</>
      <div className="h-max rounded bg-bgPrimary px-4 py-2 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
          <Button type="primary" ghost onClick={() => navigate('/nhan-khau/them')}>
            Thêm nhân khẩu mới
          </Button>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-medium">Danh sách nhân khẩu</p>
          <Statistic value={total ?? 0} />
        </div>
        <ResidentsTable />
      </div>
    </HomeLayout>
  )
}

export default List
