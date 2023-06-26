import axiosClient from '~/app/axiosClient'

export const getCurrentUser = async () => {
  const result = await axiosClient.get('/auth/me')

  return result.data
}

export const login = async (credentials: CredentialsType) => {
  const result = await axiosClient.post('/auth/login', credentials)
  if (!result) return

  return result.data
}
