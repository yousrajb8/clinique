<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'veterinaire_id',
        'jour',
        'heure_debut',
        'heure_fin',
    ];
//horaire 3ndo veterinaire wahed
    public function veterinaire()
    {
        return $this->belongsTo(Veterinaire::class);
    }
}