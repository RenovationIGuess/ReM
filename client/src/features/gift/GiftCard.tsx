import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const gridStyle: React.CSSProperties = {
  width: '280px',
  height: '500px'
}

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '320px'
}

export const GiftCard = (props: any) => {
  const navigate = useNavigate()
  const { giftId, giftName, price, quantity, cost, image_url } = props
  return (
    <div>
      <Card
        onClick={() => navigate(``)}
        hoverable
        style={gridStyle}
        cover={
          <img
            alt="example"
            src={
              image_url ??
              'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
            }
            style={imgStyle}
          />
        }
      >
        <Meta title={giftName} className="items-center justify-center" />
        <Meta title={`Đơn giá: ${price}`} className="align-center items-center justify-center" />
        <Meta
          title={`Số lượng đã phát: ${quantity}`}
          className="align-center items-center justify-center"
        />
        <Meta
          title={`Tổng tiền: ${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(cost ?? 0)}`}
          className="align-center items-center justify-center"
        />
      </Card>
    </div>
  )
}
