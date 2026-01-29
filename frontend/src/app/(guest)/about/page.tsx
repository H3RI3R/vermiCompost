"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AboutPage() {
    const [page, setPage] = useState<any>(null);

    useEffect(() => {
        api.get('/static-pages/about-us')
            .then(res => setPage(res.data))
            .catch(() => { });
    }, []);

    // Fallback content if backend is empty
    const title = page?.title || "About Exim Royals";
    const content = page?.content || "We are a premier export company...";

    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-[#0f3d2e] mb-8 text-center">{title}</h1>
            {page?.imageUrl && (
                <img src={`http://localhost:8080/uploads/${page.imageUrl}`} alt="About Us" className="w-full h-96 object-cover rounded-xl shadow-lg mb-8" />
            )}
            <div className="prose prose-lg mx-auto text-gray-700">
                {content}
            </div>
        </div>
    );
}
