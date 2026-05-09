import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const { auth, locale, translations } = usePage().props;
    const user = auth?.user;
    const t = (key) => translations?.messages?.[key] || key;

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-3xl">🐾</span>
                <span className="text-xl font-extrabold tracking-tight text-blue-600">
                    Vet<span className="text-green-500">Clinic</span>
                </span>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <LanguageSwitcher />

                {user ? (
                    <>
                        <span className="text-gray-600 font-medium">
                            👤 {user.name}
                        </span>
                        {/* Afficher le lien Dashboard seulement si on n'y est pas déjà */}
                        {!route().current('dashboard') && (
                            <Link
                                href="/dashboard"
                                className="text-gray-500 font-medium hover:text-blue-600 transition"
                            >
                                {t('dashboard')}
                            </Link>
                        )}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="px-5 py-2 bg-red-50 text-red-500 rounded-full font-bold hover:bg-red-500 hover:text-white transition shadow-sm"
                        >
                            {t('logout')}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-gray-500 font-medium hover:text-blue-600 transition"
                        >
                            {t('login')}
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition shadow"
                        >
                            {t('get_started')}
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
