import Navbar from '@/Components/Navbar';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { translations } = usePage().props;
    const t = (key) => translations?.messages?.[key] || key;

    return (
        <>
            <Head title={t('profile')} />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <div className="max-w-4xl mx-auto px-6 py-12">
                    
                    <div className="mb-10 text-center">
                        <div className="inline-block p-4 bg-blue-100 rounded-3xl mb-4 text-4xl">
                            ⚙️
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            {t('profile')}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            {t('profile_desc')}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                            <UpdatePasswordForm />
                        </div>

                        <div className="bg-red-50 border border-red-100 p-8 rounded-3xl shadow-sm">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
