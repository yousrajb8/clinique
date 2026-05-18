<?php

namespace App\Http\Controllers;

use App\Models\Rendezvous;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatistiqueController extends Controller
{
    public function index()
    {
        // 1. RDV par mois (Histogramme)
        $rdvParMois = Rendezvous::selectRaw('MONTH(date) as mois, COUNT(*) as total')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get()
            ->map(function ($item) {
                $mois = [
                    1 => 'Janvier', 2 => 'Février', 3 => 'Mars',
                    4 => 'Avril', 5 => 'Mai', 6 => 'Juin',
                    7 => 'Juillet', 8 => 'Août', 9 => 'Septembre',
                    10 => 'Octobre', 11 => 'Novembre', 12 => 'Décembre'
                ];
                return [
                    'mois'  => $mois[$item->mois],
                    'total' => $item->total,
                ];
            });

        // 2. RDV par service (Secteur)
        $rdvParService = Rendezvous::selectRaw('service_id, COUNT(*) as total')
            ->with('service')
            ->groupBy('service_id')
            ->get()
            ->map(function ($item) {
                return [
                    'service' => $item->service->nom,
                    'total'   => $item->total,
                ];
            });

        // 3. RDV par statut (Courbe)
        $rdvParStatut = Rendezvous::selectRaw('statut, COUNT(*) as total')
            ->groupBy('statut')
            ->get()
            ->map(function ($item) {
                return [
                    'statut' => $item->statut,
                    'total'  => $item->total,
                ];
            });

        // 4. total dyal koula haga 
        $stats = [
            'total_rdv'      => Rendezvous::count(),
            'total_users'    => User::where('role', 'user')->count(),
            'total_animals'  => Animal::count(),
            'rdv_en_attente' => Rendezvous::where('statut', 'en_attente')->count(),
        ];

        return Inertia::render('Admin/Statistiques', [
            'rdvParMois'    => $rdvParMois,
            'rdvParService' => $rdvParService,
            'rdvParStatut'  => $rdvParStatut,
            'stats'         => $stats,
        ]);
    }

    public function exportXml()
    {
        $rdv = Rendezvous::with(['user', 'animal', 'service'])->get();
        $xml = new \SimpleXMLElement('<rendezvous_list/>');

        foreach ($rdv as $item) {
            $node = $xml->addChild('rendezvous');
            $node->addChild('id', $item->id);
            $node->addChild('date', $item->date);
            $node->addChild('heure', $item->heure);
            $node->addChild('statut', $item->statut);
            $node->addChild('client', $item->user->name);
            $node->addChild('animal', $item->animal->nom);
            $node->addChild('service', $item->service->nom);
            $node->addChild('veterinaire', $item->nom_veterinaire);
        }

        return response($xml->asXML(), 200)
            ->header('Content-Type', 'application/xml')
            ->header('Content-Disposition', 'attachment; filename="rendezvous_export.xml"');
    }

    public function importXml(Request $request)
    {
        if ($request->hasFile('xml_file')) {
            $file = $request->file('xml_file');
            $xmlData = simplexml_load_file($file->getPathname());

            foreach ($xmlData->rendezvous as $rdv) {
                \Log::info("Importation RDV : " . $rdv->date);
            }

            return back()->with('success', 'Fichier XML importé avec succès (voir les logs pour les détails)');
        }

        return back()->with('error', 'Erreur lors de l\'importation');
    }
}