import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '~/features/auth/authApiSlice'

const ButtonLogout = () => {
  const navigate = useNavigate()
  const [sendLogout] = useSendLogoutMutation()

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
    <Tooltip title="Đăng xuất" className="flex items-center justify-center">
      <Button shape="circle" icon={<LogoutOutlined />} onClick={onLogout} />
    </Tooltip>
  )
}

export default ButtonLogout
