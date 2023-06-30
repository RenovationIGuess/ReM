import { create } from 'zustand'
import { getTamTrusByPage, getTamVangsByPage } from '~/lib/temporary'

interface ITemporaryStore {
  tamtrus: TamTrus
  tamvangs: TamVangs
  totalTamtrus: number
  totalTamvangs: number
  currentPage: number
  pageSize: number
  setCurrentPage: (page: Page) => void
  getTamTrus: (page?: Page) => void
  getTamVangs: (page?: Page) => void
}

export const useTemporaryStore = create<ITemporaryStore>((set, get) => ({
  tamtrus: new Map<string, ITamTru>(),

  totalTamtrus: 0,

  tamvangs: new Map<string, ITamVang>(),

  totalTamvangs: 0,

  currentPage: 1,

  pageSize: 10,

  setCurrentPage: async ({ page, offset }) => {
    const response = await getTamTrusByPage({ page, offset })

    if (!response) return
    set({
      currentPage: page,
      pageSize: offset,
      tamtrus: response.data,
      totalTamtrus: response.total
    })
  },

  getTamTrus: async page => {
    let currentPage = get().currentPage
    let offset = get().pageSize
    if (page) {
      currentPage = page.page
      offset = page.offset
    }

    const response = await getTamTrusByPage({ page: currentPage, offset })

    if (!response) return

    set({ tamtrus: response.data, totalTamtrus: response.total, currentPage, pageSize: offset })
  },

  getTamVangs: async page => {
    let currentPage = get().currentPage
    let offset = get().pageSize
    if (page) {
      currentPage = page.page
      offset = page.offset
    }

    const response = await getTamVangsByPage({ page: currentPage, offset })

    if (!response) return

    set({ tamvangs: response.data, totalTamvangs: response.total, currentPage, pageSize: offset })
  }
}))
