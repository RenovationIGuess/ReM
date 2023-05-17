<?php

use App\Models\DuocNhanThuong;
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
        Schema::create('phan_thuong_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idDuocNhanThuong')->nullable();
            $table->unsignedBigInteger('idPhanQua')->nullable();
            $table->unsignedBigInteger('soLuong')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phan_thuong_details');
    }
};
