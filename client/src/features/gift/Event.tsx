import React from 'react'
import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'

const gridStyle: React.CSSProperties = {
	width: '240px',
	height: '252px',
};

const Event = (props: any) => {
	const navigate = useNavigate()
	const { eventId, title } = props
	return (
		<Col span={8} className='my-16'>
			<Card
				onClick={() => navigate(`/su-kien/${eventId}`)}
				hoverable
				style={gridStyle}
				cover={<img alt="example" src="https://media.istockphoto.com/id/628925698/vector/pile-of-hardcover-books.jpg?s=612x612&w=0&k=20&c=UskxzCZAQ4LXrgMhgW3M8Q5jdtWFPZ8WxwosF6h6euI=" />}
			>
				<Meta title={title} />
			</Card>
		</Col>

	)
}

export default Event