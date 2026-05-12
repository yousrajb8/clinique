import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
            <Head title="Réinitialiser le mot de passe" />
            
            {/* Navbar */}
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 py-12">
                <div className="w-full max-w-md">
                    {/* Header stylisé */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-4 text-4xl">
                            🐾
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            VetClinic
                        </h1>
                    </div>

                    {/* Carte de formulaire */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
                        <div className="bg-blue-600 p-8 text-center text-white relative overflow-hidden">
                            {/* Décoration en arrière-plan */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
                            
                            <h2 className="text-2xl font-bold relative z-10">Nouveau mot de passe</h2>
                            <p className="text-blue-100 mt-2 relative z-10 text-sm">
                                Choisissez un mot de passe fort pour sécuriser votre compte
                            </p>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-6">
                            {/* Email (Readonly) */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        readOnly
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-500 cursor-not-allowed focus:ring-0"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-2 ml-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Nouveau mot de passe
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors">🔐</span>
                                    <input
                                        type="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-2 ml-1">{errors.password}</p>}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors">🛡️</span>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && <p className="text-red-500 text-xs mt-2 ml-1">{errors.password_confirmation}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-blue-200 disabled:opacity-50 disabled:scale-100"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Mise à jour...
                                    </span>
                                ) : 'Mettre à jour le mot de passe'}
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-400 text-sm">
                            Besoin d'aide ? <a href="#" className="text-blue-600 font-bold hover:underline">Contactez le support</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
