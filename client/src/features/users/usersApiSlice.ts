import apiSlice from '~/app/api/apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCurrentUsers: builder.query<IUser, string>({
      query: () => '/auth/me',
      providesTags: ['User']
    })
  })
})

export const { useGetCurrentUsersQuery } = usersApiSlice
