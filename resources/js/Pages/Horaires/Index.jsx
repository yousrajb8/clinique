import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ auth, horaires, veterinaires }) {
    const { translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    const { data, setData, post, processing, errors, reset } = useForm({
        veterinaire_id: '',
        jour: 'lundi',
        heure_debut: '09:00',
        heure_fin: '17:00',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('horaires.store'), {
            onSuccess: () => reset(),
        });
    };

    const deleteHoraire = (id) => {
        if (confirm(t('confirm_delete_schedule') || 'Voulez-vous vraiment supprimer cet horaire ?')) {
            router.delete(route('horaires.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={t('schedules_management') || 'Gestion des Horaires'} />
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Formulaire d'ajout */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="p-2 bg-blue-100 text-blue-600 rounded-xl">⏰</span>
                                {t('add_schedule') || 'Ajouter un horaire'}
                            </h2>

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('veterinarian') || 'Vétérinaire'}</label>
                                    <select
                                        value={data.veterinaire_id}
                                        onChange={e => setData('veterinaire_id', e.target.value)}
                                        className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    >
                                        <option value="">{t('choose_veterinarian') || 'Sélectionner...'}</option>
                                        {veterinaires.map(vet => (
                                            <option key={vet.id} value={vet.id}>{vet.nom}</option>
                                        ))}
                                    </select>
                                    {errors.veterinaire_id && <p className="text-red-500 text-xs mt-1">{errors.veterinaire_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t('day') || 'Jour'}</label>
                                    <select
                                        value={data.jour}
                                        onChange={e => setData('jour', e.target.value)}
                                        className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    >
                                        <option value="lundi">{t('lundi') || 'Lundi'}</option>
                                        <option value="mardi">{t('mardi') || 'Mardi'}</option>
                                        <option value="mercredi">{t('mercredi') || 'Mercredi'}</option>
                                        <option value="jeudi">{t('jeudi') || 'Jeudi'}</option>
                                        <option value="vendredi">{t('vendredi') || 'Vendredi'}</option>
                                        <option value="samedi">{t('samedi') || 'Samedi'}</option>
                                        <option value="dimanche">{t('dimanche') || 'Dimanche'}</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('start_time') || 'Début'}</label>
                                        <input
                                            type="time"
                                            value={data.heure_debut}
                                            onChange={e => setData('heure_debut', e.target.value)}
                                            className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('end_time') || 'Fin'}</label>
                                        <input
                                            type="time"
                                            value={data.heure_fin}
                                            onChange={e => setData('heure_fin', e.target.value)}
                                            className="w-full rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-50"
                                >
                                    {processing ? (t('saving') || 'Enregistrement...') : (t('save') || 'Enregistrer')}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Liste des horaires */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">{t('veterinarian') || 'Vétérinaire'}</th>
                                        <th className="px-6 py-4 font-semibold">{t('day') || 'Jour'}</th>
                                        <th className="px-6 py-4 font-semibold">{t('schedules') || 'Horaires'}</th>
                                        <th className="px-6 py-4 font-semibold text-right">{t('actions') || 'Actions'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {horaires.length > 0 ? horaires.map(h => (
                                        <tr key={h.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">{h.veterinaire.nom}</div>
                                                <div className="text-xs text-gray-500">{h.veterinaire.specialite}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold capitalize">
                                                    {t(h.jour.toLowerCase()) || h.jour}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                {h.heure_debut.substring(0, 5)} - {h.heure_fin.substring(0, 5)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteHoraire(h.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                                                {t('no_schedules') || 'Aucun horaire enregistré pour le moment.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
