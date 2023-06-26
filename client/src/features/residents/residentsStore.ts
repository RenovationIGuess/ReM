import { create } from 'zustand'
import {
  editResident,
  getResidentById,
  getResidentsByPage,
  searchHouseholdLeader,
  searchResident
} from '~/lib/residents'

interface IResidentsStore {
  residents: Residents
  total: number
  resident: IResident
  currentPage: number
  pageSize: number
  searchResult: IResident[]
  searchHouseholdLeaderResult: IHousehold[]
  setCurrentPage: (page: Page) => void
  getResidents: (page?: Page) => void
  getResidentById: (id: string) => void
  searchResident: (searchValue: string) => void
  editResident: (resident: IResident) => void
  searchHouseholdLeader: (searchValue: string) => void
  searchResidentsByName: (searchValue: string) => void
}

export const useResidentsStore = create<IResidentsStore>((set, get) => ({
  residents: new Map<string, IResident>(),

  total: 0,

  currentPage: 1,

  pageSize: 10,

  resident: {} as IResident,

  searchResult: [],

  searchHouseholdLeaderResult: [],

  setCurrentPage: async ({ page, offset }) => {
    const response = await getResidentsByPage({ page, offset })

    if (!response) return
    set({ currentPage: page, pageSize: offset, residents: response.data, total: response.total })
  },

  getResidents: async page => {
    let currentPage = get().currentPage
    let offset = get().pageSize
    if (page) {
      currentPage = page.page
      offset = page.offset
    }

    const response = await getResidentsByPage({ page: currentPage, offset })

    if (!response) return

    set({ residents: response.data, total: response.total, currentPage, pageSize: offset })
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
  },

  searchHouseholdLeader: async (searchValue: string) => {
    const data = await searchHouseholdLeader(searchValue)

    if (!data) return

    set({ searchHouseholdLeaderResult: data })
  },

  searchResidentsByName: async (searchValue: string) => {
    const data = await searchResident(searchValue)

    if (!data) return

    const residents = data.reduce((acc: Map<string, IResident>, resident: IResident) => {
      acc.set(resident.id.toString(), resident)

      return acc
    }, new Map<string, IResident>())

    set({ residents })
  }
}))
