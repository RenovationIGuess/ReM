<?php

use App\Models\NhanKhau;
use App\Models\SuKien;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('duoc_nhan_thuong', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idSuKien');
            $table->unsignedBigInteger('idNhanKhau');
            $table->string('tenTruong')->nullable();
            $table->string('tenLop')->nullable();
            $table->smallInteger('thanhTichHocTap')->default(0)->comment='0:null, 1:tien tien, 2:gioi, 3:other';
            $table->smallInteger('capHoc')->default(0)->comment='0:null, 1:mau giao, 2:cap 1, 3:cap 2, 4: cap 3';
            $table->string('anhGiayKhen')->nullable();
            $table->boolean('hasRewarded')->default(false);
            $table->unsignedBigInteger('idPhanThuong');
            $table->timestamps();

            $table->foreign('idPhanThuong')->references('id')->on('phan_thuong')->cascadeOnDelete();
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