import axiosClient from '~/app/axiosClient'

export const getHouseholdByPage = async (page: Page) => {
  const response = await axiosClient.get(`/ho-khau?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  console.log('Call api successfully', response.data.data)
  return response.data
}

export const getHouseholdById = async (id: string) => {
  const response = await axiosClient.get(`/ho-khau/${id}`)
  if (!response) return
  console.log('Call api get household by id successfully', response.data)
  return response.data
}

export const createHousehold = async (household: any) => {
  const response = await axiosClient.post(`/ho-khau/create`, household)
  if (!response) return
  console.log('Create household successfully data: ', response.data)
}

export const filterResidents = async (hoTen: string, page: number = 1) => {
  const response = await axiosClient.get(`/nhan-khau?page=${page}&limit=10&hoTen=${hoTen}`)
  if (!response) return
  console.log('Call api filter residents successfully', response.data.data)
  return response.data.data
}

export const splitHousehold = async (id: string, data: any) => {
  const response = await axiosClient.post(`/ho-khau/${id}/edit/tach-ho-khau`, data)
  if (!response) return
  console.log('Tách được r bé ơi', response)
  return response
}
