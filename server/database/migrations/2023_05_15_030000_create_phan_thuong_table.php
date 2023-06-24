<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phan_thuong', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idSuKien');
            $table->smallInteger('thanhTichHocTap')->default(0)->comment='0:null, 1:tien tien, 2:gioi, 3:other';
            $table->smallInteger('capHoc')->default(0)->comment='0:null, 1:mau giao, 2:cap 1, 3:cap 2, 4: cap 3';
            $table->unsignedBigInteger('type')->comment='0: not related to study, 1: related';
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phan_thuong');
    }
};
