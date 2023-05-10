<?php

namespace App\Models;

use App\Models\NhanKhau;
use App\Models\PhanThuong;
use App\Models\DuocNhanThuong;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SuKien extends Model
{
    use HasFactory;

    protected $table = 'su_kien';

    protected $attributes = [];

    protected $fillable = [
        'name',
        'ngayBatDau',
        'isDone',
        'type',
    ];

    protected $appends = [
        'total_cost',
    ];

    protected function totalCost(): Attribute
    {
        return new Attribute(
            get: fn() => $this->calculateTotalCost(),
        );
    }

    public function duocNhanThuongs()
    {
        return $this->hasMany(DuocNhanThuong::class, 'idSuKien', 'id');
    }

    public function nhanKhaus()
    {
        return $this->belongsToMany(NhanKhau::class, 'duoc_nhan_thuong', 'idNhanKhau', 'idSuKien');
    }

    public function phanThuongs()
    {
        return $this->hasMany(PhanThuong::class, 'idSuKien', 'id');
    }

    public function calculateTotalCost()
    {
        $totalCost = 0;
        foreach ($this->phanThuongs as $phanThuong) {
            $totalCost += $phanThuong->cost * $phanThuong->count;
        }
        return $totalCost;
    }
}