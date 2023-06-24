import { create } from 'zustand'
import { getCurrentUser } from '~/lib/auth'

interface IAuthStore {
  currentUser: IUser
  getCurrentUser: () => void
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  currentUser: {} as IUser,
  getCurrentUser: async () => {
    const data = await getCurrentUser()

    set({ currentUser: data })
  }
}))
