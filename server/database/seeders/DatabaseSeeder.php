<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\CapHoc;
use App\Enums\ThanhTichHocTap;
use App\Http\Controllers\NhanKhauController;
use App\Models\Item;
use App\Models\User;
use App\Models\HoKhau;
use App\Models\SuKien;
use App\Models\NhanKhau;
use App\Models\ToDanPho;
use App\Models\PhanThuong;
use App\Models\ThanhVienHo;
use App\Models\DuocNhanThuong;
use Illuminate\Database\Seeder;
use App\Models\PhanThuongDetail;
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

        // Seed ThanhVienHo
        foreach ($nhanKhaus as $nhanKhau) {
            $hoKhau = $hoKhaus->random(1);
            ThanhVienHo::create([
                'idHoKhau' => $hoKhau->first()->id,
                'idNhanKhau' => $nhanKhau->id,
                'quanHeVoiChuHo' => fake()->randomElement(['Con', 'Em', 'Cháu', 'Vợ', 'Chồng', 'Bố', 'Mẹ', 'Anh', 'Chị', 'Ông', 'Bà']),
            ]);
        }
        foreach ($hoKhaus as $hoKhau) {
            if ($hoKhau->nhanKhaus()->count() == 0) {
                $hoKhau->delete();
            } else {
                $ChuHo = $hoKhau->nhanKhaus->random(1)->first();
                $hoKhau->idChuHo = $ChuHo->id;
                $hoKhau->save();
            }
        }

        // Seed Item
        DB::table('items')->insert([
            'name' => 'Bánh Choco Pie',
            'unit_price' => 12000,
        ]);
        DB::table('items')->insert([
            'name' => 'kẹo',
            'unit_price' => 7000,
        ]);
        DB::table('items')->insert([
            'name' => 'snack 45g',
            'unit_price' => 10000,
        ]);
        DB::table('items')->insert([
            'name' => 'Vở ô li 48',
            'unit_price' => 8000,
        ]);
        DB::table('items')->insert([
            'name' => 'Vở kẻ ngang 72 trang',
            'unit_price' => 6500,
        ]);

        // Seed SuKien
        $suKiens = SuKien::factory(10)->create();

        // Seed PhanThuong
        foreach ($suKiens as $suKien) {
            if ($suKien->type == 1) {
                foreach (range(1, 4) as $capHoc) {
                    foreach (range(1, 3) as $thanhTichHocTap) {
                        PhanThuong::create([
                            'idSuKien' => $suKien->id,
                            'thanhTichHocTap' => $thanhTichHocTap,
                            'capHoc' => $capHoc,
                            'type' => 1,
                        ]);
                    }
                }
            } else if ($suKien->type == 0) {
                PhanThuong::create([
                    'idSuKien' => $suKien->id,
                    'type' => 0,
                ]);
            }
        }

        // Seed PhanThuongDetail
        $phanThuongs = PhanThuong::all();
        foreach ($phanThuongs as $phanThuong) {
            if ($phanThuong->type == 0) {
                PhanThuongDetail::create([
                    'idItem' => 2,
                    'idPhanThuong' => $phanThuong->id,
                    'soLuong' => 5,
                ]);
                PhanThuongDetail::create([
                    'idItem' => 3,
                    'idPhanThuong' => $phanThuong->id,
                    'soLuong' => 4,
                ]);
            } else if ($phanThuong->type == 1) {
                if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::GIOI && $phanThuong->capHoc == CapHoc::CAP_1) {
                    PhanThuongDetail::create([
                        'idItem' => 4,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 10,
                    ]);
                } else if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::TIEN_TIEN && $phanThuong->capHoc == CapHoc::CAP_1) {
                    PhanThuongDetail::create([
                        'idItem' => 4,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 7,
                    ]);
                } else if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::OTHER && $phanThuong->capHoc == CapHoc::CAP_1) {
                    PhanThuongDetail::create([
                        'idItem' => 4,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 5,
                    ]);
                } else if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::OTHER && ($phanThuong->capHoc == CapHoc::CAP_2 || $phanThuong->capHoc == CapHoc::CAP_3)) {
                    PhanThuongDetail::create([
                        'idItem' => 5,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 5,
                    ]);
                } else if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::TIEN_TIEN && ($phanThuong->capHoc == CapHoc::CAP_2 || $phanThuong->capHoc == CapHoc::CAP_3)) {
                    PhanThuongDetail::create([
                        'idItem' => 5,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 7,
                    ]);
                } else if ($phanThuong->thanhTichHocTap == ThanhTichHocTap::GIOI && ($phanThuong->capHoc == CapHoc::CAP_2 || $phanThuong->capHoc == CapHoc::CAP_3)) {
                    PhanThuongDetail::create([
                        'idItem' => 5,
                        'idPhanThuong' => $phanThuong->id,
                        'soLuong' => 10,
                    ]);
                }
            }
        }

        //Seed DuocNhanThuong
        $nhanKhaus = NhanKhauController::getInAgeRange(0, 18);
        foreach ($suKiens as $suKien) {
            foreach ($nhanKhaus as $nhanKhau) {
                $thanhTichHocTap = array_rand([0, 1, 2, 3]);
                $capHoc = array_rand([0, 1, 2, 3, 4]);
                $phanThuongRoot = null;
                foreach ($suKien->phanThuongs as $phanThuong) {
                    if ($phanThuong->capHoc == $capHoc && $phanThuong->thanhTichHocTap == $thanhTichHocTap) {
                        $phanThuongRoot = $phanThuong;
                    }
                }
                if ($phanThuongRoot) {
                    DuocNhanThuong::create([
                        'idSuKien' => $suKien->id,
                        'idNhanKhau' => $nhanKhau->id,
                        'tenTruong' => 'DHBKHN',
                        'tenLop' => 'Viet Nhat 03 - K65',
                        'thanhTichHocTap' => $thanhTichHocTap,
                        'capHoc' => $capHoc,
                        'idPhanThuong' => $phanThuongRoot->id,
                    ]);
                }
            }
        }

        //Seed TamTru
        $chosenNhanKhaus = $nhanKhaus->random(50);
        foreach ($chosenNhanKhaus as $nhanKhau)
        {
            $nhanKhau->tamTrus()->create([
                'maGiayTamTru' => '123345678',
                'soDienThoaiDangKy' => '0123456789',
                'tuNgay' => '2020-01-03',
                'denNgay' => '2020-02-03',
                'lyDo' => 'Cong viec',
            ]);
        }

        $chosenNhanKhaus = $nhanKhaus->random(50);
        foreach ($chosenNhanKhaus as $nhanKhau)
        {
            $nhanKhau->tamVangs()->create([
                'maGiayTamVang' => '123345678',
                'noiTamTru' => fake()->address(),
                'tuNgay' => '2023-01-02',
                'denNgay' => '2024-01-02',
                'lyDo' => 'Cong viec',
            ]);
        }
    }
}
