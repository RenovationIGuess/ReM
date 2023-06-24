<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('thanh_vien_ho', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idHoKhau')->nullable();
            $table->unsignedBigInteger('idNhanKhau')->nullable();
            $table->string('quanHeVoiChuHo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thanh_vien_ho');
    }
};