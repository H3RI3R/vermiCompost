"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function CategoryProductsPage() {
    const params = useParams();
    const id = params.id;

    const [products, setProducts] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch category details
                const catRes = await api.get(`/categories/${id}`);
                setCategory(catRes.data);

                // Fetch products (efficiently via endpoint if we had it, or filter all)
                // We have /products/category/{id} endpoint
                const prodRes = await api.get(`/products/category/${id}`);
                setProducts(prodRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Category Hero */}
            <div className="bg-[#0f3d2e] text-white py-16 text-center relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-4">{category?.title || 'Category'}</h1>
                    <p className="max-w-2xl mx-auto text-gray-300">{category?.description}</p>
                </div>
                {/* Optional BG Image overlay if category has one */}
                {category?.imageUrl && (
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(http://localhost:8080/uploads/${encodeURIComponent(category.imageUrl)})` }}></div>
                )}
            </div>

            <div className="container mx-auto px-4 py-10">
                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 flex flex-col">
                                <div className="h-64 overflow-hidden relative">
                                    {product.imageUrl ? (
                                        <img src={`http://localhost:8080/uploads/${product.imageUrl}`} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-[#0f3d2e] mb-3">{product.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{product.description}</p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <Link href="/contact" className="text-[#0f3d2e] font-semibold text-sm hover:text-[#d4af37] transition">
                                            Enquire Now
                                        </Link>
                                        {product.pdfUrl && (
                                            <a href={`http://localhost:8080/uploads/${product.pdfUrl}`} target="_blank" className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 transition">
                                                Download PDF
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-gray-500">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
