<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TamTru extends Model
{
    use HasFactory;

    protected $table = 'tam_tru';

    protected $fillable = [
        'idNhanKhau',
        'maGiayTamTru',
        'soDienThoaiDangKy',
        'tuNgay',
        'denNgay',
        'lyDo',
    ];
}
