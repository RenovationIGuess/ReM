declare type ApiErrorType = {
  message: string
  isError: boolean
}

declare type IUser = {
  id: int
  name: string
  username: string
}

declare type Page = {
  page: number
  offset: number
}

declare type IResident = {
  id: int
  maNhanKhau: string
  image?: string
  hoTen: string
  biDanh?: string
  gioiTinh: number
  noiSinh: string
  ngaySinh: Date
  nguyenQuan: string
  diaChiThuongTru: string
  diaChiHienTai: string
  danToc: string
  quocTich: string
  tonGiao: string
  soHoChieu?: string
  trinhDoHocVan: string
  ngheNghiep?: string
  noiLamViec?: string
  tienAn?: string
  ngayChuyenDen?: Date
  lyDoChuyenDen?: string
  ngayChuyenDi?: Date
  lyDoChuyenDi?: string
  diaChiMoi?: string
  idNguoiTao: int
  status: int
  idNguoiXoa?: int
  lyDoXoa?: string
  ghiChu?: string
  created_at: Date
  updated_at: Date
  pivot?: {
    idHoKhau: number
    idNhanKhau: number
    quanHeVoiChuHo: string
  }
  duoc_khai_tu: Death | null
  chung_minh_thu?: IdentificationType
  thanh_vien_ho?: ResidentHousehold & { ho_khau: IHousehold }
}

declare type Death = {
  id: int
  idNguoiKhaiTu: int
  idNguoiTao: int
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  created_at: Date
  updated_at: Date
}

declare type IHousehold = {
  id: int
  maHoKhau?: string
  idChuHo: int
  maKhuVuc?: string
  ngayLap?: Date
  diaChi?: string
  ngayChuyenDi?: Date
  lyDoChuyen?: string
  created_at?: Date
  updated_at?: Date
  chu_ho: IResident
  nhan_khaus: IResident[]
}

declare type Residents = Map<string, IResident>

declare type KhaiTuData = {
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  idNguoiTao: number
  idNguoiKhaiTu: number
}

declare type CredentialsType = {
  username: string
  password: string
}

declare type GenderType = 'Nam' | 'Nữ' | 'Khác'

declare type HouseholdRelationshipType =
  | 'Vợ'
  | 'Chồng'
  | 'Con'
  | 'Cháu'
  | 'Ông'
  | 'Bà'
  | 'Bố'
  | 'Mẹ'
  | 'Anh'
  | 'Chị'
  | 'Em'
  | 'Phức tạp'

declare type IdentificationType = {
  soCMT: string
  ngayCap: Date
  noiCap: string
}

declare type ResidentHousehold = {
  idHoKhau: number
  idNhanKhau?: number
  quanHeVoiChuHo: HouseholdRelationshipType
}
