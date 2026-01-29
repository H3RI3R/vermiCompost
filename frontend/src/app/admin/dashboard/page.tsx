"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminDashboardPage() {
    const [counts, setCounts] = useState({ categories: 0, products: 0, enquiries: 0 });

    useEffect(() => {
        Promise.all([
            api.get('/categories'),
            api.get('/products'),
            api.get('/enquiries')
        ]).then(([catRes, prodRes, enqRes]) => {
            setCounts({
                categories: catRes.data.length,
                products: prodRes.data.length,
                enquiries: enqRes.data.length
            });
        }).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
                    <p className="text-3xl font-bold text-green-800 mt-2">{counts.categories}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Products</h3>
                    <p className="text-3xl font-bold text-green-800 mt-2">{counts.products}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Enquiries</h3>
                    <p className="text-3xl font-bold text-green-800 mt-2">{counts.enquiries}</p>
                </div>
            </div>
        </div>
    );
}
