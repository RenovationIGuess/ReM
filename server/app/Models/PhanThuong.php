<?php

namespace App\Models;

use App\Models\Item;
use App\Models\SuKien;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PhanThuong extends Model
{
    use HasFactory;

    protected $table = 'phan_thuong';

    protected $attributes = [];

    protected $fillable = [
        'idSuKien',
        'thanhTichHocTap',
        'capHoc',
        'type',
    ];

    protected $appends = [
        'cost',
        'count',
    ];

    protected function cost(): Attribute
    {
        return new Attribute(
            get: fn () => $this->calculateCost(),
        );
    }

    protected function count(): Attribute
    {
        return new Attribute(
            get: fn () => $this->calculateCount(),
        );
    }

    public function suKien()
    {
        return $this->belongsTo(SuKien::class, 'idSuKien', 'id');
    }

    public function duocNhanThuongs()
    {
        return $this->hasMany(DuocNhanThuong::class, 'idPhanThuong', 'id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'phan_thuong_details', 'idPhanThuong', 'idItem')->withPivot(['soLuong']);
    }

    public function calculateCost()
    {
        $cost = 0;
        foreach($this->items as $item)
        {
            $cost += $item->pivot->soLuong * $item->unit_price;
        }
        return $cost;
    }

    public function calculateCount()
    {
        return $this->duocNhanThuongs()->count();
    }
}
