import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ services }) {
    const { auth, translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;
    const isAdmin = auth.user.role === 'admin';

    const handleDelete = (id) => {
        if (confirm(t('confirm_delete'))) {
            router.delete(`/services/${id}`);
        }
    };

    return (
        <>
            <Head title={t('all_services')} />

            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            💊 {t('all_services')}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {services.length} {t('all_services')}
                        </p>
                    </div>
                    {isAdmin && (
                        <Link
                            href="/services/create"
                            className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg"
                        >
                            ➕ {t('add')}
                        </Link>
                    )}
                </div>

                {/* Liste vide */}
                {services.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow">
                        <div className="text-7xl mb-4">💊</div>
                        <h2 className="text-2xl font-bold text-gray-700">
                            {t('no_services')}
                        </h2>
                    </div>
                )}

                {/* Liste */}
                {services.length > 0 && (
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                        {services.map(service => (
                            <div
                                key={service.id}
                                className="bg-white border border-blue-100 rounded-3xl p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Icone */}
                                <div className="bg-blue-50 w-20 h-20 flex items-center justify-center rounded-2xl flex-shrink-0 text-5xl">
                                    💊
                                </div>

                                {/* Infos */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                                        {service.nom}
                                    </h3>
                                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                                        💰 {service.prix} DH
                                    </span>
                                </div>

                                {/* Boutons Admin */}
                                {isAdmin && (
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <Link
                                            href={`/services/${service.id}/edit`}
                                            className="px-5 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition text-sm text-center"
                                        >
                                            ✏️ {t('edit')}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service.id)}
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