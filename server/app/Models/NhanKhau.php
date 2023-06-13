<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\KhaiTu;
use App\Models\TamTru;
use App\Models\TamVang;
use App\Models\ChungMinhThu;
use App\Models\DuocNhanThuong;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
        'lyDoXoa',
        'ghiChu',
    ];

    protected $appends = [
        'age',
    ];

    protected function age(): Attribute
    {
        return new Attribute(
            get: fn (mixed $value, array $attributes) => Carbon::parse($attributes['ngaySinh'])->age,
        );
    }

    public function duocNhanThuongs()
    {
        return $this->hasMany(DuocNhanThuong::class, 'idNhanKhau', 'id');
    }

    public function chungMinhThu()
    {
        return $this->hasOne(ChungMinhThu::class, 'idNhanKhau', 'id');
    }

    public function tamVang()
    {
        return $this->hasMany(TamVang::class, 'idNhanKhau', 'id');
    }

    public function tamTru()
    {
        return $this->hasMany(TamTru::class, 'idNhanKhau', 'id');
    }

    public function thanhVienHo()
    {
        return $this->hasOne(ThanhVienHo::class, 'idNhanKhau', 'id');
    }

    public function duocKhaiTu()
    {
        return $this->hasOne(KhaiTu::class, 'idNguoiChet', 'id');
    }

    public function khaiTu()
    {
        return $this->hasMany(KhaiTu::class, 'idNguoiKhaiTu', 'id');
    }
}