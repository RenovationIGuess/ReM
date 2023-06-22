<?php

namespace App\Models;

use App\Models\User;
use App\Models\NhanKhau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function nguoiKhaiTu()
    {
        return $this->belongsTo(NhanKhau::class, 'idNguoiKhaiTu', 'id');
    }

    public function nguoiChet()
    {
        return $this->belongsTo(NhanKhau::class, 'idNguoiChet', 'id');
    }

    public function nguoiTao()
    {
        return $this->belongsTo(User::class, 'idNguoiTao', 'id');
    }
}
