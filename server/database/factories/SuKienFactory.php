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
        return [
            'name' => fake()->randomElement(['Trung Thu ', 'Tet Thieu Nhi ', 'Cuoi Nam ']) . fake()->year(),
            'ngayBatDau' => fake()->dateTimeThisDecade(),
        ];
    }
}
