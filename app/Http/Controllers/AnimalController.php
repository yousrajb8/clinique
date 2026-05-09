<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalController extends Controller
{
    // kat Afficher la liste des animaux de l'utilisateur connecté
  public function index()
{
    if (auth()->user()->isAdmin()) {
        //admin kaychouf ga3 les animaux m3a les infos dyal user
        $animals = Animal::with('user')->get();
    } else {
        // user kaychouf ghir animaux dyalo
        $animals = Animal::where('user_id', auth()->id())->get();
    }

    return Inertia::render('Animals/Index', [
        'animals' => $animals
    ]);
}
    //  Formulaire de création
    public function create()
    {
        return Inertia::render('Animals/Create');
    }

    // animal jdid kaymchi l base de données
    public function store(Request $request)
    {
        $request->validate([
            'nom'  => 'required|string|max:255',
            'type' => 'required|in:chien,chat,autre',
            'age'  => 'required|integer|min:0|max:100',
        ]);

        Animal::create([
            'nom'     => $request->nom,
            'type'    => $request->type,
            'age'     => $request->age,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('animals.index');
    }

    // kat affichi les détails d'un animal
    public function show(Animal $animal)
    {
        return Inertia::render('Animals/Show', [
            'animal' => $animal
        ]);
    }

    // Formulaire de modification
    public function edit(Animal $animal)
    {
        return Inertia::render('Animals/Edit', [
            'animal' => $animal
        ]);
    }

    //  Mise à jour les informations de l'animal
    public function update(Request $request, Animal $animal)
    {
        $request->validate([
            'nom'  => 'required|string|max:255',
            'type' => 'required|in:chien,chat,autre',
            'age'  => 'required|integer|min:0|max:100',
        ]);

        $animal->update([
            'nom'  => $request->nom,
            'type' => $request->type,
            'age'  => $request->age,
        ]);

        return redirect()->route('animals.index');
    }

    // Supprimer un animal
    public function destroy(Animal $animal)
    {
        $animal->delete();

        return redirect()->route('animals.index');
    }
}