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
        Schema::create('ho_khau', function (Blueprint $table) {
            $table->id();
            $table->string('maHoKhau')->unique();
            $table->unsignedBigInteger('idChuHo')->nullable();
            $table->string('maKhuVuc')->nullable();
            $table->string('diaChi')->nullable();
            $table->date('ngayLap')->nullable();
            $table->date('ngayChuyenDi')->nullable();
            $table->string('lyDoChuyen')->nullable();
            $table->timestamps();

            // Create foreign key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ho_khau');
    }
};
