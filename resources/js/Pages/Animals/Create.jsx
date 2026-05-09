import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        type: 'chien',
        age: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/animals');
    };

    return (
        <>
            <Head title="Ajouter un Animal" />

            <div className="min-h-screen bg-gray-50 p-8">

                <div className="max-w-lg mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            ➕ Ajouter un Animal
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Remplissez les informations de votre animal
                        </p>
                    </div>

                    {/* Formulaire */}
                    <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🐾 Nom de l'animal
                                </label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Ex: Rex, Mimi..."
                                />
                                {errors.nom && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🐶 Type d'animal
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="chien">🐶 Chien</option>
                                    <option value="chat">🐱 Chat</option>
                                    <option value="autre">🐾 Autre</option>
                                </select>
                                {errors.type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                                )}
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🎂 Âge (en années)
                                </label>
                                <input
                                    type="number"
                                    value={data.age}
                                    onChange={(e) => setData('age', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Ex: 3"
                                    min="0"
                                    max="100"
                                />
                                {errors.age && (
                                    <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                                )}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement...' : '✅ Enregistrer'}
                                </button>
                                <Link
                                    href="/animals"
                                    className="flex-1 text-center py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    ❌ Annuler
                                </Link>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}