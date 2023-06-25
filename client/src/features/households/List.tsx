import React from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
import { Button, Input, Statistic } from 'antd'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import HouseholdsTable from './Table'
import { useHouseholdStore } from '~/app/householdStore'
=======
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import HouseholdsTable from './HouseholdsTable'
>>>>>>> 7753122... create household CRUD ui
=======
import { Button, Input, Statistic } from 'antd'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '~/components/Layout/HomeLayout'
import HouseholdsTable from './Table'
import { useHouseholdStore } from '~/app/householdStore'
>>>>>>> 6218c52... household crud feature

const List = () => {
  const navigate = useNavigate()

<<<<<<< HEAD
<<<<<<< HEAD
  const householdsTotal = useHouseholdStore(state => state.householdsTotal)

=======
>>>>>>> 7753122... create household CRUD ui
=======
  const householdsTotal = useHouseholdStore(state => state.householdsTotal)

>>>>>>> 6218c52... household crud feature
  return (
    <HomeLayout>
      <div className="h-max rounded bg-bgPrimary px-4 py-2 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
          <Button type="primary" ghost onClick={() => navigate('/ho-khau/them')}>
            Thêm hộ khẩu mới
          </Button>
        </div>
<<<<<<< HEAD
        <div className="mt-2 grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl font-medium">Danh sách hộ khẩu</p>
<<<<<<< HEAD
<<<<<<< HEAD
            <Statistic value={householdsTotal} />
=======
            <Statistic value={112893} />
>>>>>>> 7753122... create household CRUD ui
=======
            <Statistic value={householdsTotal} />
>>>>>>> 6218c52... household crud feature
          </div>
          <HouseholdsTable />
=======
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-medium">Danh sách hộ khẩu</p>
          <Statistic value={householdsTotal} />
>>>>>>> f274461... fix(client): update crud nhan-khau
        </div>
        <HouseholdsTable />
      </div>
    </HomeLayout>
  )
}

export default List
