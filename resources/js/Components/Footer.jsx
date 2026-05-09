import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 text-center mt-auto">
            <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-2xl">🐾</span>
                <span className="font-bold text-lg">VetClinic</span>
            </div>
            <p className="text-gray-400 text-sm">
                © 2026 VetClinic — Tous droits réservés
            </p>
            <p className="text-gray-500 text-xs mt-1">
                cliniqueveto@gmail.com
            </p>
        </footer>
    );
}
