<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\RendezvousConfirme;
use App\Models\Animal;
use App\Models\Rendezvous;
use App\Models\Service;
use App\Models\Veterinaire;
use App\Models\Horaire;     
use Carbon\Carbon;          
use Illuminate\Http\Request;
use Inertia\Inertia;

class RendezvousController extends Controller
{
    // Afficher tous les rendez-vous
   public function index()
{
    if (auth()->user()->isAdmin()) {
        //admin kaychouf ga3 les rdv
        $rendezvous = Rendezvous::with(['animal', 'service', 'veterinaire', 'user'])
            ->orderBy('date', 'desc')
            ->get();
    } else {
        // user kaychouf ghir rdv dyalo
        $rendezvous = Rendezvous::where('user_id', auth()->id())
            ->with(['animal', 'service', 'veterinaire'])
            ->orderBy('date', 'desc')
            ->get();
    }

    return Inertia::render('Rendezvous/Index', [
        'rendezvous' => $rendezvous
    ]);
}
    // Formulaire d'ajout
    public function create()
    {
        $animals      = Animal::where('user_id', auth()->id())->get();
        $services     = Service::all();
        $veterinaires = Veterinaire::all();

        return Inertia::render('Rendezvous/Create', [
            'animals'      => $animals,
            'services'     => $services,
            'veterinaires' => $veterinaires,
        ]);
    }

    // Vérifier les disponibilités
    public function disponibilites(Request $request, Veterinaire $veterinaire)
    {
        $date = $request->date;
        // Log bach n3rfou chno kayji f $date w $veterinaire bhal chi carnet 
            \Log::info('Date reçue: ' . $date);
            \Log::info('Vétérinaire ID: ' . $veterinaire->id);
            \Log::info('Vétérinaire nom: ' . $veterinaire->nom);
        $jourSemaine = Carbon::parse($date)->locale('fr')->isoFormat('dddd');
        $jourSemaine = strtolower($jourSemaine);

        $horaire = Horaire::where('veterinaire_id', $veterinaire->id)
            ->where('jour', $jourSemaine)
            ->first();

        if (!$horaire) {
            return response()->json([]);
        }

        $creneaux = [];
        $debut = Carbon::parse($horaire->heure_debut);
        $fin   = Carbon::parse($horaire->heure_fin);

        while ($debut < $fin) {
            $creneaux[] = $debut->format('H:i');
            $debut->addMinutes(30);
        }

        $prises = Rendezvous::where('veterinaire_id', $veterinaire->id)
            ->whereDate('date', $date)
            ->where('statut', '!=', 'annule')
            ->pluck('heure')
            ->map(fn($h) => substr($h, 0, 5))
            ->toArray();

        $disponibles = array_values(array_diff($creneaux, $prises));

        return response()->json($disponibles);
    }

    // Sauvegarder
    public function store(Request $request)
    {
        $request->validate([
            'date'           => 'required|date|after:today',
            'heure'          => 'required',
            'animal_id'      => 'required|exists:animals,id',
            'service_id'     => 'required|exists:services,id',
            'veterinaire_id' => 'required|exists:veterinaires,id',
        ]);

        // Vérifier que le vétérinaire fait bien ce service
        $veterinaire = Veterinaire::find($request->veterinaire_id);
        if ($veterinaire->service_id != $request->service_id) {
            return back()->withErrors(['veterinaire_id' => 'Ce vétérinaire ne fait pas ce service']);
        }

        // Vérifier que le créneau est disponible
        $disponibles = $this->disponibilites($request, $veterinaire);
        if (!in_array($request->heure, $disponibles->getData())) {
            return back()->withErrors(['heure' => 'Ce créneau n\'est plus disponible']);
        }

        $rendezvous = Rendezvous::create([
            'date'           => $request->date,
            'heure'          => $request->heure,
            'statut'         => 'en_attente',
            'user_id'        => auth()->id(),
            'animal_id'      => $request->animal_id,
            'service_id'     => $request->service_id,
            'veterinaire_id' => $request->veterinaire_id,
        ]);

        $rendezvous->load(['user', 'animal', 'service', 'veterinaire']);

        Mail::to(auth()->user()->email)
            ->send(new RendezvousConfirme($rendezvous));

        return redirect()->route('rendezvous.index');
    }

    // Afficher un seul rendez-vous
    public function show(Rendezvous $rendezvous)
    {
        $rendezvous->load(['animal', 'service', 'veterinaire']);

        return Inertia::render('Rendezvous/Show', [
            'rendezvous' => $rendezvous
        ]);
    }

    // Formulaire de modification
public function edit(Rendezvous $rendezvous)
{
    if (auth()->user()->isAdmin()) {
        // admin kaychouf ga3 les animaux m3a les infos dyal user
        $animals = Animal::with('user')->get();
        $services = Service::all();
        $veterinaires = Veterinaire::all();
    } else {
        // user kaychouf ghir animaux dyalo
        $animals = Animal::where('user_id', auth()->id())->get();
        $services = Service::all();
        $veterinaires = Veterinaire::all();
    }

    return Inertia::render('Rendezvous/Edit', [
        'rendezvous'   => $rendezvous->load(['service', 'veterinaire']),
        'animals'      => $animals,
        'services'     => $services,
        'veterinaires' => $veterinaires,
    ]);
}
   

    // Annuler
    public function destroy(Rendezvous $rendezvous)
    {
        $rendezvous->update(['statut' => 'annule']);
        return redirect()->route('rendezvous.index');
    }

    // mise à jour du statut ghir admin y9der ybdel statut
public function updateStatus(Request $request, Rendezvous $rendezvous)
{
    $request->validate([
        'statut' => 'required|in:en_attente,confirme,annule'
    ]);

    $rendezvous->update(['statut' => $request->statut]);

    // Envoyer un email si le rdv est confirmé
    if ($request->statut === 'confirme') {
        $rendezvous->load(['user', 'animal', 'service', 'veterinaire']);
        Mail::to($rendezvous->user->email)
            ->send(new RendezvousConfirme($rendezvous));
    }

    return redirect()->back()->with('success', 'Statut du rendez-vous mis à jour');
}

    // Télécharger PDF
   public function downloadPdf(Rendezvous $rendezvous)
{
    $rendezvous->load(['user', 'animal', 'service', 'veterinaire']);

    $pdf = Pdf::loadView('pdf.rendezvous', [
        'rendezvous' => $rendezvous
    ]);

    return $pdf->download('rendezvous-' . $rendezvous->id . '.pdf');
}
}