<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veterinaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'specialite',
        'service_id', 
    ];

    //KOULA VETERINAIRE 3ANDO SERVICE WA7ED
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // koula vétérinaire 3ando plusieurs horaires
    public function horaires()
    {
        return $this->hasMany(Horaire::class);
    }

    // koula vétérinaire 3ando plusieurs rendez-vous
    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);
    }
}