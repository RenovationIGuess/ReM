import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { useAuthStore } from './authStore'

const Prefetch = () => {
  const [getHouseholdByPage] = useHouseholdStore(state => [state.getHouseholdByPage])
  const [getResidents] = useResidentsStore(state => [state.getResidents])
  const [getCurrentUser] = useAuthStore(state => [state.getCurrentUser])

  useEffect(() => {
    getHouseholdByPage({ page: 1, offset: 10 })
    getResidents()
    getCurrentUser()
  }, [getHouseholdByPage, getResidents, getCurrentUser])

  return <Outlet />
}

export default Prefetch
