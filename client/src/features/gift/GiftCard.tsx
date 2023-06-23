import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta';
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface GiftCardProps {

}

const gridStyle: React.CSSProperties = {
    width: '280px',
    height: '450px',
};

const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '320px',
};

export const GiftCard = (props: any) => {
    const navigate = useNavigate()
    const { giftId, giftName, price, imgUrl } = props
    return (
        <Col span={8} className='my-16'>
            <Card
                onClick={() => navigate(``)}
                hoverable
                style={gridStyle}
                cover={<img alt="example" src={imgUrl} style={imgStyle} />}
            >
                <Meta title={giftName} className='items-center justify-center' />
                <Meta title={`Price: ${price}`} className='items-center justify-center align-center' />
                <Meta title={`Gived amount: 100`} className='items-center justify-center align-center' />
            </Card>
        </Col>
    )
}