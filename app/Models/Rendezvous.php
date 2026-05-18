<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rendezvous extends Model
{
    use HasFactory;
    protected $table = 'rendezvous';
    protected $fillable = [
        'date',
        'heure',
        'statut',
        'user_id',
        'animal_id',
        'service_id',
        'veterinaire_id',
    ];
//koula wahed 3endo haga wehda 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function veterinaire()
    {
        return $this->belongsTo(Veterinaire::class);
    }
}
