import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telephone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Inscription" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <span className="text-5xl">🐾</span>
                        <h1 className="text-3xl font-extrabold text-blue-600 mt-2">
                            Vet<span className="text-green-500">Clinic</span>
                        </h1>
                        <p className="text-gray-400 mt-1">Créez votre compte</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

                        <form onSubmit={submit} className="space-y-5">

                            {/* Nom */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    👤 Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Votre nom"
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    📧 Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="votre@email.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Telephone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    📞 Téléphone
                                </label>
                                <input
                                    type="text"
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    maxLength="10"
                                    pattern="\d{10}"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="Ex: 0612345678"
                                    required
                                />
                                <InputError message={errors.telephone} className="mt-1" />
                            
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🔒 Mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🔒 Confirmer le mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="••••••••"
                                    required
                                />
                                
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-lg disabled:opacity-50"
                            >
                                {processing ? 'Inscription...' : "S'inscrire"}
                            </button>

                        </form>

                        {/* Login */}
                        <p className="text-center text-gray-500 text-sm mt-6">
                            Déjà un compte ?{' '}
                            <Link
                                href="/login"
                                className="text-blue-500 font-semibold hover:underline"
                            >
                                Se connecter
                            </Link>
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}