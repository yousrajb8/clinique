<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Veterinaire;
use Illuminate\Database\Seeder;

class VeterinaireSeeder extends Seeder
{
    public function run(): void
    {
        // kan jibo koula services mn db ou njibo id dyalhom
        $services = Service::all();

        $veterinaires = [
            ['nom' => 'Dr Ahmed',   'specialite' => 'Chirurgie',    'service_nom' => 'Chirurgie'],
            ['nom' => 'Dr Sara',    'specialite' => 'Vaccination',   'service_nom' => 'Vaccination'],
            ['nom' => 'Dr Karim',   'specialite' => 'Analyse',       'service_nom' => 'Analyse'],
            ['nom' => 'Dr Fatima',  'specialite' => 'Dentisterie',   'service_nom' => 'Nettoyage dentaire'],
            ['nom' => 'Dr Youssef', 'specialite' => 'Radiologie',    'service_nom' => 'Radiographie'],
            ['nom' => 'Dr Nadia',   'specialite' => 'Dermatologie',  'service_nom' => 'Consultation'],
            ['nom' => 'Dr Omar',    'specialite' => 'Ophtalmologie', 'service_nom' => 'Consultation'],
            ['nom' => 'Dr Leila',   'specialite' => 'Nutrition',     'service_nom' => 'Consultation'],
        ];

        foreach ($veterinaires as $vet) {
            // kay n9albo 3la nom service f db ou njibo id dyalo
            $service = $services->firstWhere('nom', $vet['service_nom']);
            
            Veterinaire::create([
                'nom'        => $vet['nom'],
                'specialite' => $vet['specialite'],
                'service_id' => $service ? $service->id : null, 
            ]);
        }
    }
}