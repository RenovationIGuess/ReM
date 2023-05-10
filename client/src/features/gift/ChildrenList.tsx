import { Button, Form, Input, InputNumber, Modal, Select, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import HomeLayout from '~/components/Layout/HomeLayout'
import { useNavigate, useParams } from 'react-router-dom'
import ChildrenTable from './ChildrenTable'
import TabList from '~/components/Layout/TabList'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getGiftsChildrenSelector, addGift, emptyGift } from './giftsChildren.slice'
import { useAppDispatch } from '~/hooks/useRedux'
import { getAddGiftDisabledSelector, setDisabled } from './disableAddGift.slice'
import { GiftType } from './giftsChildren.slice'
import { openSelector, setOpen } from './open.slice'
import { getGiftsSelector } from './gifts.slice'
import UploadImage from '~/components/UploadImage'


interface Values {
    id: string;
    gifts: { name: string, price: number }[];
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}


const GiftFormItem = (props: any) => {
    const giftsList = useSelector(getGiftsSelector)
    const { giftKey } = props
    return (
        <div key={giftKey}>
            <Form.Item
                name={`giftname-${giftKey}`}
                label="Tên phần quà"
                rules={[{ required: true, message: 'Hãy chọn phần quà', type: 'string' }]}
            >
                <Select>
                    {giftsList.map((gift: { name: string, price: number }, index: number) => <Select.Option value={gift.name} key={index} id={gift.name}>{gift.name}</Select.Option>)}
                </Select>
            </Form.Item>

            <Form.Item
                name={`quantity-${giftKey}`}
                label="Số lượng" className='mt-4'
                rules={[{ required: true, message: 'Hãy chọn số lượng được nhận', type: 'number' }]}
            >
                <InputNumber />
            </Form.Item>
        </div>
    )
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const giftsList = useSelector(getGiftsSelector)
    const achieveList = ['Giỏi', 'Khá', 'Trung bình']
    const [form] = Form.useForm();
    const [giftList, setGiftList] = useState<JSX.Element[]>([<GiftFormItem giftKey={1} giftData={giftsList} />])
    const [giftKey, setGiftKey] = useState(2)
    //const [disabled, setDisabled] = useState<boolean>(false)
    //const [gifts, setGifts] = useState<GiftType[]>(data)
    const gifts: GiftType[] = useSelector(getGiftsChildrenSelector)
    const disabled: boolean = useSelector(getAddGiftDisabledSelector)
    const openIn: boolean = useSelector(openSelector)
    const formRef: React.RefObject<any> | null = React.createRef();
    //const [disabled, setDisabled] = useState<boolean>(false)
    //const [openIn, setOpenIn] = useState<boolean>(open)
    const dispatch = useAppDispatch()
    //console.log(openIn)

    const onClickGiftAddBtn = (e: React.FormEvent) => {
        e.preventDefault
        const idValue = formRef.current.getFieldValue(`id`);
        const nameValue = formRef.current.getFieldValue(`giftname-${giftKey - 1}`);
        if (gifts.filter(gift => gift.name === nameValue).length > 0) {
            alert('Phần quà đã được thêm rồi. Không thể thêm nữa')
            return
        }
        const quantityValue = formRef.current.getFieldValue(`quantity-${giftKey - 1}`);
        dispatch(addGift({ id: idValue, name: nameValue, quantity: quantityValue }))
        setGiftKey(prev => prev + 1)
        setGiftList((prev: JSX.Element[]) => [...prev, <GiftFormItem giftKey={giftKey} />])
        console.log(gifts)
    }

    const onClickDoneBtn = (e: React.FormEvent) => {
        e.preventDefault
        const idValue = formRef.current.getFieldValue(`id`);
        const nameValue = formRef.current.getFieldValue(`giftname-${giftKey - 1}`);
        if (gifts.filter(gift => gift.name === nameValue).length > 0) {
            alert('Phần quà đã được thêm rồi. Không thể thêm nữa')
            return
        }
        const quantityValue = formRef.current.getFieldValue(`quantity-${giftKey - 1}`);
        dispatch(addGift({ id: idValue, name: nameValue, quantity: quantityValue }))
        dispatch(setDisabled(disabled))
        console.log(gifts)
    }


    return (
        <Modal
            open={openIn}
            title="Thêm bé được nhận quà"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                if (disabled) dispatch(setDisabled(disabled))
                dispatch(setOpen(false))
                dispatch(emptyGift())
                setGiftList([<GiftFormItem giftKey={1} giftData={giftsList} />])
            }}
            destroyOnClose={true}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                ref={formRef}
            >
                <Form.Item
                    name="id"
                    label="Nhập mã nhân khẩu của bé"
                    rules={[{ required: true, message: 'Hãy nhập mã nhân khẩu của bé', type: 'string' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="achieve"
                    label="Thành tích học tập"
                    rules={[{ required: true }]}
                >
                    <Select>
                        {achieveList.map((achieve: string, index: number) => <Select.Option value={index} key={index} id={index}>{achieve}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="image achieve"
                    label="Ảnh giấy khen"
                    rules={[{ required: true }]}
                >
                    <UploadImage />
                </Form.Item>


                {/* <Form.Item label="Tên phần quà">
                        <Select >
                            {data.map((gift) => <Select.Option value={gift.id}>{gift.name}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item name="quantity" label="Số lượng" className='mt-12'>
                        <InputNumber defaultValue={1} />
                    </Form.Item> */}
                {giftList}
            </Form>
            <Button disabled={disabled} type="primary" className='mt-8' onClick={onClickGiftAddBtn}>Add gift</Button>
            <Button style={{ backgroundColor: '#1677ff', color: 'white' }} type="primary" className='mt-8 ms-4' onClick={onClickDoneBtn}>Done</Button>
        </Modal>
    );
};

export const ChildrenList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    //const [openCreateChildren, setOpenCreateChildren] = useState(false);
    const openCreateChildren: boolean = useSelector(openSelector)


    const onCreate = (values: Values) => {
        console.log('Received values of form: ', values);
        dispatch(setOpen(false));
    };
    return (
        <HomeLayout>
            <div className="mb-2 flex min-h-full flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <ArrowLeftOutlined className='me-4 mb-2' onClick={() => navigate('/tang-qua')} />
                        <Input.Search className="w-[25vw]" placeholder="Tìm kiếm gì đó ..." />
                    </div>
                    <Button onClick={() => {
                        dispatch(setOpen(true))
                        console.log(openCreateChildren)
                    }}>Thêm bé mới</Button>
                    <CollectionCreateForm
                        open={openCreateChildren}
                        onCreate={onCreate}
                        onCancel={() => {
                            dispatch(setOpen(false));
                        }}
                    />
                </div>
                <TabList defaultActiveKey='1' eventId={id} />
                <div className="mt-2 h-full grow rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-2xl font-medium">Tết trung thu 1987 - Danh sách các bé nhận quà</p>
                        <Statistic value={112893} />
                    </div>
                    <ChildrenTable />
                </div>
            </div>
        </HomeLayout>
    )
}