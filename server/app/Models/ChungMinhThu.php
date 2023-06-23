<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChungMinhThu extends Model
{
    use HasFactory;

    protected $table = 'chung_minh_thu';

    protected $fillable = [
        'idNhanKhau',
        'soCMT',
        'ngayCap',
        'noiCap',
    ];

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau', 'id');
    }
}