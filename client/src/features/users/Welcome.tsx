import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUsersQuery } from './usersApiSlice'

const Welcome = () => {
  const navigate = useNavigate()
  const [sendLogout] = useSendLogoutMutation()
  const accessToken = localStorage.getItem('accessToken')
  const { data: userData } = useGetCurrentUsersQuery('currentUser', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const onLogout = async () => {
    try {
      await sendLogout('logout')
      localStorage.removeItem('accessToken')
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DefaultLayout>
      <div className="w-[30vw] rounded-md bg-slate-600 p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-bold">Đăng nhập thành công:</p>
          <Tooltip title="Đăng xuất" className="flex items-center justify-center">
            <Button shape="circle" icon={<LogoutOutlined />} onClick={onLogout} />
          </Tooltip>
        </div>
        <>
          {userData && (
            <>
              <p>
                Tên đăng nhập: <span className="text-black">{userData.username}</span>
              </p>
              <p>
                Tên người dùng: <span className="text-black">{userData.name}</span>
              </p>
            </>
          )}
        </>
        <p className="break-words">
          Token: <span className="text-black">{accessToken?.slice(0, 55)}...</span>
        </p>
      </div>
    </DefaultLayout>
  )
}

export default Welcome
