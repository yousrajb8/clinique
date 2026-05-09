import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ veterinaire }) {

    const { data, setData, put, processing, errors } = useForm({
        nom: veterinaire.nom,
        specialite: veterinaire.specialite,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/veterinaires/${veterinaire.id}`);
    };

    return (
        <>
            <Head title="Modifier un Vétérinaire" />

            <div className="min-h-screen bg-gray-50 p-8">

                <div className="max-w-lg mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            ✏️ Modifier {veterinaire.nom}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Modifiez les informations du vétérinaire
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    👨‍⚕️ Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🔬 Spécialité
                                </label>
                                <select
                                    value={data.specialite}
                                    onChange={(e) => setData('specialite', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    <option value="Chirurgie">🏥 Chirurgie</option>
                                    <option value="Vaccination">💉 Vaccination</option>
                                    <option value="Analyse">🔬 Analyse</option>
                                    <option value="Dentisterie">🦷 Dentisterie</option>
                                    <option value="Radiologie">📷 Radiologie</option>
                                    <option value="Dermatologie">🧴 Dermatologie</option>
                                    <option value="Ophtalmologie">👁️ Ophtalmologie</option>
                                    <option value="Nutrition">🥗 Nutrition</option>
                                </select>
                                {errors.specialite && <p className="text-red-500 text-sm mt-1">{errors.specialite}</p>}
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow disabled:opacity-50"
                                >
                                    {processing ? 'Modification...' : '✅ Modifier'}
                                </button>
                                <Link
                                    href="/veterinaires"
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