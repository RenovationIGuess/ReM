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
        Schema::create('nhan_khau', function (Blueprint $table) {
            $table->id();
            $table->string('maNhanKhau')->unique();
            $table->string('hoTen');
            $table->string('biDanh')->nullable();
            $table->string('gioiTinh');
            $table->string('noiSinh');
            $table->date('ngaySinh')->nullable();
            $table->string('nguyenQuan')->nullable();
            $table->string('diaChiThuongTru')->nullable();
            $table->string('diaChiHienTai')->nullable();
            $table->string('dantoc')->nullable();
            $table->string('quocTich')->nullable();
            $table->string('tonGiao')->nullable();
            $table->string('soHoChieu')->nullable();
            $table->string('trinhDoHocVan')->nullable();
            $table->string('ngheNghiep')->nullable();
            $table->string('noiLamViec')->nullable();
            $table->string('tienAn')->nullable();
            $table->date('ngayChuyenDen')->nullable();
            $table->string('lyDoChuyenDen')->nullable();
            $table->date('ngayChuyenDi')->nullable();
            $table->string('lyDoChuyenDi')->nullable();
            $table->string('diaChiMoi')->nullable();
            $table->unsignedBigInteger('idNguoiTao')->nullable();
            $table->unsignedSmallInteger('status')->default(1);
            $table->unsignedBigInteger('idNguoiXoa')->nullable();
            $table->string('lydoXoa')->nullable();
            $table->string('ghiChu')->nullable();
            $table->timestamps();

            // Create foreign key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nhan_khau');
    }
};
