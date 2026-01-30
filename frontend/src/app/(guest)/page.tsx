"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { ArrowRight, Leaf, ShieldCheck, Globe, Truck, Award } from 'lucide-react';

export default function Home() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        // Fetch categories
        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    // Stats Data
    const stats = [
        { label: "Countries Served", value: "25+" },
        { label: "Years Experience", value: "12+" },
        { label: "Happy Clients", value: "500+" },
        { label: "Product Varieties", value: "40+" }
    ];

    // Features Data
    const features = [
        { icon: Globe, title: "Global Reach", desc: "Exporting to over 25 countries with streamlined logistics and compliance." },
        { icon: ShieldCheck, title: "Quality Assured", desc: "100% certified organic produce with rigorous quality checks at every stage." },
        { icon: Leaf, title: "Farm Fresh", desc: "Sourced directly from our partner farms to ensure maximum freshness." },
        { icon: Truck, title: "Fast Delivery", desc: "Efficient supply chain management ensuring on-time delivery worldwide." }
    ];

    return (
        <div className="overflow-hidden">
            {/* HER HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-dark text-white overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-098e98e29a8c?q=80&w=1920&auto=format&fit=crop"
                        alt="Indian Agriculture"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-slate-900/70"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-gold/20 text-gold border border-gold/30 text-sm font-semibold tracking-wider mb-6 animate-fade-in-up">
                        PREMIUM INDIAN EXPORTS
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up animate-delay-100">
                        Bringing Nature's Best <br />
                        <span className="text-gradient-gold">From India to the World</span>
                    </h1>
                    <p className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                        Discover the finest quality spices, grains, and organic produce sourced directly from trusted Indian farms.
                        We bridge the gap between local excellence and global demand.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
                        <Link href="/products" className="btn-primary flex items-center gap-2 group">
                            Explore Products
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-dark">
                            Partner With Us
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-light to-transparent z-10"></div>
            </section>

            {/* STATS SECTION */}
            <section className="py-12 -mt-16 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center border-r last:border-0 border-slate-100">
                                <h3 className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</h3>
                                <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="py-24 bg-slate-light relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-slate-dark mb-4">Our Premium Collections</h2>
                        <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Explore our diverse range of high-quality agro products, carefully categorized to meet your specific needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.length > 0 ? (
                            categories.map((cat: any) => (
                                <Link
                                    key={cat.id}
                                    href={`/products/category/${cat.id}`}
                                    className="group relative h-96 rounded-2xl overflow-hidden shadow-lg card-hover"
                                >
                                    {/* Image with encoded URL fix */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(http://localhost:8080/uploads/${encodeURIComponent(cat.imageUrl || '')})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                                            <Award size={24} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{cat.title}</h3>
                                        <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            {cat.description}
                                        </p>
                                        <span className="text-white text-sm font-semibold flex items-center gap-2">
                                            View Products <ArrowRight size={16} className="text-gold" />
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                                <p>Loading categories...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-dark mb-6">
                                Quality that Speaks <br />
                                <span className="text-primary">Reliability that Matters</span>
                            </h2>
                            <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                                At DND Global Exports, we don't just export products; we export trust. Our rigorous quality control processes and direct farmer relationships ensure you get the best of India.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-colors group">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <feature.icon size={24} />
                                        </div>
                                        <h4 className="font-bold text-lg text-slate-dark mb-2">{feature.title}</h4>
                                        <p className="text-sm text-slate-500">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                            <img
                                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1000"
                                alt="Export quality inspection"
                                className="rounded-2xl shadow-2xl relative z-10 w-full"
                            />

                            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-xl shadow-xl animate-float hidden md:block border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Certified</p>
                                        <p className="font-serif font-bold text-lg text-slate-dark">100% Organic</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 bg-primary-dark relative overflow-hidden text-center text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-4xl font-serif font-bold mb-6">Ready to Experience Premium Quality?</h2>
                    <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10">
                        Connect with us today for a competitive quote and discover why leading global brands trust DND Global Exports.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white hover:text-gold transition-all transform hover:-translate-y-1">
                        Get a Free Quote <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
