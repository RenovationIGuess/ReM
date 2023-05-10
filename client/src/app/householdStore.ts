import { create } from 'zustand'
import { getHouseholdById, getHouseholdByPage } from '~/lib/household'

interface IHouseholdStore {
  households: IHousehold[]
  household: IHousehold
  getHouseholdByPage: (page: Page) => void
  getHouseholdById: (id: string) => void
}

export const useHouseholdStore = create<IHouseholdStore>(set => ({
  households: [],
  household: {
    id: 1,
    maHoKhau: 'HK001',
    idChuHo: 1,
    maKhuVuc: 'KV001',
    ngayLap: new Date(),
    diaChi: '123 Đường 1, Phường 1, Quận 1, TP.HCM',
    ngayChuyenDi: undefined,
    lyDoChuyen: undefined,
    created_at: new Date(),
    updated_at: new Date(),
    chu_ho: {
      id: 1,
      maNhanKhau: 'NK001',
      hoTen: 'Nguyễn Văn A',
      biDanh: 'A',
      gioiTinh: 'Nam',
      noiSinh: 'Hà Nội',
      ngaySinh: new Date(),
      nguyenQuan: 'Hà Nội',
      diaChiThuongTru: 'Hà Nội',
      diaChiHienTai: 'Hà Nội',
      danToc: 'Kinh',
      quocTich: 'Việt Nam',
      tonGiao: 'Không',
      soHoChieu: '',
      trinhDoHocVan: 'Đại học',
      ngheNghiep: 'Sinh viên',
      noiLamViec: 'Hà Nội',
      tienAn: 'Không',
      ngayChuyenDen: new Date(),
      lyDoChuyenDen: 'Học tập',
      ngayChuyenDi: new Date(),
      lyDoChuyenDi: 'Học tập',
      diaChiMoi: 'Hà Nội',
      idNguoiTao: 2,
      status: 1,
      idNguoiXoa: 0,
      lyDoXoa: '',
      ghiChu: '',
      created_at: new Date(),
      updated_at: new Date()
    },
    nhan_khaus: []
  },
  getHouseholdByPage: async (page: Page) => {
    const data = await getHouseholdByPage(page)
    set({ households: data })
  },
  getHouseholdById: async (id: string) => {
    const data = await getHouseholdById(id)
    set({ household: data })
  }
}))
