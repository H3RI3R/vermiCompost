"use client";

import { Award, Globe, Leaf, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-slate-900/80"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Our Story</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up animate-delay-100">
                        Rooted in Tradition, <br />
                        <span className="text-gradient-gold">Expanding Horizons</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                        DND Global Exports is a premier Indian export house committed to delivering the finest agro-products to the global market.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
                                alt="Indian Farmer"
                                className="rounded-2xl shadow-xl relative z-10 w-full hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-slate-dark mb-6">Our Mission</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                                To bridge the gap between Indian farmers and international buyers by providing a seamless, transparent, and quality-driven export ecosystem. We strive to empower local agriculture while meeting global standards.
                            </p>

                            <h2 className="text-3xl font-serif font-bold text-slate-dark mb-6">Our Vision</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To become the most trusted name in the global agro-export industry, recognized for our commitment to quality, sustainability, and ethical business practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-slate-light relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Identification</span>
                        <h2 className="text-4xl font-serif font-bold text-slate-dark">Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: "Sustainability", desc: "Promoting eco-friendly farming practices." },
                            { icon: Award, title: "Quality", desc: "Never compromising on international standards." },
                            { icon: Users, title: "Integrity", desc: "Building transparent and lasting relationships." },
                            { icon: Globe, title: "Global Reach", desc: "Connecting local produce to the world." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-slate-100">
                                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-dark mb-3">{item.title}</h3>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
