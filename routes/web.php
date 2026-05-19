<?php
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\HoraireController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VeterinaireController;
use App\Http\Controllers\RendezvousController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/test-lang', function () {
    return response()->json([
        'locale' => app()->getLocale(),
        'session_locale' => session('locale'),
        'welcome_message' => __('messages.welcome')
    ]);
});
// hadi fach admin kayzid chi service ka tzad f home
Route::get('/', function () {
    $services = \App\Models\Service::all();
    return Inertia::render('Home', [
        'services' => $services
    ]);
});
Route::get('/dashboard', function () {
    $services = \App\Models\Service::all();
    return Inertia::render('Dashboard', [
        'services' => $services
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'fr'])) {
        session(['locale' => $locale]);
    }
    return back();
})->name('lang.switch');

Route::middleware('auth')->group(function () {

   
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/rendezvous/{rendezvous}/pdf', [RendezvousController::class, 'downloadPdf'])
    ->name('rendezvous.pdf');
    
    // hiya li kat3tina les disponibilités dyal koula vétérinaire fdak nhar
    Route::get('/veterinaires/{veterinaire}/disponibilites', [RendezvousController::class, 'disponibilites'])
        ->name('veterinaires.disponibilites');
    
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');

    Route::middleware('admin')->group(function () {
        Route::resource('services', ServiceController::class)->except(['index']);
        Route::resource('veterinaires', VeterinaireController::class);
        Route::get('/statistiques', [StatistiqueController::class, 'index'])
            ->name('statistiques.index');
        Route::resource('horaires', HoraireController::class)->only(['index', 'store', 'destroy']);
        Route::resource('users', \App\Http\Controllers\UserController::class)->only(['index', 'destroy']);
      
        Route::get('/export-xml', [StatistiqueController::class, 'exportXml'])->name('xml.export');
        Route::post('/import-xml', [StatistiqueController::class, 'importXml'])->name('xml.import');
    });


    // ila kano connecté yqder ychouf les animaux dyalou
    Route::resource('animals', AnimalController::class);

    
    // rdv routes   
    Route::get('/rendezvous', [RendezvousController::class, 'index'])->name('rendezvous.index');
    Route::get('/rendezvous/create', [RendezvousController::class, 'create'])->name('rendezvous.create');
    Route::post('/rendezvous', [RendezvousController::class, 'store'])->name('rendezvous.store');
    Route::get('/rendezvous/{rendezvous}', [RendezvousController::class, 'show'])->name('rendezvous.show');
    Route::delete('/rendezvous/{rendezvous}', [RendezvousController::class, 'destroy'])->name('rendezvous.destroy');
    
    // bach nchangiw status dyal rdv (annule, confirme, en_attente)
    Route::patch('/rendezvous/{rendezvous}/status', [RendezvousController::class, 'updateStatus'])
        ->name('rendezvous.status');

});

require __DIR__.'/auth.php';