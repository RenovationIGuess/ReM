<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DinhChinh extends Model
{
    use HasFactory;

    protected $table = 'dinh_chinh';

    protected $fillable = [
        'idHoKhau',
        'thongTinThayDoi',
        'thayDoiTu',
        'thayDoiThanh',
        'ngayThayDoi',
        'idNguoiThayDoi',
    ];
}
