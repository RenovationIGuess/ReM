import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
  const location = useLocation()
  const token = localStorage.getItem('accessToken')

  return <>{token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}</>
}

export default RequireAuth
