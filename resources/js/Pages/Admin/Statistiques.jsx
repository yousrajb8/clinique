import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistiques({ rdvParMois, rdvParService, rdvParStatut, stats }) {
    const { translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    // 1. Histogramme — RDV par mois
    const barData = {
        labels: rdvParMois.map(r => r.mois),
        datasets: [{
            label: t('rdv_per_month'),
            data: rdvParMois.map(r => r.total),
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            borderRadius: 8,
        }]
    };

    // 2. Secteur — RDV par service
    const pieData = {
        labels: rdvParService.map(r => r.service),
        datasets: [{
            data: rdvParService.map(r => r.total),
            backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)',
            ],
            borderWidth: 2,
        }]
    };

    // 3. Courbe — RDV par statut
    const lineData = {
        labels: rdvParStatut.map(r => r.statut),
        datasets: [{
            label: t('rdv_per_status'),
            data: rdvParStatut.map(r => r.total),
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(16, 185, 129, 1)',
            pointRadius: 6,
        }]
    };

    return (
        <>
            <Head title={t('statistics')} />

            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
                        📊 {t('statistics')}
                    </h1>

                    {/* Chiffres clés */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: t('appointments'), value: stats.total_rdv, icon: '📅', color: 'bg-blue-50 border-blue-200' },
                            { label: t('clients'), value: stats.total_users, icon: '👥', color: 'bg-green-50 border-green-200' },
                            { label: t('animals'), value: stats.total_animals, icon: '🐾', color: 'bg-yellow-50 border-yellow-200' },
                            { label: t('pending'), value: stats.rdv_en_attente, icon: '⏳', color: 'bg-red-50 border-red-200' },
                        ].map((s, i) => (
                            <div key={i} className={`${s.color} border rounded-2xl p-6 text-center shadow-sm`}>
                                <div className="text-4xl mb-2">{s.icon}</div>
                                <div className="text-3xl font-extrabold text-gray-800">{s.value}</div>
                                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Graphiques */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Histogramme */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-700 mb-4">
                                📊 {t('rdv_per_month')}
                            </h2>
                            <Bar data={barData} />
                        </div>

                        {/* Secteur */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-700 mb-4">
                                🥧 {t('rdv_per_service')}
                            </h2>
                            <Pie data={pieData} />
                        </div>

                        {/* Courbe */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
                            <h2 className="text-lg font-bold text-gray-700 mb-4">
                                📈 {t('rdv_per_status')}
                            </h2>
                            <Line data={lineData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
