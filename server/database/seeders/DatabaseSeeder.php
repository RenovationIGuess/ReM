<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DuocNhanThuong;
use App\Models\PhanQua;
use App\Models\PhanThuongDetail;
use App\Models\SuKien;
use App\Models\ThanhVienHo;
use App\Models\ToDanPho;
use App\Models\User;
use App\Models\HoKhau;
use App\Models\NhanKhau;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Bui Dung',
            'username' => 'user1',
            'password' => Hash::make('123456')
        ]);

        // Seed ToDanPho
        ToDanPho::factory(3)->create();

        // Seed NhanKhau
        $nhanKhaus = NhanKhau::factory(300)->create();

        // Seed HoKhau
        $hoKhaus = HoKhau::factory(60)->create();

        // Seed SuKien
        $suKiens = SuKien::factory(10)->create();

        // Seed DuocNhanThuong
        foreach ($nhanKhaus as $nhanKhau){
            foreach($suKiens->random(3)->collect() as $chosenSuKien){
                DuocNhanThuong::create([
                    'idNhanKhau' => $nhanKhau->id,
                    'idSuKien' => $chosenSuKien->id,
                    'tenTruong' => 'DHBKHN',
                    'tenLop' => 'Viet Nhat 03 - K65',
                    'thanhTichHocTap' => fake()->randomElement([1, 2, 3]),
                    'anhGiayKhen' => fake()->url(),
                ]);
            }
        }

        // Seed ThanhVienHo
        foreach($nhanKhaus as $nhanKhau) {
            $hoKhau = $hoKhaus->random(1);
            ThanhVienHo::create([
                'idHoKhau' => $hoKhau->first()->id,
                'idNhanKhau' => $nhanKhau->id,
                'quanHeVoiChuHo' => fake()->randomElement(['Con', 'Em', 'Chau', 'Vo', 'Chong']),
            ]);
        }
        foreach($hoKhaus as $hoKhau)
        {
            if ($hoKhau->nhanKhaus()->count() == 0){
                $hoKhau->delete();
            } else {
                $ChuHo = $hoKhau->nhanKhaus->random(1)->first();
                $hoKhau->idChuHo = $ChuHo->id;
                $hoKhau->save();
            }
        }

        // Seed PhanQua
        DB::table('phan_qua')->insert([
            'name' => 'Bánh Choco Pie',
            'unit_price' => 12000,
        ]);
        DB::table('phan_qua')->insert([
            'name' => 'kẹo',
            'unit_price' => 7000,
        ]);
        DB::table('phan_qua')->insert([
            'name' => 'snack 45g',
            'unit_price' => 10000,
        ]);
        DB::table('phan_qua')->insert([
            'name' => 'Vở ô li 48',
            'unit_price' => 8000,
        ]);
        DB::table('phan_qua')->insert([
            'name' => 'Vở kẻ ngang 72 trang',
            'unit_price' => 6500,
        ]);
        
        // Seed PhanThuongDetail
        $duocNhanThuongs = DuocNhanThuong::all();
        $phanQuas = PhanQua::all();
        foreach ($duocNhanThuongs as $duocNhanThuong){
            foreach($phanQuas->random(3)->collect() as $phanQua){
                PhanThuongDetail::create([
                    'idDuocNhanThuong' => $duocNhanThuong->id,
                    'idPhanQua' => $phanQua->id,
                    'soLuong' => fake()->numberBetween(1, 3),
                ]);
            }
        }

    }
}