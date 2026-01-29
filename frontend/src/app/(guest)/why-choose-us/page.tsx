"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function WhyChooseUsPage() {
    const [page, setPage] = useState<any>(null);

    useEffect(() => {
        api.get('/static-pages/why-choose-us')
            .then(res => setPage(res.data))
            .catch(() => { });
    }, []);

    const title = page?.title || "Why Choose Us";
    const content = page?.content || "Quality, Trust, and Excellence...";

    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-[#0f3d2e] mb-8 text-center">{title}</h1>
            {page?.imageUrl && (
                <img src={`http://localhost:8080/uploads/${page.imageUrl}`} alt="Why Choose Us" className="w-full h-96 object-cover rounded-xl shadow-lg mb-8" />
            )}
            <div className="prose prose-lg mx-auto text-gray-700">
                {content}
            </div>
        </div>
    );
}
