import { create } from 'zustand'
import { editResident, getResidentById, getResidentsByPage, searchResident } from '~/lib/residents'

interface IResidentsStore {
  residents: Residents
  total: number
  resident: IResident
  currentPage: number
  pageSize: number
  searchResult: IResident[]
  setCurrentPage: (page: Page) => void
  getResidents: () => void
  getResidentById: (id: string) => void
  searchResident: (searchValue: string) => void
  editResident: (resident: IResident) => void
}

export const useResidentsStore = create<IResidentsStore>((set, get) => ({
  residents: new Map<string, IResident>(),

  total: 0,

  currentPage: 1,

  pageSize: 10,

  resident: {} as IResident,

  searchResult: [],

  setCurrentPage: async ({ page, offset }) => {
    const response = await getResidentsByPage({ page, offset })

    if (!response) return
    set({ currentPage: page, pageSize: offset, residents: response.data, total: response.total })
  },

  getResidents: async () => {
    const page = get().currentPage
    const offset = get().pageSize
    const response = await getResidentsByPage({ page, offset })

    if (!response) return

    set({ residents: response.data, total: response.total })
  },

  getResidentById: async (id: string) => {
    const foundedResident = get().residents.get(id)

    if (foundedResident) return set({ resident: foundedResident })

    const response = await getResidentById(id)
    if (!response) return

    set({ resident: response })
  },

  searchResident: async (searchValue: string) => {
    const data = await searchResident(searchValue)

    if (!data) return

    set({ searchResult: data })
  },

  editResident: async (resident: IResident) => {
    const data = await editResident(resident)

    if (!data) return

    set({ resident: data })
  }
}))
