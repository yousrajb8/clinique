<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prix'];

    // koula service 3ando plusieurs vétérinaires
    public function veterinaires()
    {
        return $this->hasMany(Veterinaire::class);
    }

        // koula service 3ando plusieurs rendez-vous
    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);
    }
}