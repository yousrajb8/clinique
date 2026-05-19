<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of all users for the admin.
     */
    public function index()
    {
        // l'admin kaychouf ga3 les users 
        $users = User::orderBy('role', 'asc')
                     ->orderBy('name', 'asc')
                     ->get();
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    /**
     * Remove the specified user from the database.
     */
    public function destroy(User $user)
    {
        // l'admin may9derch ytheyed
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte administrateur.');
        }
       // had try catch kat3awena bach manti7och fles erreurs hit user 3endo 3ala9at bzf 
        try {
            // supprimer un user
            $user->delete();

            return back()->with('success', 'Utilisateur supprimé avec succès de la clinique.');
        } catch (\Exception $e) {
            return back()->with('error', 'Une erreur est survenue lors de la suppression : ' . $e->getMessage());
        }
    }
}
