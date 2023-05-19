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
        Schema::create('chung_minh_thu', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idNhanKhau')->nullable();
            $table->string('soCMT')->nullable();
            $table->date('ngayCap')->nullable();
            $table->string('noiCap')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chung_minh_thu');
    }
};
