import React from 'react'
import Level from './Level'
import HomeLayout from '~/components/Layout/HomeLayout'
import Gender from './Gender'
import Population from './Population'
import Age from './Age'
import { Carousel } from 'antd'
import Household from './Household'

type ChartWrapperPropsType = {
  className?: string
  title: string
  chart: React.ReactNode
}

const ChartWrapper = ({ className, title, chart }: ChartWrapperPropsType) => {
  return (
    <div className={`h-min rounded-md bg-bgPrimary p-3 shadow-sm ${className}`}>
      <p className="text-xl font-medium">{title}</p>
      {chart}
    </div>
  )
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

const Overview = () => {
  return (
    <HomeLayout>
      <div className="grid auto-rows-max grid-cols-4 gap-3">
        <div className="col-span-4 rounded-md bg-bgPrimary p-3 shadow-sm">
          <p className="text-xl">
            Chào mừng đến với, <span className="text-2xl font-semibold">Tổ dân phố số 7</span>
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2">
              <p className="mb-2">
                <span className="font-medium">🏫 Địa điểm: </span> Ban quản lý tổ dân phố 7 phường
                La Khê.
              </p>
              <p>
                <span className="font-medium">🖥 Mô tả: </span> Tổ dân phố 7 có hơn 400 hộ gia đình
                với 1.700 nhân khẩu, cùng với hàng trăm sinh viên thuê trọ và hàng chục gia đình nơi
                khác đến thuê nhà làm kinh doanh dịch vụ.
              </p>
            </div>
            <Carousel
              className="col-start-2 max-h-[15rem] min-h-[15rem] shadow-sm"
              effect="fade"
              autoplay
            >
              <div>
                <img
                  className="max-h-[15rem] min-h-[15rem] w-full rounded-md object-cover"
                  src="https://firebasestorage.googleapis.com/v0/b/resident-management-6208c.appspot.com/o/images%2Fbanner-1.jpg?alt=media&token=56ffea9e-de0b-4763-8361-1f09cf155136"
                />
              </div>
              <div>
                <img
                  className="max-h-[15rem] min-h-[15rem] w-full rounded-md object-cover"
                  src="https://firebasestorage.googleapis.com/v0/b/resident-management-6208c.appspot.com/o/images%2Fbanner-3.jpg?alt=media&token=1c9dc771-b7e9-4445-9583-7f3c4d665d80"
                />
              </div>
            </Carousel>
          </div>
        </div>

        <ChartWrapper className="col-span-2" title="Hộ khẩu: " chart={<Household />} />
        <ChartWrapper className="col-span-2" title="Nhân khẩu: " chart={<Population />} />
        <ChartWrapper className="col-span-2" title="Độ tuổi: " chart={<Age />} />
        <ChartWrapper title="Giới tính: " chart={<Gender />} />
        <ChartWrapper title="Trình độ học vấn: " chart={<Level />} />
      </div>
    </HomeLayout>
  )
}

export default Overview
