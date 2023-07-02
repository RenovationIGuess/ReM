import apiSlice from '~/app/api/apiSlice'

type link = {
  url: string
  label: string
  active: boolean
}

type GetItemsRespose = {
  data: {
    current_page: number
    data: IItem[]
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

const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getItemsByPage: builder.query<GetItemsRespose, Page>({
      query: ({ page = 1, offset = 0 }) => `/items?page=${page}&limit=${offset}`
    })
  })
})

export const { useGetItemsByPageQuery } = itemsApiSlice
