<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhanThuongDetail extends Model
{
    use HasFactory;

    protected $table = 'phan_thuong_details';

    protected $attributes = [];

    protected $fillable = [
        'idItem',
        'idPhanThuong',
        'soLuong',
    ];

    public $timestamps = false;
}
