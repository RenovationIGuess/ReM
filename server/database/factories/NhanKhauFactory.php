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
        return [
            'hoTen' => fake()->name(),
            'maNhanKhau' => fake()->unique()->creditCardNumber(),
            'gioiTinh' => fake()->randomElement(['Nam', 'Nu']),
            'noiSinh' => fake()->city(),
            'ngaySinh' => fake()->dateTimeThisCentury(),
            'nguyenQuan' => fake()->streetAddress(),
            'diaChiThuongTru' => fake()->streetAddress(),
            'diaChiHienTai' => fake()->streetAddress(),
            'danToc' => 'Kinh',
            'quocTich' => 'Vietnam',
        ];
    }
}
