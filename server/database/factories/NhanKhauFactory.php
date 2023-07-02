<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NhanKhau>
 */
class NhanKhauFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ngaySinh = fake()->dateTimeBetween('-70 years', 'now');
        $ngayTao = fake()->dateTimeBetween('-10 years', 'now');
        return [
            'hoTen' => fake()->name(),
            'maNhanKhau' => "NK" . fake()->unique()->creditCardNumber(),
            'gioiTinh' => fake()->randomElement([1, 2]),
            'noiSinh' => fake()->city(),
            'ngaySinh' => $ngaySinh->format('Y-m-d H:i:s'),
            'nguyenQuan' => fake()->streetAddress(),
            'diaChiThuongTru' => fake()->streetAddress(),
            'diaChiHienTai' => fake()->streetAddress(),
            'danToc' => 'Kinh',
            'quocTich' => 'Vietnam',
            'created_at' =>  $ngayTao->format('Y-m-d H:i:s'),
        ];
    }
}