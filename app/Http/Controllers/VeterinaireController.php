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
        $services = \App\Models\Service::all();
        return Inertia::render('Veterinaires/Create', [
            'services' => $services
        ]);
    }

    // Sauvegarder
    public function store(Request $request)
    {
        $request->validate([
            'nom'        => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
        ]);

        Veterinaire::create([
            'nom'        => $request->nom,
            'specialite' => $request->specialite,
            'service_id' => $request->service_id,
        ]);

        return redirect()->route('veterinaires.index');
    }



    // Modifier veterinaire
    public function edit(Veterinaire $veterinaire)
    {
        $services = \App\Models\Service::all();
        return Inertia::render('Veterinaires/Edit', [
            'veterinaire' => $veterinaire,
            'services' => $services
        ]);
    }

    //  Modifier 
    public function update(Request $request, Veterinaire $veterinaire)
    {
        $request->validate([
            'nom'        => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
        ]);

        $veterinaire->update([
            'nom'        => $request->nom,
            'specialite' => $request->specialite,
            'service_id' => $request->service_id,
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