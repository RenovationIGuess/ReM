<?php

use App\Models\NhanKhau;
use App\Models\SuKien;
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
        Schema::create('duoc_nhan_thuong', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idSuKien')->nullable();
            $table->unsignedBigInteger('idNhanKhau')->nullable();
            $table->string('tenTruong')->nullable();
            $table->string('tenLop')->nullable();
            $table->integer('thanhTichHocTap')->nullable();
            $table->string('anhGiayKhen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('duoc_nhan_thuong');
    }
};
