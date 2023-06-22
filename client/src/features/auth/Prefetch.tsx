import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import store from '~/app/store'
import { useHouseholdStore } from '~/app/householdStore'

const Prefetch = () => {
  const [getHouseholdByPage] = useHouseholdStore(state => [state.getHouseholdByPage])

  useEffect(() => {
    getHouseholdByPage({ page: 1, offset: 10 })
  }, [getHouseholdByPage])

  return <Outlet />
}

export default Prefetch
