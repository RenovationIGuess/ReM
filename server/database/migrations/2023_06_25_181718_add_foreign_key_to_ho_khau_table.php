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
        Schema::table('ho_khau', function (Blueprint $table) {
            if (Schema::hasColumn('ho_khau', 'idChuHo')) {
                $table->foreign('idChuHo')
                    ->references('id')->on('nhan_khau');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ho_khau', function (Blueprint $table) {
            if (Schema::hasColumn('ho_khau', 'idChuHo')) {
                $table->dropForeign(['idChuHo']);
            }
        });
    }
};