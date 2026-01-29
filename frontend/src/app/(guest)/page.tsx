import Link from 'next/link';
import { ArrowRight, Globe, ShieldCheck, Leaf, Truck } from 'lucide-react';
import api from '@/lib/api';

// This is a server component, but we will use client-side fetching for now via the API helper we made (or Fetch directly)
// Actually, in App router we can make this async component.
// But our 'api' helper is configured for client side (interceptors look at window).
// Let's use fetch() for server components or standard client component.
// For simplicity and to reuse our 'globals', let's stick to client component pattern or standard async fetch if possible.
// Wait, `api.ts` uses `localStorage` which fails on server.
// I'll make this a client component for now to be safe, or just use standard fetch.
// Given time constraints, I'll use "use client" for dynamic parts or just standard fetch.
// Let's go with "use client" for interactivity in the Hero if needed, but SEO is key.
// I'll use a mixed approach: Main page server component, fetches via standard fetch (not my axios instance).

async function getCategories() {
    try {
        const res = await fetch('http://localhost:8080/api/categories', { cache: 'no-store' }); // Ensure dynamic SSG/SSR
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function HomePage() {
    const categories = await getCategories();

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(15, 61, 46, 0.8), rgba(15, 61, 46, 0.7)), url("https://images.unsplash.com/photo-1595839088569-42c2317ca756?auto=format&fit=crop&q=80")' }}>
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <span className="block text-[#d4af37] font-semibold text-lg mb-4 tracking-wider uppercase animation-fade-in">Premium Indian Exports</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Connecting Quality Indian<br />Agro Products to the World</h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">Experience the finest quality spices, grains, and fresh produce sourced directly from Indian farms.</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/products" className="bg-[#d4af37] text-[#0f3d2e] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition flex items-center justify-center gap-2">
                            Explore Products <ArrowRight size={20} />
                        </Link>
                        <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0f3d2e] transition">
                            Enquire Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-[#0f3d2e] mb-6">Welcome to Exim Royals</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            We are a leading export company dedicated to bringing the richness of Indian agriculture to global markets. With a focus on quality, transparency, and timely delivery, we bridge the gap between Indian farmers and international buyers.
                        </p>
                        <Link href="/about" className="text-[#d4af37] font-semibold hover:text-[#0f3d2e] inline-flex items-center gap-1 transition">
                            Read More About Us <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#d4af37] font-semibold tracking-wider uppercase text-sm">What We Offer</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0f3d2e] mt-2">Our Product Categories</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.length > 0 ? (
                            categories.map((cat: any) => (
                                <Link key={cat.id} href={`/products/category/${cat.id}`} className="group relative block overflow-hidden rounded-xl shadow-lg h-80">
                                    {cat.imageUrl ? (
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(http://localhost:8080/uploads/${cat.imageUrl})` }}></div>
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-300 transition-transform duration-500 group-hover:scale-110"></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                                        <p className="text-gray-300 text-sm line-clamp-2">{cat.description}</p>
                                        <span className="inline-block mt-4 text-[#d4af37] text-sm font-semibold group-hover:translate-x-2 transition-transform">View Products &rarr;</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 text-gray-500">
                                No categories found.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features/Why Choose Us Preview */}
            <section className="py-20 bg-[#0f3d2e] text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <Globe size={48} className="mx-auto text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold mb-3">Global Reach</h3>
                            <p className="text-gray-300 text-sm">Exporting to over 20+ countries with established supply chains.</p>
                        </div>
                        <div className="p-6">
                            <ShieldCheck size={48} className="mx-auto text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold mb-3">Quality Assured</h3>
                            <p className="text-gray-300 text-sm">Rigorous quality checks at every stage ensuring premium grade.</p>
                        </div>
                        <div className="p-6">
                            <Leaf size={48} className="mx-auto text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold mb-3">Fresh & Organic</h3>
                            <p className="text-gray-300 text-sm">Directly sourced from trusted farmers committed to sustainable practices.</p>
                        </div>
                        <div className="p-6">
                            <Truck size={48} className="mx-auto text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold mb-3">Timely Delivery</h3>
                            <p className="text-gray-300 text-sm">Efficient logistics ensuring your products arrive fresh and on time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#0f3d2e] mb-6">Ready to Partner with Us?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Get in touch today to discuss your requirements and get a competitive quote.</p>
                    <Link href="/contact" className="bg-[#d4af37] text-[#0f3d2e] px-8 py-3 rounded-md font-bold hover:bg-[#b08e26] transition">
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </>
    );
}
