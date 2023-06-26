import {
  CaretUpOutlined,
  GiftFilled,
  GiftOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  MacCommandFilled,
  MacCommandOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Divider } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '~/assets/logo.png'

type SideButtonProps = {
  icon: React.ReactNode
  activedIcon: React.ReactNode
  text: string
  href: string
}

const SideButton = ({ icon, activedIcon, text, href }: SideButtonProps) => {
  const navigate = useNavigate()
  const isActive =
    useLocation().pathname.slice(1).split('/').includes(href.slice(1)) ||
    (useLocation().pathname === '/' && href === '/')

  return (
    <button
      className={
        isActive
          ? 'flex w-full items-center justify-start gap-4 rounded-md bg-btnActive py-2 ps-3 text-textPrimary transition-colors hover:bg-btnDefault'
          : 'flex w-full items-center justify-start gap-4 rounded-md py-2 ps-3 transition-colors hover:bg-btnDefault'
      }
      onClick={() => navigate(href)}
    >
      {isActive ? activedIcon : icon}
      <p className={`${isActive ? 'font-semibold' : 'font-medium'}`}>{text}</p>
    </button>
  )
}

const Sidebar = () => {
  return (
    <div className="flex h-full min-w-[13rem] max-w-[13rem] flex-col items-center justify-start gap-8 px-3 pt-8">
      <img className="w-3/5" src={Logo} alt="app logo" />
      <div className="flex w-full grow flex-col items-center justify-start gap-1">
        <SideButton
          icon={<MacCommandOutlined />}
          activedIcon={<MacCommandFilled />}
          text="Thống kê"
          href="/"
        />
        <SideButton
          icon={<TeamOutlined />}
          activedIcon={<TeamOutlined />}
          text="Hộ khẩu"
          href="/ho-khau"
        />
        <SideButton
          icon={<SolutionOutlined />}
          activedIcon={<SolutionOutlined />}
          text="Nhân khẩu"
          href="/nhan-khau"
        />
        <SideButton
          icon={<UserAddOutlined />}
          activedIcon={<UserAddOutlined />}
          text="Tạm trú tạm vắng"
          href="/tam-tru"
        />
        <SideButton
          icon={<GiftOutlined />}
          activedIcon={<GiftFilled />}
          text="Tặng quà"
          href="/su-kien"
        />
        <Divider className="m-0" />
        <SideButton
          icon={<InfoCircleOutlined />}
          activedIcon={<InfoCircleFilled />}
          text="Thông tin"
          href="/thong-tin"
        />
      </div>
      <div className="w-full">
        <Divider className="m-0" />
        <div className="flex w-full items-center justify-between py-3">
          <div className="flex grow items-center justify-start gap-4">
            <Avatar
              className="flex items-center justify-center"
              size={32}
              icon={<UserOutlined />}
            />
            <p className="font-medium">Admin</p>
          </div>
          <CaretUpOutlined />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
