import { create } from 'zustand'
import {
  createHousehold,
  filterResidents,
  getHouseholdById,
  getHouseholdByPage,
  splitHousehold
} from '~/lib/household'

interface IHouseholdStore {
  households: IHousehold[]
  household: IHousehold
  householdsTotal: number
  residents: IResident[]
  currentPage: Page
  getHouseholdByPage: (page: Page) => void
  getHouseholdById: (id: string) => void
  createHousehold: (household: any) => void
  splitHousehold: (id: string, data: any) => void
}

export const useHouseholdStore = create<IHouseholdStore>((set, get) => ({
  households: [],
  household: {} as IHousehold,
  householdsTotal: 0,
  residents: [],
  currentPage: { page: 1, offset: 10 },
  getHouseholdByPage: async (page: Page) => {
    const data = await getHouseholdByPage(page)
    set({ households: data.data, householdsTotal: data.total, currentPage: page })
  },
  getHouseholdById: async (id: string) => {
    const household = get().households.find(h => h.id === id)
    if (household) return set({ household })

    const data = await getHouseholdById(id)
    set({ household: data })
  },
  createHousehold: async (household: any) => {
    await createHousehold(household)
  },
  splitHousehold: async (id: string, data: any) => {
    await splitHousehold(id, data)
  }
}))
