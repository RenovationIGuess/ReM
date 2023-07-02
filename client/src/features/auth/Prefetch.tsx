import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useHouseholdStore } from '~/app/householdStore'
import { useResidentsStore } from '../residents/residentsStore'
import { useAuthStore } from './authStore'
import { useTemporaryStore } from '../temporary/temporaryStore'
import { useEffectOnce } from 'usehooks-ts'

const Prefetch = () => {
  const [getHouseholdByPage] = useHouseholdStore(state => [state.getHouseholdByPage])
  const [getResidents] = useResidentsStore(state => [state.getResidents])
  const [getCurrentUser] = useAuthStore(state => [state.getCurrentUser])
  const [getTamTrus, getTamVangs] = useTemporaryStore(state => [
    state.getTamTrus,
    state.getTamVangs
  ])

  useEffectOnce(() => {
    getHouseholdByPage({ page: 1, offset: 10 })
    getResidents()
    getTamTrus()
    getTamVangs()
    getCurrentUser()
  })

  return <Outlet />
}

export default Prefetch
