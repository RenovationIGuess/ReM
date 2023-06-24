import React from 'react'
import { Button, Input, Statistic } from 'antd'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import HouseholdsTable from './Table'
import { useHouseholdStore } from '~/app/householdStore'

const List = () => {
  const navigate = useNavigate()

  const householdsTotal = useHouseholdStore(state => state.householdsTotal)

  return (
    <HomeLayout>
      <div className="mb-2 flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
          <Button onClick={() => navigate('/ho-khau/them')}>Thêm hộ khẩu mới</Button>
        </div>
        <div className="mt-2 grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl font-medium">Danh sách hộ khẩu</p>
            <Statistic value={householdsTotal} />
          </div>
          <HouseholdsTable />
        </div>
      </div>
    </HomeLayout>
  )
}

export default List
