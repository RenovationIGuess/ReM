import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'


const initialState = false

const openSlice = createSlice({
    name: 'open',
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload)
            return !state
        }
    }
})

export const openSelector = (state: RootState) => state.open

export const { setOpen } = openSlice.actions

export default openSlice.reducer