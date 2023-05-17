<?php

namespace App\Models;

use App\Models\SuKien;
use App\Models\PhanQua;
use App\Models\NhanKhau;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DuocNhanThuong extends Model
{
    use HasFactory;

    protected $table = 'duoc_nhan_thuong';

    protected $attributes = [];

    protected $fillable = [
        'idSuKien',
        'idNhanKhau',
        'tenTruong',
        'tenLop',
        'thanhTichHocTap',
        'anhGiayKhen',
    ];

    public function suKien()
    {
        return $this->belongsTo(SuKien::class, 'idSuKien', 'id');
    }

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau', 'id');
    }

    public function phanQuas()
    {
        return $this->belongsToMany(PhanQua::class, 'phan_thuong_details', 'idPhanQua', 'idDuocNhanThuong')
            ->withPivot('soLuong');
    }

    public function totalCost()
    {
        $totalCost = 0;
        foreach($this->phanQuas as $phanQua)
        {
            $totalCost += $phanQua->pivot->soLuong * $phanQua->unit_price;
        }
        return $totalCost;
    }
}
