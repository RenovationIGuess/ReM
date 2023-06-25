import React from 'react'
import { Card, Col } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'

<<<<<<< HEAD
=======
interface EventProps {

}

>>>>>>> 2967e28... gift front end
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
				cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
			>
				<Meta title={title} />
			</Card>
		</Col>

	)
}

export default Event