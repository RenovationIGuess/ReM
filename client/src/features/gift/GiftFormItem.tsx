import { Form, Input, InputNumber, Select, Typography } from "antd"
import { useEventStore } from "~/app/eventStore"
import { useEffect } from "react"
import achiveType from "./enums/achieveType"
import capHocType from "./enums/capHocType"

const { Title } = Typography

const GiftFormItem = (props: any) => {
    const { giftKey } = props
    const [items, getItems] = useEventStore(state => [
        state.items,
        state.getItems
    ])
    useEffect(() => {
        getItems()
    }, [])
    return (
        <div key={giftKey}>
            <Title level={4}>Phần quà {`${giftKey}`}</Title>
            <Form.Item
                name={`phan_thuongs[][thanhTichHocTap]`}
                label="Thành tích học tập"
                rules={[{ required: true, message: 'Hãy chọn thành tích', type: 'number' }]}
            >
                <Select>
                    {achiveType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                name={`phan_thuongs[][capHoc]`}
                label="Cấp học"
                rules={[{ required: true, message: 'Hãy chọn cấp học', type: 'number' }]}
            >
                <Select>
                    {capHocType.map((item) => <Select.Option value={item.enum} key={item.enum} id={item.enum}>{item.text}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                name={`phan_thuongs[][items[][idItem]]`}
                label="Vật phẩm" className='mt-4'
                rules={[{ required: true, message: 'Hãy chọn tên vật phẩm', type: 'number' }]}
            >
                <Select>
                    {items.map((item) => <Select.Option value={item.id} key={item.id} id={item.id}>{item.name}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                name={`phan_thuongs[][items[][soLuong]]`}
                label="Số lượng" className='mt-4'
                rules={[{ required: true, message: 'Hãy chọn số lượng', type: 'number' }]}
            >
                <InputNumber />
            </Form.Item>

        </div>
    )
}

export default GiftFormItem