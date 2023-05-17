<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HoKhau>
 */
class HoKhauFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'maHoKhau' => fake()->unique()->creditCardNumber(),
            'maKhuVuc' => fake()->countryCode(),
            'diaChi' => fake()->streetAddress(),
            'ngayLap' => fake()->dateTimeThisDecade(),
        ];
    }
}
