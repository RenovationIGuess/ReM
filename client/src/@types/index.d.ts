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
