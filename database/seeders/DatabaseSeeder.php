<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\Rendezvous;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    
        $this->call([
            AdminSeeder::class,
            ServiceSeeder::class,
            VeterinaireSeeder::class,
            HoraireSeeder::class, 
        ]);

        
        User::factory(10)->create();
        Animal::factory(20)->create();
        Rendezvous::factory(15)->create();
    }
}