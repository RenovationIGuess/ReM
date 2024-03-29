import apiSlice from '~/app/api/apiSlice'

type link = {
  url: string
  label: string
  active: boolean
}

type GetGiftsRespose = {
  data: {
    current_page: number
    data: IPhanThuong[]
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

export type PageGiftEvent = {
  page: number
  offset: number
  event_id: string | undefined
}
const giftsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGiftsByPage: builder.query<GetGiftsRespose, PageGiftEvent>({
      query: ({ page = 1, offset = 0, event_id }) =>
        `/su-kien/${event_id}/thong-ke-phan-qua?page=${page}&limit=${offset}`
    })
  })
})

export const { useGetGiftsByPageQuery } = giftsApiSlice
