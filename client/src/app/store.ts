import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authReducer from '~/features/auth/authSlice'
import apiSlice from './api/apiSlice'
import giftsChildren from '../features/gift/giftsChildren.slice'
import gifts from '../features/gift/gifts.slice'
import addGiftDisabled from '../features/gift/disableAddGift.slice'
import open from '../features/gift/open.slice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    giftsChildren,
    gifts,
    addGiftDisabled,
    open
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

