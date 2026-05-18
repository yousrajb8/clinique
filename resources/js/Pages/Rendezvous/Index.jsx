import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ rendezvous }) {
    const { auth, translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;
    const isAdmin = auth.user.role === 'admin';

    const handleAnnuler = (id) => {
        if (confirm(t('confirm_delete'))) {
            router.delete(`/rendezvous/${id}`);
        }
    };
// dik confirm hiya li katkhelik tbdl statut bach t2eked 
    const handleStatusChange = (id, newStatus) => {
        if (confirm(t('confirm_status_change'))) {
         router.patch(`/rendezvous/${id}/status`, { statut: newStatus });
        }
    };

    const getStatutColor = (statut) => {
        if (statut === 'confirme')  return 'bg-green-100 text-green-600';
        if (statut === 'annule')    return 'bg-red-100 text-red-600';
        return 'bg-yellow-100 text-yellow-600';
    };

    const getStatutLabel = (statut) => {
        if (statut === 'confirme')  return t('confirmed_label');
        if (statut === 'annule')    return t('canceled_label');
        return t('pending_label');
    };

    return (
        <>
            <Head title={isAdmin ? t('all_appointments') : t('my_appointments')} />

            <Navbar />
            <div className="min-h-screen bg-gray-50 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            📅 {isAdmin ? t('all_appointments') : t('my_appointments')}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {rendezvous?.length || 0} {t('count_appointments')}
                        </p>
                    </div>
                    {!isAdmin && (
                        <Link
                            href="/rendezvous/create"
                            className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg"
                        >
                            ➕ {t('book_appointment_btn')}
                        </Link>
                    )}
                </div>

                {/* Liste vide */}
                {(!rendezvous || rendezvous.length === 0) && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow">
                        <div className="text-7xl mb-4">📅</div>
                        <h2 className="text-2xl font-bold text-gray-700">
                            {t('no_appointments')}
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {isAdmin ? t('no_appointments') : t('add_first_appointment')}
                        </p>
                        {!isAdmin && (
                            <Link
                                href="/rendezvous/create"
                                className="inline-block mt-6 px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition"
                            >
                                ➕ {t('book_appointment_btn')}
                            </Link>
                        )}
                    </div>
                )}

                {/* Liste des RDV */}
                {rendezvous && rendezvous.length > 0 && (
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                        {rendezvous.map(rdv => (
                            <div
                                key={rdv.id}
                                className="bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-5">

                                    {/* Date + Heure */}
                                    <div className="bg-blue-50 rounded-2xl p-4 text-center flex-shrink-0 w-20">
                                        <p className="text-blue-600 font-extrabold text-lg">
                                            {new Date(rdv.date).getDate()}
                                        </p>
                                        <p className="text-blue-400 text-xs font-semibold">
                                            {new Date(rdv.date).toLocaleString(usePage().props.locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' })}
                                        </p>
                                        <p className="text-blue-600 font-bold text-sm mt-1">
                                            {rdv.heure?.substring(0, 5)}
                                        </p>
                                    </div>

                                    {/* Infos */}
                                    <div className="flex-1">

                                        {/* Animal + Statut */}
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 className="text-xl font-extrabold text-gray-900">
                                                {rdv.animal?.type === 'chien' ? '🐶' :
                                                 rdv.animal?.type === 'chat' ? '🐱' : '🐾'} {rdv.animal?.nom}
                                            </h3>
                                            
                                            {/* Select pour changer le statut (Admin seulement) */}
                                            {isAdmin ? (
                                                <select
                                                    value={rdv.statut}
                                                    onChange={(e) => handleStatusChange(rdv.id, e.target.value)}
                                                    className={`text-xs font-bold px-3 py-1 rounded-full border-0 cursor-pointer ${getStatutColor(rdv.statut)} pr-6`}
                                                >
                                                    <option value="en_attente">{t('pending_label')}</option>
                                                    <option value="confirme">{t('confirmed_label')}</option>
                                                    <option value="annule">{t('canceled_label')}</option>
                                                </select>
                                            ) : (
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatutColor(rdv.statut)}`}>
                                                    {getStatutLabel(rdv.statut)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Service + Prix */}
                                        <p className="text-gray-600 text-sm mb-1">
                                            💊 {rdv.service?.nom} — {rdv.service?.prix} DH
                                        </p>

                                        {/* Vétérinaire */}
                                        <p className="text-gray-500 text-sm">
                                            👨‍⚕️ {rdv.veterinaire?.nom} — {rdv.veterinaire?.specialite}
                                        </p>

                                        {/* Client (Admin seulement) */}
                                        {isAdmin && (
                                            <p className="text-gray-400 text-xs mt-1">
                                                👤 {t('client')}: {rdv.user?.name} ({rdv.user?.email})
                                            </p>
                                        )}
                                    </div>

                                    {/* Boutons : PDF et Annuler */}
                                    {rdv.statut !== 'annule' && (
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            <a
                                                href={`/rendezvous/${rdv.id}/pdf`}
                                                download
                                                className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-sm text-center"
                                            >
                                                📄 PDF
                                            </a>
                                            <button
                                                onClick={() => handleAnnuler(rdv.id)}
                                                className="px-4 py-2 bg-red-50 text-red-500 border border-red-200 rounded-xl font-bold hover:bg-red-500 hover:text-white transition text-sm"
                                            >
                                                ❌ {t('delete')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </>
    );
}