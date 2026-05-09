<?php

namespace Database\Factories;
use App\Models\Rendezvous;
use App\Models\Animal;
use App\Models\Service;
use App\Models\User;
use App\Models\Veterinaire;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends Factory<Rendezvous>
 */
class RendezvousFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date'            => $this->faker->dateTimeBetween('now', '+1 month'),
            'heure'           => $this->faker->time('H:i'),
            'statut'          => $this->faker->randomElement(['en_attente', 'confirme', 'annule']),
            'user_id'         => User::factory(),
            'animal_id'       => Animal::factory(),
            'service_id'      => Service::inRandomOrder()->first()->id,
            'veterinaire_id'  => Veterinaire::inRandomOrder()->first()->id,
        ];
    }
}
