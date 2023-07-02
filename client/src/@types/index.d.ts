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
  age: number
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

declare type IEvent = {
  id: int
  name?: string
  type?: number
  isDone?: number
  ngayBatDau: Date
  created_at: Date
  updated_at: Date
  total_cost: number
  duoc_nhan_thuongs: IDuocNhanThuong[]
  phan_thuongs: IPhanThuongThongKe[]
}

declare type IItem = {
  id: number
  name: string
  maVatPham?: string
  name?: string
  unit_price?: number
  created_at: Date
  updated_at: Date
  image_url: string | undefined
  pivot: {
    idPhanThuong: number
    idItem: number
    soLuong: number
  }
}

declare type IDuocNhanThuong = {
  id: number
  idSuKien: number
  idNhanKhau: number
  tenTruong: string
  tenLop: string
  thanhTichHocTap: number
  capHoc: number
  anhGiayKhen: string
  hasRewarded: number
  idPhanThuong: number
  created_at: Date
  updated_at: Date
  nhan_khau: IResident
  phan_thuong: IPhanThuongThongKe
}

declare type IPhanThuong = {
  id: number
  name: number
  unit_price: number
  totalQuantity: number
  totalCost: number
  image_url: string
}

declare type IThongKeSuKien = {
  id: number
  maHoKhau: string
  idChuHo: number
  maKhuVuc: string
  diaChi: string
  ngayLap: Date
  ngayChuyenDi: null
  lyDoChuyen: null
  created_at: Date
  updated_at: Date
  duocNhanThuongs: IDuocNhanThuong[]
  totalCost: number
  chuHo: IResident
}

declare type IPhanThuongThongKe = {
  id: number
  idSuKien: number
  thanhTichHocTap: number
  capHocType: number
  created_at: Date
  updated_at: Date
  cost: number
  count: number
  items: IItem[]
}
declare type Residents = Map<string, IResident>

declare type KhaiTuData = {
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  idNguoiTao: number
  idNguoiKhaiTu: number
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

declare type ITamTru = {
  id: number
  idNhanKhau: number
  maGiayTamTru: string
  soDienThoaiDangKy: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
  nhan_khau: IResident
}

declare type TamTrus = Map<string, ITamTru>

declare type ITamVang = {
  id: number
  idNhanKhau: number
  maGiayTamVang: string
  noiTamTru: string
  tuNgay: Date
  denNgay: Date
  lyDo: string
  nhan_khau: IResident
}

declare type TamVangs = Map<string, ITamVang>

declare type ChangeLogType = {
  idHoKhau: number
  thongTinThayDoi: string
  thayDoiTu: string
  thayDoiThanh: string
  ngayThayDoi: Date
  nguoi_thay_doi: {
    name: string
    id: number
  }
}

declare type StaticByAgeType = {
  '0-4': number
  '5-9': number
  '10-14': number
  '15-19': number
  '20-24': number
  '25-29': number
  '30-34': number
  '35-39': number
  '40-44': number
  '45-49': number
  '50-54': number
  '55-59': number
  '60-64': number
  '65-69': number
  '70-74': number
  '75-79': number
  '80-84': number
  '85-89': number
  '90-94': number
  '95-99': number
  '100+': number
}

declare type StaticByGenderType = {
  namGioi: number
  nuGioi: number
}

declare type StaticByTempResidentType = {
  tamTru: number
  tamVang: number
}
