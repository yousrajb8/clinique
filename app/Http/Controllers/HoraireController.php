<?php

namespace App\Http\Controllers;

use App\Models\Horaire;
use App\Models\Veterinaire;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HoraireController extends Controller
{
    // Afficher la liste des horaires (kat koun ghir 3end admin)
    public function index()
    {
        if (!auth()->user()->isAdmin()) {
            return redirect()->route('dashboard');
        }

        $horaires = Horaire::with('veterinaire')->get();
        $veterinaires = Veterinaire::all();

        return Inertia::render('Horaires/Index', [
            'horaires' => $horaires,
            'veterinaires' => $veterinaires
        ]);
    }

    // Sauvegarder un nouvel horaire
    public function store(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            return abort(403);
        }

        $request->validate([
            'veterinaire_id' => 'required|exists:veterinaires,id',
            'jour'           => 'required|in:lundi,mardi,mercredi,jeudi,vendredi,samedi',
            'heure_debut'    => 'required',
            'heure_fin'      => 'required|after:heure_debut',
        ]);

        // Vérifi si un horaire existe déjà pour ce vétérinaire ce jour-là
        Horaire::updateOrCreate(
            [
                'veterinaire_id' => $request->veterinaire_id,
                'jour'           => $request->jour,
            ],
            [
                'heure_debut'    => $request->heure_debut,
                'heure_fin'      => $request->heure_fin,
            ]
        );

        return redirect()->back()->with('success', 'Horaire enregistré avec succès.');
    }

    // Supprimer un horaire
    public function destroy(Horaire $horaire)
    {
        if (!auth()->user()->isAdmin()) {
            return abort(403);
        }

        $horaire->delete();

        return redirect()->back()->with('success', 'Horaire supprimé.');
    }
}
