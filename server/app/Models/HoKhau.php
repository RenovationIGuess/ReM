<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
