<?php

namespace App\Models;

use App\Models\NhanKhau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TamVang extends Model
{
    use HasFactory;

    protected $table = 'tam_vang';

    protected $fillable = [
        'idNhanKhau',
        'maGiayTamVang',
        'noiTamTru',
        'tuNgay',
        'denNgay',
        'lyDo',
    ];

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau', 'id');
    }
}
