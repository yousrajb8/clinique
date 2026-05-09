<?php

namespace Database\Seeders;
use App\Models\Service;  
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $services = [
            ['nom' => 'Consultation', 'prix' => 150],
            ['nom' => 'Vaccination',  'prix' => 200],
            ['nom' => 'Chirurgie',    'prix' => 500],
            ['nom' => 'Analyse',      'prix' => 300],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
