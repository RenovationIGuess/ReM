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
        Schema::create('khai_tu', function (Blueprint $table) {
            $table->id();
            $table->string('soGiayKhaiTu')->nullable();
            $table->unsignedBigInteger('idNguoiChet')->nullable();
            $table->unsignedBigInteger('idNguoiKhaiTu')->nullable();
            $table->date('ngayChet')->nullable();
            $table->string('lyDoChet')->nullable();
            $table->unsignedBigInteger('idNguoiTao')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('khai_tu');
    }
};
