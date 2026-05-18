<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
  use HasFactory;

    protected $fillable = ['nom', 'type', 'age', 'user_id'];
//animal 3endo user wahed
    public function user()
    {
        
        return $this->belongsTo(User::class);
    }
//animal 3endo bzf dyl rdv
    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);
    }
}
