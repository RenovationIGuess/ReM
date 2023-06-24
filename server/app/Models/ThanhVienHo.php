<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThanhVienHo extends Model
{
    use HasFactory;

    protected $table = 'thanh_vien_ho';

    protected $fillable = [
        'quanHeVoiChuHo',
        'idHoKhau',
        'idNhanKhau',
    ];

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau');
    }

    public function hoKhau()
    {
        return $this->belongsTo(HoKhau::class, 'idHoKhau');
    }
}