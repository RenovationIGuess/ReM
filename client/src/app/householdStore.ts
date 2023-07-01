import { create } from 'zustand'
import {
  createHousehold,
  getChangeLog,
  getHouseholdById,
  getHouseholdByPage,
  updateHousehold
} from '~/lib/household'

interface IHouseholdStore {
  households: IHousehold[]
  household: IHousehold
  householdsTotal: number
  residents: IResident[]
  currentPage: Page
  changeLog: ChangeLogType[]
  totalChangeLog: number
  getHouseholdByPage: (page: Page) => void
  getHouseholdById: (id: string) => void
  createHousehold: (household: any) => void
  updateHousehold: (household: any) => Promise<void>
  getChangeLog: (id: string, page: Page) => void
}

export const useHouseholdStore = create<IHouseholdStore>((set, get) => ({
  households: [],
  household: {} as IHousehold,
  householdsTotal: 0,
  residents: [],
  currentPage: { page: 1, offset: 10 },
  changeLog: [],
  totalChangeLog: 0,
  getHouseholdByPage: async (page: Page = get().currentPage) => {
    const data = await getHouseholdByPage(page)
    set({ households: data.data, householdsTotal: data.total, currentPage: page })
  },
  getHouseholdById: async (id: string) => {
    const ID = parseInt(id)
    const household = get().households.find(h => h.id === ID)
    if (get().household?.id === ID) return
    if (household) return set({ household })

    const data = await getHouseholdById(id)
    set({ household: data })
  },
  createHousehold: async (household: any) => {
    const data = await createHousehold(household)
    set({ household: data })
  },
  updateHousehold: async (household: any) => {
    await updateHousehold(household)
    const data = await getHouseholdByPage(get().currentPage)
    set({ households: data.data, householdsTotal: data.total })
  },
  getChangeLog: async (id: string, page: Page) => {
    const data = await getChangeLog(id, page)
    set({ changeLog: data.data, totalChangeLog: data.total })
  }
}))
