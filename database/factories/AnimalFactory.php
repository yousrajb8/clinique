<?php

namespace Database\Factories;

use App\Models\User;        
use App\Models\Animal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom'     => $this->faker->firstName(),
            'type'    => $this->faker->randomElement(['chien', 'chat', 'autre']),
            'age'     => $this->faker->numberBetween(1, 15),
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        ];
    }
}
