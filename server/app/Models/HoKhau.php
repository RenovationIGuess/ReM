<?php

namespace App\Models;

use App\Models\NhanKhau;
use App\Models\DinhChinh;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HoKhau extends Model
{
    use HasFactory;

    protected $table = 'ho_khau';

    protected $attributes = [];

    protected $fillable = [
        'maHoKhau',
        'idChuHo',
        'maKhuVuc',
        'diaChi',
        'ngayLap',
        'ngayChuyenDi',
        'lyDoChuyen',
    ];

    public function nhanKhaus()
    {
        return $this->belongsToMany(NhanKhau::class, 'thanh_vien_ho', 'idHoKhau', 'idNhanKhau')
            ->withPivot('quanHeVoiChuHo');
    }

    public function dinhChinhs()
    {
        return $this->hasMany(DinhChinh::class, 'idHoKhau', 'id');
    }
}
