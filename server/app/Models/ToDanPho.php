<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDanPho extends Model
{
    use HasFactory;

    protected $table = 'to_dan_pho';

    protected $attributes = [];

    protected $fillable = [
        'tongQuy',
    ];
}
