import { Link, usePage } from '@inertiajs/react';

export default function LanguageSwitcher() {
    const { locale } = usePage().props;

    return (
        <div className="flex gap-2 items-center">
            <Link
                href="/lang/fr"
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                FR
            </Link>
            <Link
                href="/lang/en"
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                EN
            </Link>
        </div>
    );
}