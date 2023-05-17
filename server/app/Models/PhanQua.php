<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhanQua extends Model
{
    use HasFactory;

    protected $table = 'phan_qua';

    protected $attributes = [];

    protected $fillable = [
        'name',
        'unit_price',
    ];

    public function duocNhanThuongs()
    {
        return $this->belongsToMany(DuocNhanThuong::class, 'phan_thuong_details', 'idDuocNhanThuong', 'idPhanQua');
    }
}
