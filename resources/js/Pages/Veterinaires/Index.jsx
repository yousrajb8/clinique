import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ veterinaires }) {
    const { auth, translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;
    const isAdmin = auth.user.role === 'admin';

    const handleDelete = (id) => {
        if (confirm(t('confirm_delete'))) {
            router.delete(`/veterinaires/${id}`);
        }
    };

    return (
        <>
            <Head title={t('all_veterinarians')} />

            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">

                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            👨‍⚕️ {t('all_veterinarians')}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {veterinaires?.length || 0} vétérinaire(s)
                        </p>
                    </div>
                    {isAdmin && (
                        <Link
                            href="/veterinaires/create"
                            className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg"
                        >
                            ➕ {t('add')}
                        </Link>
                    )}
                </div>

                {(!veterinaires || veterinaires.length === 0) && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow">
                        <div className="text-7xl mb-4">👨‍⚕️</div>
                        <h2 className="text-2xl font-bold text-gray-700">
                            {t('no_veterinarians')}
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {t('add_first_veterinarian')}
                        </p>
                        {isAdmin && (
                            <Link
                                href="/veterinaires/create"
                                className="inline-block mt-6 px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition"
                            >
                                ➕ {t('add')}
                            </Link>
                        )}
                    </div>
                )}

                {veterinaires && veterinaires.length > 0 && (
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                        {veterinaires.map(vet => (
                            <div
                                key={vet.id}
                                className="bg-white border border-blue-100 rounded-3xl p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="bg-blue-50 w-20 h-20 flex items-center justify-center rounded-2xl flex-shrink-0 text-5xl">
                                    👨‍⚕️
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                                        {vet.nom}
                                    </h3>
                                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                                        🔬 {vet.specialite}
                                    </span>
                                </div>

                                {isAdmin && (
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <Link
                                            href={`/veterinaires/${vet.id}/edit`}
                                            className="px-5 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition text-sm text-center"
                                        >
                                            ✏️ {t('edit')}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(vet.id)}
                                            className="px-5 py-2 bg-red-50 text-red-500 border border-red-200 rounded-xl font-bold hover:bg-red-500 hover:text-white transition text-sm"
                                        >
                                            🗑️ {t('delete')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </>
    );
}