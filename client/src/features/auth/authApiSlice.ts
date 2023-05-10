import apiSlice from '~/app/api/apiSlice'

export type CredentialsType = {
  username: string
  password: string
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials: CredentialsType) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useSendLogoutMutation } = authApiSlice
