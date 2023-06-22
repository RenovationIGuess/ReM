import axiosClient from '~/app/axiosClient'

export const getHouseholdByPage = async (page: Page) => {
  const response = await axiosClient.get(`/ho-khau?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  console.log('Call api successfully', response.data.data)
  return response.data.data
}

export const getHouseholdById = async (id: string) => {
  const response = await axiosClient.get(`/ho-khau/${id}`)
  if (!response) return
  console.log('Call api get household by id successfully', response.data)
  return response.data
}
