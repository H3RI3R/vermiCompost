"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Search, ChevronRight } from 'lucide-react';

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
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">Our Collection</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-dark mb-4">Premium Products</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">Browse our wide range of export-quality agro products.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-12">
                    <div className="glass-panel p-2 rounded-full inline-flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'all' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}
                        >
                            All Products
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id.toString())}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.id.toString() ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col h-full card-hover">
                                <div className="h-64 overflow-hidden relative">
                                    {product.imageUrl ? (
                                        <img src={`http://localhost:8080/uploads/${encodeURIComponent(product.imageUrl)}`} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-3">
                                        <span className="text-xs uppercase tracking-widest font-bold text-gold">{product.category?.title}</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-slate-dark mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">{product.description}</p>

                                    <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
                                        <Link href="/contact" className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors flex items-center group/link">
                                            Enquire Now <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                        {product.pdfUrl && (
                                            <a href={`http://localhost:8080/uploads/${product.pdfUrl}`} target="_blank" className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                                                Download PDF
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                                <p>No products found in this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
