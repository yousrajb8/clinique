<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prix'];

    // koula service 3ando bzf dyal veterinaires 
    public function veterinaires()
    {
        return $this->hasMany(Veterinaire::class);
    }

        // koula service 3ando bzf dyal les rdv 
    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);
    }
}