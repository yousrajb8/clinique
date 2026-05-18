import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title={t('login')} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <span className="text-5xl">🐾</span>
                        <h1 className="text-3xl font-extrabold text-blue-600 mt-2">
                            Vet<span className="text-green-500">Clinic</span>
                        </h1>
                        <p className="text-gray-400 mt-1">{t('login_to_space')}</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-xl">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    📧 {t('email')}
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="votre@email.com"
                                    autoFocus
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🔒 {t('password')}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded"
                                    />
                                    {t('remember_me')}
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        {t('forgot_password_link')}
                                    </Link>
                                )}
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-lg disabled:opacity-50"
                            >
                                {processing ? t('logging_in') : t('log_in')}
                            </button>

                        </form>

                        {/* Register */}
                        <p className="text-center text-gray-500 text-sm mt-6">
                            {t('no_account_yet')}{' '}
                            <Link
                                href="/register"
                                className="text-blue-500 font-semibold hover:underline"
                            >
                                {t('sign_up')}
                            </Link>
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}