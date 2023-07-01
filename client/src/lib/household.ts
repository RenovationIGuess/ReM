import axiosClient from '~/app/axiosClient'

export const getHouseholdByPage = async (page: Page) => {
  const response = await axiosClient.get(`/ho-khau?page=${page.page}&limit=${page.offset}`)
  if (!response) return
  return response.data
}

export const getHouseholdById = async (id: string) => {
  const response = await axiosClient.get(`/ho-khau/${id}`)
  if (!response) return
  console.log(`Lấy được hộ khẩu theo id: ${id} rồi bé ơi`, response.data)
  return response.data
}

export const createHousehold = async (household: any) => {
  const response = await axiosClient.post(`/ho-khau/create`, household)
  if (!response) return
  return response.data
}

export const updateHousehold = async (household: any) => {
  const response = await axiosClient.patch(`/ho-khau/${household.id}/edit`, household)
  if (!response) return
  return response.data
}

export const splitHousehold = async (id: string, data: any) => {
  const response = await axiosClient.post(`/ho-khau/${id}/edit/tach-ho-khau`, data)
  if (!response) return
  return response
}

export const getChangeLog = async (id: string, page: Page) => {
  const response = await axiosClient.get(
    `/ho-khau/${id}/edit/lich-su?page=${page.page}&limit=${page.offset}`
  )
  if (!response) return
  return response.data
}
