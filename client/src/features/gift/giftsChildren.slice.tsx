import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'

export interface GiftType {
    id: string
    name: string,
    quantity: number
}

const initialState: GiftType[] = []

const giftChildSlice = createSlice({
    name: 'giftsChildren',
    initialState,
    reducers: {
        addGift: (state, action: PayloadAction<GiftType>) => {
            console.log(action.payload)
            return [...state, action.payload]
        },
        emptyGift: (state) => {
            state = []
            return state
        }
    }
})

export const getGiftsChildrenSelector = (state: RootState) => state.giftsChildren

export const { addGift, emptyGift } = giftChildSlice.actions

export default giftChildSlice.reducer