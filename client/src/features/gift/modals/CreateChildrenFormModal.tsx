import { Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import { useParams } from "react-router-dom";
import achiveType from "../enums/achieveType";
import capHocType from "../enums/capHocType";
import { IDuocNhanThuong, IEvent } from "~/@types";

interface CollectionCreateChidrenProps {
    open: boolean;
    onCreate: (values: IDuocNhanThuong) => void;
    onCancel: () => void;
    event: IEvent
}

const CreateChildrenFormModal: React.FC<CollectionCreateChidrenProps> = ({
    open,
    onCreate,
    onCancel,
    event
}) => {
    const { id } = useParams()
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Thêm bé mới được nhận thưởng"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
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
                title="Thêm sự kiện"
                initialValues={{ modifier: 'public' }}
                className="grid auto-rows-max grid-cols-8"
            >
                <div className="col-span-6 col-start-1">
                    <Form.Item
                        name="tenTruong"
                        label="Tên trường"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên trường của bé' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenLop"
                        label="Tên Lớp"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy ghi tên lớp của bé' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="idNhanKhau"
                        label="Mã nhân khẩu"
                        labelCol={{ span: 8 }}
                        rules={[{ required: true, message: 'Hãy nhập mã nhân khẩu của bé là một số', type: 'number' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    {event.type ? (
                        <>
                            <Form.Item
                                label="Thành tích học tập"
                                name={'thanhTichHocTap'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập thành tích',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    {achiveType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Cấp học"
                                name={'capHoc'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập cấp học',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    {capHocType.map((item) => <Radio value={item.enum} key={item.enum}>{item.text ? item.text : "null"}</Radio>)}
                                </Radio.Group>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name='thanhTichHocTap'
                                hidden
                                initialValue={0}
                            >
                                <InputNumber defaultValue={0} />
                            </Form.Item>

                            <Form.Item
                                name='capHoc'
                                hidden
                                initialValue={0}
                            >
                                <InputNumber defaultValue={0} />
                            </Form.Item>

                            <Form.Item
                                name='anhGiayKhen'
                                hidden
                                initialValue={("anhGiayKhen").toString()}
                            >
                                <Input defaultValue={("anhGiayKhen").toString()} />
                            </Form.Item>
                        </>
                    )}
                </div>
            </Form>
        </Modal>
    )
}

export default CreateChildrenFormModal