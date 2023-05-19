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
        Schema::create('tam_tru', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idNhanKhau')->nullable();
            $table->string('maGiayTamTru')->nullable();
            $table->string('soDienThoaiDangKy')->nullable();
            $table->date('tuNgay')->nullable();
            $table->date('denNgay')->nullable();
            $table->string('lyDo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tam_tru');
    }
};
