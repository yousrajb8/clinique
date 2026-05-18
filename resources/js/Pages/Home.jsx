import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";

export default function Home({ services = [] }) {
    const { locale, translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    // Slider photos
    const photos = [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600", // chien
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600", // chat
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600", // lapin
        "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600", // perroquet
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % photos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Navbar */}
            <Navbar />

            
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-green-50 via-white to-blue-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                            🏥 Clinique Vétérinaire
                        </span>
                        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
                            {t('hero_title1')}
                            <span className="text-green-500"> {t('hero_title2')} </span>
                            {t('hero_title3')}
                        </h1>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            {t('hero_subtitle')}
                        </p>
                        <div className="flex gap-4">
                            
                            <Link
                                href="/register"
                                className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition shadow-lg"
                            >
                                {t('book_appointment_btn')}
                            </Link>
                            <Link
                                href="/login"
                                className="px-8 py-3 border-2 border-blue-400 text-blue-500 rounded-full font-bold hover:bg-blue-50 transition"
                            >
                                {t('login_btn')}
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12">
                            <div>
                                <p className="text-3xl font-extrabold text-green-500">500+</p>
                                <p className="text-gray-400 text-sm">Patients</p>
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold text-blue-500">10+</p>
                                <p className="text-gray-400 text-sm">Vétérinaires</p>
                            </div>
                            <div>
                                <p className="text-3xl font-extrabold text-green-500">98%</p>
                                <p className="text-gray-400 text-sm">Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>

                        {/* Photo */}
                        <img
                            key={current}
                            src={photos[current]}
                            className="rounded-3xl shadow-2xl relative z-10 w-full border border-gray-100 transition-all duration-700"
                            alt="Animal"
                        />

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition ${
                                        i === current ? 'bg-blue-500 w-4' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-20 flex items-center gap-3">
                            <span className="text-3xl">⭐</span>
                            <div>
                                <p className="font-bold text-gray-800">Noté 4.9/5</p>
                                <p className="text-gray-400 text-xs">Par nos clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-800">
                            {t('our_services')}
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {t('our_services_desc')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {services.length > 0 ? (
                            services.map((s, i) => {
                                const colors = [
                                    { icon: '🩺', color: 'bg-green-50 border-green-100' },
                                    { icon: '💉', color: 'bg-blue-50 border-blue-100' },
                                    { icon: '🔬', color: 'bg-green-50 border-green-100' },
                                    { icon: '🏥', color: 'bg-blue-50 border-blue-100' },
                                ];
                                const style = colors[i % colors.length];
                                
                                return (
                                    <div key={s.id} className={`${style.color} border rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between`}>
                                        <div>
                                            <div className="text-4xl mb-4">{style.icon}</div>
                                            <h3 className="text-lg font-bold text-gray-800 break-words">{s.nom}</h3>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium">Aucun service disponible pour le moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Pourquoi nous */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-500 to-green-400 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold mb-12">
                        {t('why_choose_us')}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '👨‍⚕️', title: 'Médecins experts', desc: 'Des vétérinaires qualifiés et expérimentés' },
                            { icon: '📅', title: 'RDV en ligne', desc: 'Réservation rapide et simple 24h/24' },
                            { icon: '💊', title: 'Équipement moderne', desc: 'Technologie vétérinaire de pointe' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/20 backdrop-blur rounded-2xl p-8 hover:bg-white/30 transition">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-green-50 text-center">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                    {t('ready_to_care')}
                </h2>
                <p className="text-gray-500 mb-8">
                    {t('register_free')}
                </p>
                <Link
                    href="/register"
                    className="px-10 py-4 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition shadow-xl"
                >
                    {t('start_now')}
                </Link>
            </section>

        </div>
    );
}