<?php

namespace Database\Seeders;

use App\Models\Horaire;
use App\Models\Veterinaire;
use Illuminate\Database\Seeder;

class HoraireSeeder extends Seeder
{
    public function run(): void
    {
        $veterinaires = Veterinaire::all();

        // les horaires dyal koula vétérinaire (exemple)
        $horaires = [
            'Dr Ahmed' => [
                'lundi'    => ['09:00', '17:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['09:00', '13:00'],
                'jeudi'    => ['09:00', '17:00'],
                'vendredi' => ['09:00', '13:00'],
            ],
            'Dr Sara' => [
                'lundi'    => ['10:00', '16:00'],
                'mardi'    => ['09:00', '12:00'],
                'mercredi' => ['09:00', '17:00'],
                'jeudi'    => ['09:00', '17:00'],
                'vendredi' => ['09:00', '12:00'],
            ],
            'Dr Karim' => [
                'lundi'    => ['09:00', '17:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['13:00', '17:00'],
                'jeudi'    => ['09:00', '13:00'],
                'vendredi' => ['09:00', '12:00'],
            ],
            'Dr Fatima' => [
                'lundi'    => ['09:00', '17:00'],
                'mardi'    => ['09:00', '13:00'],
                'mercredi' => ['09:00', '17:00'],
                'jeudi'    => ['13:00', '17:00'],
                'vendredi' => ['09:00', '12:00'],
            ],
            'Dr Youssef' => [
                'lundi'    => ['09:00', '17:00'],
                'mardi'    => ['13:00', '17:00'],
                'mercredi' => ['09:00', '17:00'],
                'jeudi'    => ['09:00', '13:00'],
                'vendredi' => ['09:00', '12:00'],
            ],
            'Dr Nadia' => [
                'lundi'    => ['09:00', '12:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['09:00', '13:00'],
                'jeudi'    => ['09:00', '17:00'],
                'vendredi' => ['13:00', '17:00'],
            ],
            'Dr Omar' => [
                'lundi'    => ['13:00', '17:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['09:00', '12:00'],
                'jeudi'    => ['09:00', '17:00'],
                'vendredi' => ['09:00', '12:00'],
            ],
            'Dr Leila' => [
                'lundi'    => ['09:00', '13:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['13:00', '17:00'],
                'jeudi'    => ['09:00', '13:00'],
                'vendredi' => ['09:00', '17:00'],
            ],
        ];

        foreach ($veterinaires as $vet) {
            $vetHoraires = $horaires[$vet->nom] ?? [
                'lundi'    => ['09:00', '17:00'],
                'mardi'    => ['09:00', '17:00'],
                'mercredi' => ['09:00', '17:00'],
                'jeudi'    => ['09:00', '17:00'],
                'vendredi' => ['09:00', '17:00'],
            ];

            foreach ($vetHoraires as $jour => $creneau) {
                Horaire::create([
                    'veterinaire_id' => $vet->id,
                    'jour'           => $jour,
                    'heure_debut'    => $creneau[0],
                    'heure_fin'      => $creneau[1],
                ]);
            }
        }
    }
}