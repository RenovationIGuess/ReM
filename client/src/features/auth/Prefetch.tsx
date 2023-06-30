import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { useAuthStore } from './authStore'
import { useTemporaryStore } from '../temporary/temporaryStore'

const Prefetch = () => {
  const [getHouseholdByPage] = useHouseholdStore(state => [state.getHouseholdByPage])
  const [getResidents] = useResidentsStore(state => [state.getResidents])
  const [getCurrentUser] = useAuthStore(state => [state.getCurrentUser])
  const [getTamTrus, getTamVangs] = useTemporaryStore(state => [
    state.getTamTrus,
    state.getTamVangs
  ])

  useEffect(() => {
    getHouseholdByPage({ page: 1, offset: 10 })
    getResidents()
    getTamTrus()
    getTamVangs()
    getCurrentUser()
  }, [getHouseholdByPage, getResidents, getCurrentUser, getTamTrus])

  return <Outlet />
}

export default Prefetch
