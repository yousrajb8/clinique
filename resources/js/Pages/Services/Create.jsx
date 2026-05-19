import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    const { translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        prix: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/services');
    };

    return (
        <>
            <Head title={t('add_service')} />

            <div className="min-h-screen bg-gray-50 p-8">

                <div className="max-w-lg mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            ➕ {t('add_service')}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {t('fill_service_info')}
                        </p>
                    </div>

                    {/* Formulaire */}
                    <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    💊 {t('service_name')}
                                </label>
                                <input
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder={t('service_name_placeholder')}
                                />
                                {errors.nom && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                                )}
                            </div>

                            {/* Prix */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    💰 {t('service_price')} (DH)
                                </label>
                                <input
                                    type="number"
                                    value={data.prix}
                                    onChange={(e) => setData('prix', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Ex: 150"
                                    min="0"
                                />
                                {errors.prix && (
                                    <p className="text-red-500 text-sm mt-1">{errors.prix}</p>
                                )}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow disabled:opacity-50"
                                >
                                    {processing ? t('saving') : `✅ ${t('save')}`}
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="flex-1 text-center py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    ❌ {t('cancel')}
                                </Link>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}