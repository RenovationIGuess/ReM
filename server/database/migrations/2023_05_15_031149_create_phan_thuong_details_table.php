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
            $table->unsignedBigInteger('idPhanThuong');
            $table->unsignedBigInteger('idItem');
            $table->unsignedBigInteger('soLuong');

            $table->foreign('idPhanThuong')->references('id')->on('phan_thuong')->cascadeOnDelete();
            $table->foreign('idItem')->references('id')->on('items')->cascadeOnDelete();
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
