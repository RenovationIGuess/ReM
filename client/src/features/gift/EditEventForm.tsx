import React, { useEffect, useState } from 'react'
import {
  ExclamationCircleFilled,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { showDeleteConfirm } from '~/components/ConfirmModal'
import HomeLayout from '~/components/Layout/HomeLayout'
import SubHeader from '~/components/SubHeader'
import { useEventStore } from '~/app/eventStore'
import axiosClient from '~/app/axiosClient'
import achiveType from './enums/achieveType'
import capHocType from './enums/capHocType'
import UploadImage from '~/components/UploadImage'
import uploadFile from '~/firebase/uploadFile'
import { set } from 'immer/dist/internal'
import { RcFile } from 'antd/es/upload'
import { ToastContainer, toast } from 'react-toastify'
import { AxiosError, AxiosResponse } from 'axios'
import moment from 'moment'
import Title from 'antd/es/typography/Title'
import { useEffectOnce } from 'usehooks-ts'
import dayjs from 'dayjs'

type UploadFile = RcFile & { preview: string }

const EditEventForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState<string | undefined>('')
  const [ngayBatDau, setNgayBatDau] = useState<Date>(new Date())
  const [page, setPage] = useState<Page>({ page: 1, offset: 8 })
  const [type, setType] = useState<number | undefined>(0)
  const [initPhanThuong, setInitPhanThuong] = useState<IPhanThuongThongKe[]>()
  const [loading, setLoading] = useState(false)
  let duoc_nhan_thuongs: IDuocNhanThuong[] = []
  const [event, setEvent] = useState<IEvent>()
  const [form] = Form.useForm()
  const [itemsList, getItemsList] = useEventStore(state => [state.items, state.getItems])
  const fetchEvent = async () => {
    const response = await axiosClient.get(`/su-kien/${id}`)
    const dateFormat = 'YYYY-MM-DD'
    const data = {
      ...response.data,
      ngayBatDau: dayjs(response.data.ngayBatDau)
    }
    setEvent(data)
  }
  useEffect(() => {
    getItemsList(page)
    fetchEvent()
  }, [])
  useEffect(() => {
    form.setFieldsValue(event)
  }, [event, form])

  const onFinish = async (values: IEvent) => {
    setLoading(true)
    const inputDate = new Date(values.ngayBatDau)
    const formattedDate = moment(inputDate).format('YYYY-MM-DD')
    try {
      const updatedEvent = {
        ...values,
        type: event?.type,
        ngayBatDau: formattedDate
      }
      await axiosClient.put(`/su-kien/${id}/edit`, updatedEvent)
      toast.success('Cập nhật sự kiện thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
      setTimeout(() => {
        window.location.assign(`/su-kien/${event?.id}`)
      }, 3000)
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { success: boolean; message: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { success: boolean; message: string }
      const messageError = dataError2.message
      toast.error(messageError ? messageError : (error as Error).message, {
        position: toast.POSITION.TOP_RIGHT
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-full w-full rounded-lg bg-bgPrimary px-4 py-2 shadow-md">
        <SubHeader title={`Chỉnh sửa sự kiện mã ${event?.id}`} type="create" />
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          title="Chỉnh sửa sự kiện"
          onFinish={onFinish}
          initialValues={{ modifier: 'public', phan_thuongs: event?.phan_thuongs }}
          className="grid auto-rows-max grid-cols-8"
        >
          <div className="col-span-6 col-start-1">
            <Form.Item
              initialValue={event?.name}
              name="name"
              label="Tên sự kiện"
              labelCol={{ span: 8 }}
              rules={[{ required: true, message: 'Hãy ghi tên của sự kiện' }]}
            >
              <Input onChange={e => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="ngayBatDau"
              //valuePropName={'ngayBatDau'}
              // initialValue={moment(event?.ngayBatDau.toString() as string)}
              label="Ngày bắt đầu"
              labelCol={{ span: 8 }}
              rules={[{ required: true, message: 'Hãy chọn ngày bắt đầu của sự kiện' }]}
            >
              <DatePicker format={'YYYY-MM-DD'} picker="date" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Loại sự kiện"
              labelCol={{ span: 8 }}
              valuePropName="checked"
            >
              <Checkbox disabled defaultChecked={event?.type ? true : false}>
                Có liên quan đến học tập
              </Checkbox>
            </Form.Item>
            {event?.type ? (
              <>
                <Title level={3}>Các phần quà cho sự kiện</Title>
                <Form.List name="phan_thuongs">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <>
                          <hr
                            style={{
                              background: 'lime',
                              color: 'lime',
                              borderColor: 'lime',
                              height: '3px'
                            }}
                          />
                          <Form.Item key={key}>
                            <Form.Item hidden {...restField} name={[name, 'id']}>
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="Thành tích học tập"
                              name={[name, 'thanhTichHocTap']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Hãy nhập thành tích'
                                }
                              ]}
                            >
                              <Radio.Group>
                                {achiveType.map(item => (
                                  <Radio value={item.enum} key={item.enum}>
                                    {item.text ? item.text : 'null'}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              label="Cấp học"
                              name={[name, 'capHoc']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Hãy nhập cấp học'
                                }
                              ]}
                            >
                              <Radio.Group>
                                {capHocType.map(item => (
                                  <Radio value={item.enum} key={item.enum}>
                                    {item.text ? item.text : 'null'}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Form.Item>
                          <Title level={5}>Thêm các vật phẩm:</Title>
                          <Form.List name={[name, 'items']}>
                            {(items, { add, remove }) => {
                              return (
                                <div>
                                  {items.map(({ key, name, ...restField }) => (
                                    <Space key={key} align="start" className="mb-3">
                                      <Form.Item
                                        {...restField}
                                        name={[name, 'pivot', 'idItem']}
                                        rules={[{ required: true, message: 'Missing item name' }]}
                                      >
                                        <Select style={{ width: '200px' }}>
                                          {itemsList.map(item => (
                                            <Select.Option
                                              value={item.id}
                                              key={item.id}
                                              id={item.id}
                                            >
                                              {item.name}
                                            </Select.Option>
                                          ))}
                                        </Select>
                                      </Form.Item>
                                      <Form.Item
                                        {...restField}
                                        name={[name, 'pivot', 'soLuong']}
                                        rules={[{ required: true, message: 'Missing item name' }]}
                                      >
                                        <InputNumber />
                                      </Form.Item>

                                      <MinusCircleOutlined
                                        onClick={() => {
                                          remove(name)
                                        }}
                                      />
                                    </Space>
                                  ))}
                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => add()}
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Thêm vật phẩm
                                    </Button>
                                  </Form.Item>
                                </div>
                              )
                            }}
                          </Form.List>
                        </>
                      ))}
                      <hr
                        style={{
                          background: 'lime',
                          color: 'lime',
                          borderColor: 'lime',
                          height: '3px',
                          marginBottom: '30px'
                        }}
                      />
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Thêm phần quà
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </>
            ) : (
              <>
                <Form.List name="phan_thuongs">
                  {(fields, { add, remove }) => (
                    <>
                      <Title level={5}>Thêm các vật phẩm:</Title>
                      {fields.map(({ key, name, ...restField }) => (
                        <>
                          <Form.Item hidden {...restField} name={[name, 'id']}>
                            <Input />
                          </Form.Item>
                          <Form.Item key={key}>
                            <Form.List name={[name, 'items']}>
                              {(items, { add, remove }) => {
                                return (
                                  <div>
                                    {items.map(({ key, name, ...restField }) => (
                                      <Space key={key} align="start" className="me-3">
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'pivot', 'idItem']}
                                          rules={[{ required: true, message: 'Missing item name' }]}
                                        >
                                          <Select style={{ width: '200px' }}>
                                            {itemsList.map(item => (
                                              <Select.Option
                                                value={item.id}
                                                key={item.id}
                                                id={item.id}
                                              >
                                                {item.name}
                                              </Select.Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'pivot', 'soLuong']}
                                          rules={[{ required: true, message: 'Missing item name' }]}
                                        >
                                          <InputNumber />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(name)
                                          }}
                                        />
                                      </Space>
                                    ))}
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                      >
                                        Thêm vật phẩm
                                      </Button>
                                    </Form.Item>
                                  </div>
                                )
                              }}
                            </Form.List>
                          </Form.Item>
                        </>
                      ))}
                      <Form.Item>
                        <Button
                          disabled={fields.length >= 1}
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Thêm phần quà
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </>
            )}
            <Form.Item className="col-span-8 col-start-6 ms-32">
              <Space>
                <Button
                  type="primary"
                  htmlType="button"
                  className="bg-danger"
                  onClick={() =>
                    showDeleteConfirm({
                      title: 'Bạn có chắc chắn muốn hủy quá trình ?',
                      icon: <ExclamationCircleFilled />,
                      onOk() {
                        navigate(-1)
                      }
                    })
                  }
                >
                  Hủy
                </Button>
                <Button disabled={loading} type="primary" htmlType="submit" ghost>
                  {loading ? <LoadingOutlined /> : 'Sửa'}
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </HomeLayout>
  )
}

export default EditEventForm
