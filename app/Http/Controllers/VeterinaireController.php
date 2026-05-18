<?php

namespace App\Http\Controllers;

use App\Models\Veterinaire;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VeterinaireController extends Controller
{
    // kat afficher ga3 les vétérinaires
    public function index()
    {
        $veterinaires = Veterinaire::all();

        return Inertia::render('Veterinaires/Index', [
            'veterinaires' => $veterinaires
        ]);
    }

    // Formulaire d'ajout
    public function create()
    {
        return Inertia::render('Veterinaires/Create');
    }

    // Sauvegarder
    public function store(Request $request)
    {
        $request->validate([
            'nom'        => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        Veterinaire::create([
            'nom'        => $request->nom,
            'specialite' => $request->specialite,
        ]);

        return redirect()->route('veterinaires.index');
    }



    // Modifier veterinaire
    public function edit(Veterinaire $veterinaire)
    {
        return Inertia::render('Veterinaires/Edit', [
            'veterinaire' => $veterinaire
        ]);
    }

    //  Modifier 
    public function update(Request $request, Veterinaire $veterinaire)
    {
        $request->validate([
            'nom'        => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
        ]);

        $veterinaire->update([
            'nom'        => $request->nom,
            'specialite' => $request->specialite,
        ]);

        return redirect()->route('veterinaires.index');
    }

    //  Supprimer
    public function destroy(Veterinaire $veterinaire)
    {
        $veterinaire->delete();

        return redirect()->route('veterinaires.index');
    }
}