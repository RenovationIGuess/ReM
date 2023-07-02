import { create } from 'zustand'
import { getTamTrusByPage, getTamVangsByPage } from '~/lib/temporary'

interface ITemporaryStore {
  tamtrus: TamTrus
  tamvangs: TamVangs
  totalTamtrus: number
  totalTamvangs: number
  currentTamTruPage: number
  currentTamVangPage: number
  pageSize: number
  setCurrentTamTruPage: (page: Page) => void
  setCurrentTamVangPage: (page: Page) => void
  getTamTrus: (page?: Page) => void
  getTamVangs: (page?: Page) => void
}

export const useTemporaryStore = create<ITemporaryStore>((set, get) => ({
  tamtrus: new Map<string, ITamTru>(),

  totalTamtrus: 0,

  tamvangs: new Map<string, ITamVang>(),

  totalTamvangs: 0,

  currentTamTruPage: 1,

  currentTamVangPage: 1,

  pageSize: 10,

  setCurrentTamTruPage: async ({ page, offset }) => {
    const response = await getTamTrusByPage({ page, offset })

    if (!response) return
    set({
      currentTamTruPage: page,
      pageSize: offset,
      tamtrus: response.data,
      totalTamtrus: response.total
    })
  },

  setCurrentTamVangPage: async ({ page, offset }) => {
    const response = await getTamVangsByPage({ page, offset })

    if (!response) return
    set({
      currentTamVangPage: page,
      pageSize: offset,
      tamvangs: response.data,
      totalTamvangs: response.total
    })
  },

  getTamTrus: async page => {
    let currentPage = get().currentTamTruPage
    let offset = get().pageSize
    if (page) {
      currentPage = page.page
      offset = page.offset
    }

    const response = await getTamTrusByPage({ page: currentPage, offset })

    if (!response) return

    set({
      tamtrus: response.data,
      totalTamtrus: response.total,
      currentTamTruPage: currentPage,
      pageSize: offset
    })
  },

  getTamVangs: async page => {
    let currentPage = get().currentTamTruPage
    let offset = get().pageSize
    if (page) {
      currentPage = page.page
      offset = page.offset
    }

    const response = await getTamVangsByPage({ page: currentPage, offset })

    if (!response) return

    set({
      tamvangs: response.data,
      totalTamvangs: response.total,
      currentTamTruPage: currentPage,
      pageSize: offset
    })
  }
}))
