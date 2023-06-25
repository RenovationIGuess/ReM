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

<<<<<<< HEAD
<<<<<<< HEAD
declare type PageGiftEvent = {
  page: number
  offset: number
  eventId: string | undefined
}

=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> 7753122... create household CRUD ui
declare type IResident = {
  id: int
  maNhanKhau: string
  image?: string
  hoTen: string
  biDanh?: string
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  gioiTinh: number
=======
  gioiTinh: string
>>>>>>> 2967e28... gift front end
=======
  gioiTinh: string
>>>>>>> 7753122... create household CRUD ui
=======
  gioiTinh: number
>>>>>>> 6218c52... household crud feature
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6218c52... household crud feature
  pivot?: {
    idHoKhau: number
    idNhanKhau: number
    quanHeVoiChuHo: string
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> 7753122... create household CRUD ui
=======
>>>>>>> 6218c52... household crud feature
=======
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
>>>>>>> f274461... fix(client): update crud nhan-khau
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
  pivot: {
    idPhanThuong: number,
    idItem: number,
    soLuong: number
  }
}

declare type IDuocNhanThuong = {
  id: number,
  idSuKien: number,
  idNhanKhau: number,
  tenTruong: string,
  tenLop: string,
  thanhTichHocTap: number,
  capHoc: number,
  anhGiayKhen: string,
  hasRewarded: number,
  idPhanThuong: number,
  created_at: Date,
  updated_at: Date,
  nhan_khau: IResident,
  phan_thuong: IPhanThuongThongKe
}

declare type IPhanThuong = {
  id: number,
  name: number,
  unit_price: number,
  totalQuantity: number,
  totalCost: number
}

declare type IThongKeSuKien = {
  id: number,
  maHoKhau: string,
  idChuHo: number,
  maKhuVuc: string,
  diaChi: string,
  ngayLap: Date,
  ngayChuyenDi: null,
  lyDoChuyen: null,
  created_at: Date,
  updated_at: Date,
  duocNhanThuongs: IDuocNhanThuong[],
  totalCost: number,
  chuHo: IResident,
}

declare type IPhanThuongThongKe = {
  id: number,
  idSuKien: number,
  thanhTichHocTap: number,
  capHocType: number,
  created_at: Date,
  updated_at: Date,
  cost: number,
  count: number,
  items: IItem[]
}
declare type Residents = Map<string, IResident>

declare type KhaiTuData = {
  soGiayKhaiTu: string
  ngayChet: Date
  lyDoChet: string
  idNguoiTao: number
  idNguoiKhaiTu: number
=======
=======
>>>>>>> 7753122... create household CRUD ui
  created_at: Date
  updated_at: Date
=======
  created_at?: Date
  updated_at?: Date
>>>>>>> 6218c52... household crud feature
  chu_ho: IResident
  nhan_khaus: IResident[]
<<<<<<< HEAD
>>>>>>> 2967e28... gift front end
=======
>>>>>>> 7753122... create household CRUD ui
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
