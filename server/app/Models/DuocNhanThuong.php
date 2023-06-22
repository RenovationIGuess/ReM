<?php

namespace App\Models;

use App\Models\Item;
use App\Models\SuKien;
use App\Models\NhanKhau;
use App\Models\PhanThuong;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DuocNhanThuong extends Model
{
    use HasFactory;

    protected $table = 'duoc_nhan_thuong';

    protected $attributes = [
    ];

    protected $fillable = [
        'idSuKien',
        'idNhanKhau',
        'tenTruong',
        'tenLop',
        'thanhTichHocTap',
        'capHoc',
        'anhGiayKhen',
        'hasRewarded',
        'idPhanThuong',
    ];

    // protected $appends = [
    //     'total_cost'
    // ];

    // protected function totalCost(): Attribute 
    // {
    //     return new Attribute(
    //         get: fn () => $this->calculateTotalCost(),
    //     );
    // }

    // public function calculateTotalCost()
    // {
    //     $totalCost = 0;
    //     foreach($this->phanQuas as $phanQua)
    //     {
    //         $totalCost += $phanQua->pivot->soLuong * $phanQua->unit_price;
    //     }
    //     return $totalCost;
    // }

    public function suKien()
    {
        return $this->belongsTo(SuKien::class, 'idSuKien', 'id');
    }

    public function nhanKhau()
    {
        return $this->belongsTo(NhanKhau::class, 'idNhanKhau', 'id');
    }

    public function phanThuong()
    {
        return $this->belongsTo(PhanThuong::class, 'idPhanThuong', 'id');
    }
}
