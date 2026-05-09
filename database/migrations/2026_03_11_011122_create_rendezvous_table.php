<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rendezvous', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('heure');
            $table->enum('statut', ['en_attente', 'confirme', 'annule'])
                  ->default('en_attente');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('animal_id')->constrained('animals')->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('veterinaire_id')->constrained('veterinaires')->onDelete('cascade');
            $table->timestamps();

            // maymkench nefs veterinaire ykoun 3ando rendez-vous f nafs date w l'heure
            $table->unique(['veterinaire_id', 'date', 'heure'], 'unique_rdv_vet_date_heure');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendezvous');
    }
};