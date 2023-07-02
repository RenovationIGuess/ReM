import axiosClient from '~/app/axiosClient'

export const staticByAge = async () => {
  const response = await axiosClient.get('/thong-ke/nhan-khau/tuoi')
  if (!response) return
  return response.data
}

export const staticByGender = async () => {
  const response = await axiosClient.get('/thong-ke/nhan-khau/gioi-tinh')
  if (!response) return
  return response.data
}
