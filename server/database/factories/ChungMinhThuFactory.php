<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChungMinhThu>
 */
class ChungMinhThuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idNhanKhau' => 1,
            'soCMT' => fake()->unique()->creditCardNumber(),
            'ngayCap' => fake()->dateTimeThisYear(),
            'noiCap' => "Cuc canh sat Ha Noi",
        ];
    }
}