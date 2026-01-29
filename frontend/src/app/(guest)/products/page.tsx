"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Search } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories')
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category?.id?.toString() === selectedCategory);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#0f3d2e] mb-2">Our Products</h1>
                    <p className="text-gray-600">Browse our wide range of premium agro-products.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-8">
                    <div className="flex overflow-x-auto space-x-2 pb-2 md:pb-0 w-full md:w-auto">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedCategory === 'all' ? 'bg-[#0f3d2e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            All Products
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id.toString())}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedCategory === cat.id.toString() ? 'bg-[#0f3d2e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 flex flex-col">
                                <div className="h-64 overflow-hidden relative group">
                                    {product.imageUrl ? (
                                        <img src={`http://localhost:8080/uploads/${product.imageUrl}`} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-xs uppercase tracking-wider font-semibold text-[#d4af37]">{product.category?.title}</span>
                                    </div>
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
                        {filteredProducts.length === 0 && (
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
