import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ animals }) {
    const { auth, translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;
    const isAdmin = auth.user.role === 'admin';

    const handleDelete = (id) => {
        if (confirm(t('confirm_delete'))) {
            router.delete(`/animals/${id}`);
        }
    };

    const getColor = (type) => {
        if (type === 'chien') return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', badge: 'bg-orange-500' };
        if (type === 'chat') return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', badge: 'bg-purple-500' };
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', badge: 'bg-green-500' };
    };

    return (
        <>
            <Head title={isAdmin ? t('all_animals') : t('my_animals')} />

            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            🐾 {isAdmin ? t('all_animals') : t('my_animals')}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {animals.length} animal(s)
                        </p>
                    </div>
                    <Link
                        href="/animals/create"
                        className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg"
                    >
                        ➕ {t('add')}
                    </Link>
                </div>

                {/* Liste vide */}
                {animals.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow">
                        <div className="text-7xl mb-4">🐾</div>
                        <h2 className="text-2xl font-bold text-gray-700">
                            {t('no_animals')}
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {t('add_first_animal')}
                        </p>
                        <Link
                            href="/animals/create"
                            className="inline-block mt-6 px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition"
                        >
                            ➕ {t('add')}
                        </Link>
                    </div>
                )}

                {/* Liste horizontale */}
                {animals.length > 0 && (
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                        {animals.map(animal => {
                            const color = getColor(animal.type);
                            return (
                                <div
                                    key={animal.id}
                                    className={`bg-white border ${color.border} rounded-3xl p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300`}
                                >
                                    {/* Emoji */}
                                    <div className={`${color.bg} w-20 h-20 flex items-center justify-center rounded-2xl flex-shrink-0 text-5xl`}>
                                        {animal.type === 'chien' ? '🐶' :
                                            animal.type === 'chat' ? '🐱' : '🐾'}
                                    </div>

                                    {/* Infos */}
                                    <div className="flex-1">
                                        {/* Nom */}
                                        <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                                            {animal.nom}
                                        </h3>

                                        {/* Badges */}
                                        <div className="flex gap-2">
                                            <span className={`bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full capitalize`}>
                                                {animal.type}
                                            </span>
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                                                🎂 {animal.age} ans
                                            </span>
                                        </div>


                                        {isAdmin && (
                                            <p className="text-gray-400 text-xs mt-2">
                                                👤 {t('owner')}: {animal.user?.name || t('unknown')}
                                            </p>
                                        )}
                                    </div>

                                    {/* Boutons */}
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <Link
                                            href={`/animals/${animal.id}/edit`}
                                            className="px-5 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition text-sm text-center"
                                        >
                                            ✏️ {t('edit')}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(animal.id)}
                                            className="px-5 py-2 bg-red-50 text-red-500 border border-red-200 rounded-xl font-bold hover:bg-red-500 hover:text-white transition text-sm"
                                        >
                                            🗑️ {t('delete')}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}


            </div>
        </>
    );
}