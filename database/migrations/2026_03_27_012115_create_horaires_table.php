<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('horaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('veterinaire_id')
                  ->constrained('veterinaires')
                  ->onDelete('cascade');
            $table->enum('jour', ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']);
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->timestamps();
            
            // koula vétérinaire 3ando horaire wa7ed f koula nhar bhal matalan mn 8/6 
            $table->unique(['veterinaire_id', 'jour']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horaires');
    }
};