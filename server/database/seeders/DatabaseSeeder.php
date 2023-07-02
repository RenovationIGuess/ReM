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
        $nhanKhaus = NhanKhau::factory(1400)->create();

        // Seed HoKhau
        $hoKhaus = HoKhau::factory(400)->create();

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
            'image_url' => 'https://cdn.tgdd.vn/Products/Images//7622/76993/bhx/files/banh-choco-pie-hop-396g-12-cai-202209200912390465.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Kẹo',
            'unit_price' => 7000,
            'image_url' => 'https://vn-test-11.slatic.net/p/cf8b1a27480ff3839cba375c3b58dacd.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Snack 45g',
            'unit_price' => 10000,
            'image_url' => 'https://product.hstatic.net/1000246697/product/8934803043884_cd97a496ec95439bb53eac11b849b0f3_bf55ad9d2a924f318fe13c3eac53847a_large.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Snack khoai tây Lay\'s 95g',
            'unit_price' => 16000,
            'image_url' => 'https://banhkeogiare.com/wp-content/uploads/2019/10/4.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Sữa chua Vinamilk nha đam 100g',
            'unit_price' => 7000,
            'image_url' => 'https://banhkeogiare.com/wp-content/uploads/2019/10/4.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Sữa chua nha đam hũ 100g Dalatmilk',
            'unit_price' => 9000,
            'image_url' => 'https://suadalat.com/wp-content/uploads/2021/09/SCA-Nha-dam-100g-1.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Bánh gạo An vị tảo (14 gói)',
            'unit_price' => 3500,
            'image_url' => 'https://product.hstatic.net/200000352097/product/582ef2eff9a88ea2648f0f768b336d28_cb5702b5bdbd41c5835336d0a75970df_1024x1024.png',
        ]);
        DB::table('items')->insert([
            'name' => 'Vở ô li 48 trang',
            'unit_price' => 8000,
            'image_url' => 'https://bizweb.dktcdn.net/100/068/379/products/2623872bia-bac-ho1.png?v=1505203809793'
        ]);
        DB::table('items')->insert([
            'name' => 'Vở kẻ ngang 72 trang',
            'unit_price' => 6500,
            'image_url' => 'https://prooffice.vn/wp-content/uploads/2020/02/V%E1%BB%9F-k%E1%BA%BB-ngang-HT-Haplus-Fruit-5655-80-trang.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Vở kẻ ngang Campus Landscape 120 trang',
            'unit_price' => 12300,
            'image_url' => 'https://vppminhkhoi.vn/wp-content/uploads/2021/10/mn.jpg',
        ]);
        DB::table('items')->insert([
            'name' => 'Vở kẻ ngang Campus Gift 96 trang',
            'unit_price' => 10500,
            'image_url' => 'https://salt.tikicdn.com/cache/w1200/ts/product/0d/03/c1/9d8f89473d56b0ff611f956e73b2c857.jpg',
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
                $age = $nhanKhau->age;
                $capHoc = 0;
                if ($suKien->type == 1) {
                    switch(true){
                        case ($age < 6):
                            $capHoc = CapHoc::MAU_GIAO;
                            break;
                        case ($age >= 6 && $age <= 10):
                            $capHoc = CapHoc::CAP_1;
                            break;
                        case ($age >= 11 && $age <= 15):
                            $capHoc = CapHoc::CAP_2;
                            break;
                        case ($age >- 16 && $age <= 18):
                            $capHoc = CapHoc::CAP_3;
                            break;
                    }
                }
                $phanThuongRoot = null;
                foreach ($suKien->phanThuongs as $phanThuong) {
                    if ($phanThuong->capHoc == $capHoc && $phanThuong->thanhTichHocTap == $thanhTichHocTap) {
                        $phanThuongRoot = $phanThuong;
                    }
                }
                $tenTruong = null;
                $tenLop = null;
                switch($capHoc){
                    case CapHoc::MAU_GIAO:
                        $tenTruong = 'Mầm non Hoa Mai';
                        $tenLop = 'Mẫu giáo nhỡ';
                        break;
                    case CapHoc::CAP_1:
                        $tenTruong = 'Tiểu học Mạc Đĩnh Chi';
                        $tenLop = fake()->numberBetween(1, 5) . fake()->randomElement(['A','B','C','D','E']);
                        break;
                    case CapHoc::CAP_2:
                        $tenTruong = fake()->randomElement(['THCS Lê Quý Đôn', 'THCS Liên Hà']);
                        $tenLop = fake()->numberBetween(6, 9) . fake()->randomElement(['A','B','C','D','E']);
                        break;
                    case CapHoc::CAP_3:
                        $tenTruong = fake()->randomElement(['THPT Chuyên KHTN','THPT chuyên ĐHSP', 'THPT Liên Hà']);
                        $tenLop = fake()->numberBetween(10, 12) . fake()->randomElement(['A','B','A1','D']) . fake()->numberBetween(1,3);
                        break;
                }
                if ($phanThuongRoot) {
                    DuocNhanThuong::create([
                        'idSuKien' => $suKien->id,
                        'idNhanKhau' => $nhanKhau->id,
                        'tenTruong' => $tenTruong,
                        'tenLop' => $tenLop,
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
                'maGiayTamTru' => 'TT' . fake()->creditCardNumber(),
                'soDienThoaiDangKy' => fake()->unique()->phoneNumber(),
                'tuNgay' => fake()->dateTimeBetween('-2 years', 'now'),
                'denNgay' => fake()->dateTimeBetween('now', '+2 years'),
                'lyDo' => fake()->randomElement(['Công việc', 'Học tập', 'Quân sự']),
            ]);
        }

        //Seed TamVang
        $chosenNhanKhaus = $nhanKhaus->random(50);
        foreach ($chosenNhanKhaus as $nhanKhau)
        {
            $nhanKhau->tamVangs()->create([
                'maGiayTamVang' => 'TV' . fake()->creditCardNumber(),
                'noiTamTru' => fake()->address(),
                'tuNgay' => fake()->dateTimeBetween('-2 years', 'now'),
                'denNgay' => fake()->dateTimeBetween('now', '+1 years'),
                'lyDo' => fake()->randomElement(['Công việc', 'Học tập', 'Quân sự']),
            ]);
        }

        $oldNhanKhaus = NhanKhauController::getInAgeRange(14, 100);
        foreach($oldNhanKhaus as $nhanKhau) {
            $nhanKhau->chungMinhThu()->create([
                'soCMT' => fake()->unique()->creditCardNumber(),
                'ngayCap' => fake()->dateTimeThisDecade(),
                'noiCap' => fake()->randomElement(['Hà Nội', 'Bắc Ninh', 'Hưng Yên', 'Lạng Sơn', 'Quảng Ninh', 'Sơn La']),
            ]);
        }

        //Seed KhaiTu
        $deadNhanKhaus = NhanKhauController::getInAgeRange(60, 100);
        $nguoiKhaiTus = NhanKhauController::getInAgeRange(20, 60);
        foreach($deadNhanKhaus as $nhanKhau) {
            $nhanKhau->duocKhaiTu()->create([
                'soGiayKhaiTu' => 'KT' . fake()->creditCardNumber(),
                'idNguoiKhaiTu' => $nguoiKhaiTus->random(1)->first()->id,
                'ngayChet' => fake()->dateTimeBetween('-5 years', 'now'),
                'lyDoChet' => 'Tuổi cao sức yếu',
                'idNguoiTao' => 1,
            ]);
            $nhanKhau->ghiChu = 'Đã qua đời';
            $nhanKhau->save();
        }
    }
}
