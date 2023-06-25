import apiSlice from '~/app/api/apiSlice'

type link = {
    url: string
    label: string
    active: boolean
}

type GetEventsRespose = {
    data: {
        current_page: number
        data: IEvent[]
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

const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEventsByPage: builder.query<GetEventsRespose, Page>({
            query: ({ page = 1, offset = 0 }) => `/su-kien?page=${page}&limit=${offset}`
        })
    })
})

export const { useGetEventsByPageQuery } = eventsApiSlice
