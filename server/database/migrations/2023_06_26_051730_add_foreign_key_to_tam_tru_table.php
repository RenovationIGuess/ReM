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
        Schema::table('tam_tru', function (Blueprint $table) {
            if (Schema::hasColumn('tam_tru', 'idNhanKhau')) {
                $table->foreign('idNhanKhau')
                    ->references('id')->on('nhan_khau');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tam_tru', function (Blueprint $table) {
            if (Schema::hasColumn('tam_tru', 'idNhanKhau')) {
                $table->dropForeign(['idNhanKhau']);
            }
        });
    }
};