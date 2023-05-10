import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  }
})

const baseQueryWithRetry: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 403) {
    const refreshResult = (await baseQuery('/auth/refresh', api, extraOptions)) as any

    if (refreshResult && refreshResult.accessToken) {
      // store the new access token
      localStorage.setItem('accessToken', refreshResult.accessToken)

      // retry the initial request
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem('accessToken')
      window.location.href = '/login'

      return refreshResult
    }
  }

  return result ?? { data: undefined, error: undefined }
}

const apiSlice = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['User'],
  endpoints: builder => ({})
})

export default apiSlice
