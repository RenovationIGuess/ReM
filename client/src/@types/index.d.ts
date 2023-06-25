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

declare type PageGiftEvent = {
  page: number
  offset: number
  eventId: string | undefined
}

declare type IResident = {
  id: int
  maNhanKhau: string
  hoTen: string
  biDanh?: string
  gioiTinh: string
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
  created_at: Date
  updated_at: Date
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
