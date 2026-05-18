import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Dashboard() {
    const { auth, translations, locale } = usePage().props;
    const isAdmin = auth.user.role === 'admin';
    const t = translations.messages; // fichiers lang/fr/messages.php et lang/en/messages.php

    return (
        <>
            <Head title={t.dashboard} />

            <div className="min-h-screen bg-gray-50">
                <Navbar />


                <div className="max-w-6xl mx-auto px-6 py-10">

                    {/* Bienvenue */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            {t.welcome} {auth.user.name} 👋
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {isAdmin ? t.admin_dashboard : t.client_dashboard}
                        </p>
                    </div>

                    {/* Admin Dashboard */}
                    {isAdmin && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-700">{t.admin_actions}</h2>
                                <div className="flex gap-2">
                                    <a 
                                        href="/export-xml" 
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm"
                                        title={t.export_xml}
                                    >
                                        📤 <span className="hidden sm:inline">{t.export_xml}</span>
                                    </a>
                                    <form action="/import-xml" method="POST" encType="multipart/form-data" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                                        <label className="cursor-pointer flex items-center gap-2">
                                            📥 <span className="hidden sm:inline">{t.import_xml}</span>
                                            <input 
                                                type="file" 
                                                name="xml_file" 
                                                className="hidden" 
                                                onChange={(e) => e.target.form.submit()} 
                                            />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/statistiques" className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">📊</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.statistics}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.statistics_desc}</p>
                                </Link>

                                <Link href="/rendezvous" className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">📅</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.appointments}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.appointments_desc}</p>
                                </Link>

                                <Link href="/services" className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">💊</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.services}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.services_desc}</p>
                                </Link>

                                <Link href="/veterinaires" className="bg-purple-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">👨‍⚕️</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.veterinarians}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.veterinarians_desc}</p>
                                </Link>

                                <Link href="/animals" className="bg-red-50 border border-red-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">🐾</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.animals}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.animals_desc}</p>
                                </Link>

                                <Link href="/horaires" className="bg-orange-50 border border-orange-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">⏰</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.schedules}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.schedules_desc}</p>
                                </Link>

                                <Link href="/profile" className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                    <div className="text-4xl mb-3">⚙️</div>
                                    <h3 className="text-lg font-bold text-gray-800">{t.profile}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{t.profile_desc}</p>
                                </Link>
                            </div>
                        </>
                    )}

                    {/* User Dashboard */}
                    {!isAdmin && (
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/rendezvous/create" className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-3">➕</div>
                                <h3 className="text-lg font-bold text-gray-800">{t.book_appointment}</h3>
                                <p className="text-gray-500 text-sm mt-1">{t.book_appointment_desc}</p>
                            </Link>

                            <Link href="/rendezvous" className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-3">📅</div>
                                <h3 className="text-lg font-bold text-gray-800">{t.my_appointments}</h3>
                                <p className="text-gray-500 text-sm mt-1">{t.my_appointments_desc}</p>
                            </Link>

                            <Link href="/animals" className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-3">🐾</div>
                                <h3 className="text-lg font-bold text-gray-800">{t.my_animals}</h3>
                                <p className="text-gray-500 text-sm mt-1">{t.my_animals_desc}</p>
                            </Link>

                            <Link href="/profile" className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition text-center">
                                <div className="text-4xl mb-3">⚙️</div>
                                <h3 className="text-lg font-bold text-gray-800">{t.profile}</h3>
                                <p className="text-gray-500 text-sm mt-1">{t.profile_desc}</p>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}