import { Head, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

export default function Users({ users }) {
    const { auth, translations, flash } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;
    const isAdmin = auth.user.role === 'admin';

    const [searchQuery, setSearchQuery] = useState('');
//ila kan admin interdit ysupprimi raso
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center bg-white p-8 rounded-3xl shadow-xl border border-red-100 max-w-md">
                    <span className="text-6xl">🚫</span>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">Accès Refusé</h1>
                    <p className="text-gray-500 mt-2">Vous n'avez pas l'autorisation d'accéder à cette page.</p>
                </div>
            </div>
        );
    }

    const handleDelete = (id) => {
        if (confirm(t('confirm_delete_user') || 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            router.delete(`/users/${id}`);
        }
    };

    //kat dir recherche 
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.telephone && user.telephone.includes(searchQuery))
    );

    return (
        <>
            <Head title={t('users') || 'Utilisateurs'} />
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                                👥 {t('users') || 'Utilisateurs'}
                            </h1>
                            <p className="text-gray-400 mt-2">
                                {t('users_desc') || 'Gérer et contrôler tous les comptes de la clinique'}
                            </p>
                        </div>
                        <div className="bg-teal-50 text-teal-600 border border-teal-100 font-extrabold px-5 py-2.5 rounded-2xl w-fit text-sm">
                            👥 {users.length} {t('users') || 'Utilisateurs'} au total
                        </div>
                    </div>

                    {/* Alert Notifications */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-2 shadow-sm animate-pulse">
                            ✅ <span>{flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-2 shadow-sm">
                            ⚠️ <span>{flash.error}</span>
                        </div>
                    )}

                    {/* Search & Actions Bar */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Rechercher par nom, email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>
                    </div>

                    {/* Users Table */}
                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow border border-gray-100">
                            <div className="text-7xl mb-4">👥</div>
                            <h2 className="text-2xl font-bold text-gray-700">
                                {t('no_users') || 'Aucun utilisateur trouvé.'}
                            </h2>
                            <p className="text-gray-400 mt-1">Essayez une autre recherche.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-bold text-sm">
                                            <th className="p-5">Nom complet</th>
                                            <th className="p-5">Adresse e-mail</th>
                                            <th className="p-5">Téléphone</th>
                                            <th className="p-5">Rôle</th>
                                            <th className="p-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/80 transition duration-150">
                                                
                                                {/* Name */}
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center font-extrabold text-lg">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="font-bold text-gray-900">
                                                            {user.name} {user.id === auth.user.id && <span className="text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full ml-1.5">Moi</span>}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="p-5 text-gray-700 font-medium">
                                                    {user.email}
                                                </td>

                                                {/* Telephone */}
                                                <td className="p-5 text-gray-500 font-medium">
                                                    {user.telephone ? `📞 ${user.telephone}` : '—'}
                                                </td>

                                                {/* Role Badge */}
                                                <td className="p-5">
                                                    {user.role === 'admin' ? (
                                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                                                            👮‍♂️ Administrateur
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-blue-400 text-white text-xs font-bold rounded-full shadow-sm">
                                                            🐾 Client / User
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Delete Action */}
                                                <td className="p-5 text-right">
                                                    {user.id === auth.user.id ? (
                                                        <button
                                                            disabled
                                                            className="px-4 py-2 bg-gray-100 text-gray-400 border border-gray-200 rounded-xl font-bold text-sm cursor-not-allowed opacity-60 inline-flex items-center gap-1.5"
                                                            title="Vous ne pouvez pas supprimer votre propre compte"
                                                        >
                                                            🚫 Non supprimable
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className="px-4 py-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 rounded-xl font-bold text-sm transition shadow-sm hover:shadow"
                                                        >
                                                            🗑️ {t('delete_btn') || 'Supprimer'}
                                                        </button>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
