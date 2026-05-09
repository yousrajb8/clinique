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
        Schema::create('veterinaires', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
              $table->string('nom');
            $table->string('specialite');
            //hna zedt colonne service_id bach n3raf veterinaire dyal achmen service 
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('veterinaires');
    }
};
