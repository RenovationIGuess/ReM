import apiSlice from '~/app/api/apiSlice'

type link = {
  url: string
  label: string
  active: boolean
}

type GetResidentsRespose = {
  data: {
    current_page: number
    data: IResident[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
  }
  success: boolean
  message: string
}

const residentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getResidentsByPage: builder.query<GetResidentsRespose, Page>({
      query: ({ page = 1, offset = 0 }) => `/nhan-khau?page=${page}&limit=${offset}`
    })
  })
})

export const { useGetResidentsByPageQuery } = residentsApiSlice
