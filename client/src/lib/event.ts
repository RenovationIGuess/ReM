import exp from 'constants'
import axiosClient from '~/app/axiosClient'

export const getEventByPage = async (page: Page) => {
  const response = await axiosClient.get(`/su-kien?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  return response.data.data
}

export const getEventById = async (id: string | undefined) => {
  try {
    const response = await axiosClient.get(`/su-kien/${id}`)
    if (!response) return
    return response.data
  } catch (err) {
    console.error(err)
  }
}

export const getGiftsEventByEventId = async (id: string | undefined) => {
  const response = await axiosClient.get(`/su-kien/${id}/thong-ke-phan-qua`)
  if (!response) {
    return
  }
  return response.data
}

export const getItems = async (page: Page) => {
  const response = await axiosClient.get(`/items?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  return response.data.data
}

export const getItemById = async (id: string | undefined) => {
  const response = await axiosClient.get(`/items/${id}`)
  if (!response) return
  return response.data
}

export const getStatisticById = async (id: string | undefined) => {
  const response = await axiosClient.get(`/su-kien/${id}/thong-ke-ho-khau`)
  if (!response) return
  return response.data
}

export const getChildrenById = async (id: string | undefined) => {
  const response = await axiosClient.get(`/duoc-nhan-thuong/${id}`)
  if (!response) return
  return response.data
}
