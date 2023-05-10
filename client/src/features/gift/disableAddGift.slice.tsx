import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'


const initialState = false

const disabledSlice = createSlice({
    name: 'addGiftDisabled',
    initialState,
    reducers: {
        setDisabled: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload)
            return !state
        }
    }
})

export const getAddGiftDisabledSelector = (state: RootState) => state.addGiftDisabled

export const { setDisabled } = disabledSlice.actions

export default disabledSlice.reducer