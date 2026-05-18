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
            
            // koula tbib 3endo we9t wahed fnhar maymkench ycreer lih jouj dyal lundi fsimana 
            $table->unique(['veterinaire_id', 'jour']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horaires');
    }
};