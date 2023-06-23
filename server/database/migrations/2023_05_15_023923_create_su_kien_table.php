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
        Schema::create('su_kien', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('ngayBatDau')->nullable();
            $table->boolean('isDone')->default(false);
            $table->smallInteger('type')->default(1)->comment = "0: not related to study, 1: related";
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('su_kien');
    }
};