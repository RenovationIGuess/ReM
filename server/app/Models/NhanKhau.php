<?php

namespace App\Models;

use App\Models\SuKien;
use App\Models\DuocNhanThuong;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NhanKhau extends Model
{
    use HasFactory;

    protected $table = 'nhan_khau';
    
    protected $attributes = [];

    protected $fillable = [
        'maNhanKhau',
        'hoTen',
        'biDanh',
        'gioiTinh',
        'noiSinh',
        'ngaySinh',
        'nguyenQuan',
        'diaChiThuongTru',
        'diaChiHienTai',
        'danToc',
        'quocTich',
        'tonGiao',
        'soHoChieu',
        'trinhDoHocVan',
        'ngheNghiep',
        'noiLamViec',
        'tienAn',
        'ngayChuyenDen',
        'lyDoChuyenDen',
        'ngayChuyenDi',
        'lyDoChuyenDi',
        'diaChiMoi',
        'idNguoiTao',
        'status',
        'idNguoiXoa',
        'lydoXoa',
        'ghiChu',
    ];

    public function duocNhanThuongs()
    {
        return $this->hasMany(DuocNhanThuong::class, 'idNhanKhau', 'id');
    }
}