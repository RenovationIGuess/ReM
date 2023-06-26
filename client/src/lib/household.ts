import axiosClient from '~/app/axiosClient'

export const getHouseholdByPage = async (page: Page) => {
  const response = await axiosClient.get(`/ho-khau?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  return response.data
}

export const getHouseholdById = async (id: string) => {
  const response = await axiosClient.get(`/ho-khau/${id}`)
  if (!response) return
  return response.data
}

export const createHousehold = async (household: any) => {
  const response = await axiosClient.post(`/ho-khau/create`, household)
  if (!response) return
}

export const filterResidents = async (hoTen: string, page: number = 1) => {
  const response = await axiosClient.get(`/nhan-khau?page=${page}&limit=10&hoTen=${hoTen}`)
  if (!response) return
  return response.data.data
}

export const splitHousehold = async (id: string, data: any) => {
  const response = await axiosClient.post(`/ho-khau/${id}/edit/tach-ho-khau`, data)
  if (!response) return
  return response
}
