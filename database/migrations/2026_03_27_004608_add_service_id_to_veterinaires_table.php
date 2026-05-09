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
        Schema::table('veterinaires', function (Blueprint $table) {
            // Ajouter la colonne service_id
            $table->foreignId('service_id')
                  ->nullable()
                  ->constrained('services')
                  ->onDelete('set null')
                  ->after('specialite');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('veterinaires', function (Blueprint $table) {
            // Supprimer la colonne service_id
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');
        });
    }
};