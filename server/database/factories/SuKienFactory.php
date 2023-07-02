<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SuKien>
 */
class SuKienFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement([0, 1]);
        $year = fake()->numberBetween(2010, 2025);
        $startYear = $year - 2023;
        $name = $type ? 
            fake()->randomElement(['Cuối Năm ', 'Tuyên Dương Khen Thưởng ']) . $year : 
            fake()->randomElement(['Trung Thu ', 'Tết Thiếu Nhi ']) . $year;
        $ngayBatDau = $startYear <= 0 ? fake()->dateTimeBetween($startYear . ' years', 'now') : fake()->dateTimeBetween('now', $startYear . ' years');
        return [
            'name' => $name,
            'ngayBatDau' => $ngayBatDau,
            'type' => $type,
        ];
    }
}