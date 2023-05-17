<?php

namespace App\Models;

use App\Models\NhanKhau;
use App\Models\DuocNhanThuong;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SuKien extends Model
{
    use HasFactory;

    protected $table = 'su_kien';

    protected $attributes = [];

    protected $fillable = [
        'name',
        'ngayBatDau',
    ];

    public function duocNhanThuongs()
    {
        return $this->hasMany(DuocNhanThuong::class, 'idSuKien', 'id');
    }

    public function nhanKhaus()
    {
        return $this->belongsToMany(NhanKhau::class, 'duoc_nhan_thuong', 'idNhanKhau', 'idSuKien');
    }
}
