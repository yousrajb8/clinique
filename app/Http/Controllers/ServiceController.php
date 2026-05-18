<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    // kat3tina les services li kaynin
    public function index()
    {
        $services = Service::all();

        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    // formulaire bach n zid service jdida
    public function create()
    {
        return Inertia::render('Services/Create');
    }

    //ajouter service jdid
    public function store(Request $request)
    {
        $request->validate([
            'nom'  => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
        ]);

        Service::create([
            'nom'  => $request->nom,
            'prix' => $request->prix,
        ]);

        return redirect()->route('services.index');
    }

    
    // formulaire de modification
    public function edit(Service $service)
    {
        return Inertia::render('Services/Edit', [
            'service' => $service
        ]);
    }

    //  Modifier
    public function update(Request $request, Service $service)
    {
        $request->validate([
            'nom'  => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
        ]);

        $service->update([
            'nom'  => $request->nom,
            'prix' => $request->prix,
        ]);

        return redirect()->route('services.index');
    }

    //  Supprimer
    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('services.index');
    }
}