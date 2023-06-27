import { create } from 'zustand'
import { getEventById, getEventByPage, getGiftsEventByEventId, getChildrenById, getItems, getStatisticById } from '~/lib/event'

interface IEventStore {
    events: IEvent[]
    event: IEvent
    gifts: IPhanThuong[]
    items: IItem[]
    children: IDuocNhanThuong
    statistics: IThongKeSuKien[]
    getEventByPage: (page: Page) => void
    getEventById: (id: string | undefined) => void
    getGiftsEventByEventId: (id: string | undefined) => void
    getItems: () => void
    getStatisticById: (id: string | undefined) => void
    getChildrenById: (id: string | undefined) => void
}

export const useEventStore = create<IEventStore>(set => ({
    events: [],
    event: {
        id: 2,
        name: "Tet Thieu Nhi 2021",
        ngayBatDau: new Date("2021-12-09"),
        isDone: 0,
        type: 1,
        created_at: new Date("2023-06-25T21:55:55.000000Z"),
        updated_at: new Date("2023-06-25T21:55:55.000000Z"),
        total_cost: 1468000,
        phan_thuongs: [],
        duoc_nhan_thuongs: []
    },
    gifts: [],
    items: [],
    statistics: [],
    children: {
        id: 33,
        idSuKien: 2,
        idNhanKhau: 5,
        tenTruong: "DHBKHN",
        tenLop: "Viet Nhat 03 - K65",
        thanhTichHocTap: 3,
        capHoc: 2,
        anhGiayKhen: "",
        hasRewarded: 0,
        idPhanThuong: 18,
        created_at: new Date("2023-06-25T21:55:55.000000Z"),
        updated_at: new Date("2023-06-25T21:55:55.000000Z"),
        nhan_khau: {
            id: 5,
            maNhanKhau: "NK4485464084955438",
            image: "",
            hoTen: "Randi Leannon DDS",
            biDanh: "",
            gioiTinh: 2,
            noiSinh: "Donavonburgh",
            ngaySinh: new Date("2023-06-25T21:55:55.000000Z"),
            nguyenQuan: "281 Paula Ports",
            diaChiThuongTru: "707 Adams Village Apt. 145",
            diaChiHienTai: "154 Demetrius Lights Apt. 417",
            danToc: "Kinh",
            quocTich: "Vietnam",
            tonGiao: "null",
            soHoChieu: "null",
            trinhDoHocVan: "null",
            ngheNghiep: "null",
            noiLamViec: "null",
            tienAn: "null",
            ngayChuyenDen: new Date("2023-06-25T21:55:55.000000Z"),
            lyDoChuyenDen: "null",
            ngayChuyenDi: new Date("2023-06-25T21:55:55.000000Z"),
            lyDoChuyenDi: "null",
            diaChiMoi: "null",
            idNguoiTao: "null",
            status: 1,
            idNguoiXoa: "null",
            lyDoXoa: "null",
            ghiChu: "null",
            created_at: new Date("2023-06-25T21:55:55.000000Z"),
            updated_at: new Date("2023-06-25T21:55:55.000000Z"),
            duoc_khai_tu: null,
            age: 18
        },
        phan_thuong: {} as IPhanThuongThongKe
    },
    getEventByPage: async (page: Page) => {
        const data = await getEventByPage(page)
        set({ events: data })
    },
    getEventById: async (id: string | undefined) => {
        const data = await getEventById(id)
        set({ event: data })
    },
    getGiftsEventByEventId: async (id: string | undefined) => {
        const data = await getGiftsEventByEventId(id)
        set({ gifts: data })
    },
    getItems: async () => {
        const data = await getItems()
        set({ items: data })
    },
    getStatisticById: async (id: string | undefined) => {
        const data = await getStatisticById(id)
        set({ statistics: data })
    },
    getChildrenById: async (id: string | undefined) => {
        const data = await getChildrenById(id)
        set({ children: data })
    }
}))
