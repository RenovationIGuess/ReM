import { create } from 'zustand'
import { getEventById, getEventByPage, getGiftsEventByEventId, getItems, getStatisticById } from '~/lib/event'

interface IEventStore {
    events: IEvent[]
    event: IEvent
    gifts: IPhanThuong[]
    items: IItem[]
    statistics: IThongKeSuKien[]
    getEventByPage: (page: Page) => void
    getEventById: (id: string) => void
    getGiftsEventByEventId: (id: string | undefined) => void
    getItems: () => void
    getStatisticById: (id: string | undefined) => void
}

export const useEventStore = create<IEventStore>(set => ({
    events: [],
    event: {
        id: "1",
        name: "abc",
        type: 1,
        isDone: 0,
        ngayBatDau: new Date('2023-09-24'),
        created_at: new Date('2023-09-24'),
        updated_at: new Date('2023-09-24'),
        total_cost: 100,
        duoc_nhan_thuongs: [],
        phan_thuongs: []
    },
    gifts: [],
    items: [],
    statistics: [],
    getEventByPage: async (page: Page) => {
        const data = await getEventByPage(page)
        set({ events: data })
    },
    getEventById: async (id: string) => {
        const data = await getEventById(id)
        set({ event: data })
    },
    getGiftsEventByEventId: async (id: string | undefined) => {
        const data = await getGiftsEventByEventId(id)
        set({ gifts: data })
    },
    getItems: async () => {
        const data = await getItems()
        set({ items: data })
    },
    getStatisticById: async (id: string | undefined) => {
        const data = await getStatisticById(id)
        set({ statistics: data })
    }
}))
