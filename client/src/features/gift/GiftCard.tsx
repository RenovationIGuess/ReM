import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta';
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface GiftCardProps {

}

const gridStyle: React.CSSProperties = {
    width: '280px',
    height: '500px',
};

const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '320px',
};

export const GiftCard = (props: any) => {
    const navigate = useNavigate()
    const { giftId, giftName, price, quantity, cost } = props
    return (
        <Col span={8} className='my-16'>
            <Card
                onClick={() => navigate(``)}
                hoverable
                style={gridStyle}
                cover={<img alt="example" src="https://media.istockphoto.com/id/628925698/vector/pile-of-hardcover-books.jpg?s=612x612&w=0&k=20&c=UskxzCZAQ4LXrgMhgW3M8Q5jdtWFPZ8WxwosF6h6euI=" style={imgStyle} />}
            >
                <Meta title={giftName} className='items-center justify-center' />
                <Meta title={`Đơn giá: ${price}`} className='items-center justify-center align-center' />
                <Meta title={`Số lượng đã phát: ${quantity}`} className='items-center justify-center align-center' />
                <Meta title={`Tổng tiền: ${cost}`} className='items-center justify-center align-center' />
            </Card>
        </Col>
    )
}