<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';

    protected $attributes = [];

    protected $fillable = [
        'name',
        'unit_price',
    ];

    public $timestamps = false;

    public function phanThuongs()
    {
        return $this->belongsToMany(DuocNhanThuong::class, 'phan_thuong_details', 'idDuocNhanThuong', 'idPhanQua');
    }
}
