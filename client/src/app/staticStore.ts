import { create } from 'zustand'
import { staticByAge, staticByGender } from '~/lib/static'

interface IStaticStore {
  staticByAge: any
  staticByGender: StaticByGenderType
  staticByTempResident: StaticByTempResidentType
  getStaticByAge: () => void
  getStaticByGender: () => void
  getStaticByTempResident: () => void
}

export const useStaticStore = create<IStaticStore>((set, get) => ({
  staticByAge: {},
  staticByGender: {} as StaticByGenderType,
  staticByTempResident: {} as StaticByTempResidentType,
  getStaticByAge: async () => {
    const data = await staticByAge()
    set({ staticByAge: data })
  },
  getStaticByGender: async () => {
    const data = await staticByGender()
    set({ staticByGender: { namGioi: data.namGioi, nuGioi: data.nuGioi } })
  },
  getStaticByTempResident: async () => {}
}))
