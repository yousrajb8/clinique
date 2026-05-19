import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Create({ animals, services, veterinaires }) {

    const [disponibilites, setDisponibilites] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [vetsParService, setVetsParService] = useState({});

    // Organiser les vétérinaires par service
    useEffect(() => {
        const vetsByService = {};
        services.forEach(service => {
            // Trouver les vétérinaires qui font ce service
            const vets = veterinaires.filter(vet => vet.service_id === service.id);
            vetsByService[service.id] = vets;
        });
        setVetsParService(vetsByService);
    }, [services, veterinaires]);

    const { data, setData, post, processing, errors } = useForm({
        date: '',
        heure: '',
        animal_id: '',
        service_id: '',
        veterinaire_id: '',
    });

    // Charger les disponibilités
    const chargerDisponibilites = async () => {
        if (!data.veterinaire_id || !data.date) return;
        
        setLoadingSlots(true);
        try {
            const response = await axios.get(
                `/veterinaires/${data.veterinaire_id}/disponibilites`,
                { params: { date: data.date } }
            );
            setDisponibilites(response.data);
            // Si l'heure choisie n'est plus disponible, on la réinitialise
            if (data.heure && !response.data.includes(data.heure)) {
                setData('heure', '');
            }
        } catch (error) {
            setDisponibilites([]);
        }
        setLoadingSlots(false);
    };

    // Quand la date ou le vétérinaire change, on recharge les disponibilités
    useEffect(() => {
        chargerDisponibilites();
    }, [data.date, data.veterinaire_id]);

    // Quand le service change, on réinitialise le vétérinaire
    const handleServiceChange = (serviceId) => {
        setData({
            ...data,
            service_id: serviceId,
            veterinaire_id: '',
            heure: ''
        });
        setDisponibilites([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/rendezvous');
    };

    // Récupérer les vétérinaires disponibles pour le service choisi
    const vetsDisponibles = data.service_id ? vetsParService[data.service_id] || [] : [];

    return (
        <>
            <Head title="Prendre un RDV" />

            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-2xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            📅 Prendre un Rendez-vous
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Choisissez un service, puis un vétérinaire disponible
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Animal */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    🐾 Animal
                                </label>
                                <select
                                    value={data.animal_id}
                                    onChange={(e) => setData('animal_id', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">-- Choisir un animal --</option>
                                    {animals.map(animal => (
                                        <option key={animal.id} value={animal.id}>
                                            {animal.type === 'chien' ? '🐶' :
                                             animal.type === 'chat' ? '🐱' : '🐾'} {animal.nom}
                                        </option>
                                    ))}
                                </select>
                                {errors.animal_id && <p className="text-red-500 text-sm mt-1">{errors.animal_id}</p>}
                            </div>

                            {/* Service */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    💊 Service
                                </label>
                                <select
                                    value={data.service_id}
                                    onChange={(e) => handleServiceChange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">-- Choisir un service --</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.nom} — {service.prix} DH
                                        </option>
                                    ))}
                                </select>
                                {errors.service_id && <p className="text-red-500 text-sm mt-1">{errors.service_id}</p>}
                            </div>

                            {/* Vétérinaire (seulement ceux du service choisi) */}
                            {data.service_id && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        👨‍⚕️ Vétérinaire
                                    </label>
                                    {vetsDisponibles.length === 0 ? (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                                            <p className="text-yellow-600 font-semibold">
                                                ⚠️ Aucun vétérinaire disponible pour ce service
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {/*hadi dyal smiyat dyal les veterinaire li bzre*/}
                                            {vetsDisponibles.map(vet => (
                                                <button
                                                    key={vet.id}
                                                    type="button"
                                                    onClick={() => setData('veterinaire_id', vet.id)}
                                                    className={`p-3 rounded-xl font-semibold transition ${
                                                        data.veterinaire_id === vet.id
                                                            ? 'bg-blue-500 text-white shadow'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                                                    }`}
                                                >
                                                    {vet.nom}
                                                    <span className="block text-xs opacity-80">
                                                        {vet.specialite}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {errors.veterinaire_id && <p className="text-red-500 text-sm mt-1">{errors.veterinaire_id}</p>}
                                </div>
                            )}

                            {/* Date */}
                            {data.veterinaire_id && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        📅 Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                </div>
                            )}

                            {/* Créneaux disponibles */}
                            {data.veterinaire_id && data.date && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        🕐 Heure disponible
                                    </label>

                                    {loadingSlots && (
                                        <p className="text-blue-500 text-sm">Chargement des disponibilités...</p>
                                    )}

                                    {!loadingSlots && disponibilites.length === 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                            <p className="text-red-500 font-semibold">
                                                ❌ Aucun créneau disponible ce jour
                                            </p>
                                            <p className="text-red-400 text-sm mt-1">
                                                Choisissez une autre date
                                            </p>
                                        </div>
                                    )}

                                    {!loadingSlots && disponibilites.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {disponibilites.map(creneau => (
                                                <button
                                                    key={creneau}
                                                    type="button"
                                                    onClick={() => setData('heure', creneau)}
                                                    className={`py-2 rounded-xl font-bold text-sm transition ${
                                                        data.heure === creneau
                                                            ? 'bg-blue-500 text-white shadow'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                                                    }`}
                                                >
                                                    {creneau}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {errors.heure && <p className="text-red-500 text-sm mt-1">{errors.heure}</p>}
                                </div>
                            )}

                            {/* Boutons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing || !data.heure}
                                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement...' : '✅ Confirmer RDV'}
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="flex-1 text-center py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                                >
                                    ❌ Annuler
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}