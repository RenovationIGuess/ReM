<?php

namespace App\Models;

use App\Models\NhanKhau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau', 'id');
    }
}
