import React from 'react'
import { Button, Space, Tabs, TabsProps } from 'antd'
import HomeLayout from '~/components/Layout/HomeLayout'
import TamTrusTable from './TamTrusTable'
import TamVangsTable from './TamVangsTable'
import { useNavigate } from 'react-router-dom'
import TamTruCreate from './TamTruCreate'
import TamVangCreate from './TamVangCreate'

const items: TabsProps['items'] = [
  {
    key: 'tam-tru',
    label: `Tạm trú`,
    children: <TamTrusTable />
  },
  {
    key: 'tam-vang',
    label: `Tạm vắng`,
    children: <TamVangsTable />
  }
]

const index = () => {
  const navigate = useNavigate()

  return (
    <HomeLayout>
      <div className="h-max rounded bg-bgPrimary px-4 py-2 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tạm trú - Tạm vắng</p>
          <Space>
            <TamTruCreate />

            <TamVangCreate />
          </Space>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </HomeLayout>
  )
}

export default index
