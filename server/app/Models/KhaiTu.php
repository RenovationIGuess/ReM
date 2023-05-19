<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhaiTu extends Model
{
    use HasFactory;

    protected $table = 'khai_tu';

    protected $fillable = [
        'soGiayKhaiTu',
        'idNguoiChet',
        'idNguoiKhaiTu',
        'ngayChet',
        'lyDoChet',
        'idNguoiTao',
    ];
}
