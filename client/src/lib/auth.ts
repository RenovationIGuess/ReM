import axiosClient from '~/app/axiosClient'

export const getCurrentUser = async () => {
  const result = await axiosClient.get('/auth/me')

  return result.data
}
