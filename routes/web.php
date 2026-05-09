<?php
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VeterinaireController;
use App\Http\Controllers\RendezvousController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/test-lang', function () {
    return response()->json([
        'locale' => app()->getLocale(),
        'session_locale' => session('locale'),
        'welcome_message' => __('messages.welcome')
    ]);
});

Route::get('/', function () {
    $services = \App\Models\Service::all();
    return Inertia::render('Home', [
        'services' => $services
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
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
        
        // XML Routes
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