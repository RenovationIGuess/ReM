import React, { ChangeEvent, useEffect, useState } from 'react'
import Event from './Event'
import HomeLayout from '~/components/Layout/HomeLayout'
import { Row, Pagination, Input, Button, Typography, Select } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetEventsByPageQuery } from './api/events.slice'
import axiosClient from '~/app/axiosClient'
import moment from 'moment'
import TabListEvent from '~/components/Layout/TabListEvent'
import CreateEventFormModal from './modals/CreateEventFormModal'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { time } from 'console'

const { Title } = Typography

const EventList = () => {
  const [page, setPage] = useState<Page>({ page: 1, offset: 8 })
  const { data: eventsData } = useGetEventsByPageQuery(page)
  const navigate = useNavigate()
  const [openCreateEvent, setOpenCreateEvent] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<IEvent[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)

    const filteredList = eventsData?.data.data.filter(obj =>
      obj.name?.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredOptions(filteredList as IEvent[])
  }

  const handleSelectChange = (value: string) => {
    setSearchQuery(value)
  }

  const onCreate = async (values: any) => {
    const inputDate = new Date(values.ngayBatDau)
    const formattedDate = moment(inputDate).format('YYYY-MM-DD')
    try {
      await axiosClient.post(`/su-kien/create`, {
        name: values.name,
        ngayBatDau: formattedDate,
        type: values.type ? 1 : 0,
        phan_thuongs: values.phan_thuongs
      })
      setOpenCreateEvent(false)
      toast.success(`Đã thêm sự kiện mới`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error) {
      const axiosError = error as AxiosError
      const dataError: { success: boolean; message: string } | unknown = axiosError.response?.data
      const dataError2 = dataError as { success: boolean; message: string }
      const messageError = dataError2.message
      toast.error(messageError ? messageError : (error as Error).message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }
  return (
    <HomeLayout>
      <div className="mb-2 flex min-h-full flex-col">
        <div className="flex items-center justify-between">
          <Select
            mode="multiple"
            style={{ width: '500px' }}
            placeholder="Tìm kiếm sự kiện"
            onChange={handleSelectChange}
            onSearch={handleSearch}
            filterOption={false}
          >
            {filteredOptions?.map(obj => (
              <Select.Option key={obj.name} value={obj.name}>
                <Link to={`/su-kien/${obj.id}`}>{obj.name}</Link>
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            htmlType="button"
            className="bg-primary"
            style={{ color: 'white' }}
            onClick={() => setOpenCreateEvent(true)}
          >
            Thêm sự kiện mới
          </Button>
          <CreateEventFormModal
            open={openCreateEvent}
            onCreate={onCreate}
            onCancel={() => {
              setOpenCreateEvent(false)
            }}
          />
        </div>
        <TabListEvent defaultActiveKey="1" />
        <div className="grid grid-cols-4 gap-6">
          {eventsData?.data.data.map((event: IEvent) => (
            <Event type={event.type} key={event.id} eventId={event.id} title={event.name} />
          ))}
        </div>
        <Pagination
          defaultPageSize={8}
          showSizeChanger={true}
          pageSizeOptions={['8', '12', '16']}
          style={{ float: 'right' }}
          defaultCurrent={1}
          total={eventsData?.data.total}
          className="mx-4 mt-4 flex items-center justify-end"
          onChange={(page, pageSize) => {
            setPage({ page, offset: pageSize })
          }}
        />
      </div>
    </HomeLayout>
  )
}

export default EventList
