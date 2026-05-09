<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
  use HasFactory;

    protected $fillable = ['nom', 'type', 'age', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);// الحيوان **ينتمي** لمستخدم واحد
    }

    public function rendezvous()
    {
        return $this->hasMany(Rendezvous::class);//الحيوان **عنده** عدة مواعيد
    }
}
