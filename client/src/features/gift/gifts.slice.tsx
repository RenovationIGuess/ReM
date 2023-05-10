import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'
import { DataType } from './GiftTable'

const initialState: DataType[] = [
    {
        key: '1',
        id: '1',
        name: 'Figure Hatsune Miku 1/10',
        price: 10000,
        imageUrl: "https://cdn-amz.woka.io/images/I/51tnieuI6hL.jpg"
    },
    {
        key: '2',
        id: '2',
        name: 'Thẻ roll SSR 100%',
        price: 10000,
        imageUrl: "https://cf.shopee.vn/file/vn-11134207-7qukw-lhlo3bpr7ts598"
    },
    {
        key: '3',
        id: '3',
        name: 'Nitendo switch',
        price: 10000,
        imageUrl: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6470/6470923_sd.jpg"
    },
    {
        key: '4',
        id: '4',
        name: 'Đĩa game Final Fantasy bản giới hạn',
        price: 10000,
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/58/Final_Fantasy_XVI_Key_Art.png"
    },
    {
        key: '5',
        id: '5',
        name: 'Manga Kimetsu no Yaiba',
        price: 10000,
        imageUrl: "https://cdn.shopify.com/s/files/1/0882/5118/products/VIZ_MEDIA-Demon_Slayer_Kimetsu_No_Yaiba_Vol_1_Manga-2052886_1024x1024.jpg?v=1584805438"
    },
]

const giftSlice = createSlice({
    name: 'gifts',
    initialState,
    reducers: {
        addGift: (state, action: PayloadAction<DataType>) => {
            console.log(action.payload)
            return [...state, action.payload]
        }
    }
})

export const getGiftsSelector = (state: RootState) => state.gifts

export const { addGift } = giftSlice.actions

export default giftSlice.reducer