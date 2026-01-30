"use client";

import { CheckCircle, Clock, Globe, Shield, Truck, Zap } from 'lucide-react';

export default function WhyChooseUsPage() {
    const features = [
        {
            icon: Shield,
            title: "Quality Assurance",
            desc: "Our rigorous 7-step quality control process ensures only the best produce reaches you. We are certified by major international food safety bodies."
        },
        {
            icon: Globe,
            title: "Global Network",
            desc: "With partners in over 25 countries, we understand global trade compliance, documentation, and logistics better than anyone."
        },
        {
            icon: Truck,
            title: "Efficient Logistics",
            desc: "Our strategic partnerships with leading shipping lines ensure your cargo is prioritized and delivered on time, every time."
        },
        {
            icon: Clock,
            title: "Consistent Supply",
            desc: "We work directly with a vast network of farmers to ensure round-the-clock availability of seasonal and non-seasonal produce."
        },
        {
            icon: Zap,
            title: "Fast Custom Clearance",
            desc: "Our expert team handles all documentation and regulatory requirements to ensure zero delays at customs."
        },
        {
            icon: CheckCircle,
            title: "Transparent Pricing",
            desc: "No hidden costs. We provide clear, competitive pricing with detailed breakdowns for all our clients."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <section className="relative py-20 bg-slate-dark text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Why Partner With Us?</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Excellence is not just an act, but a habit at DND Global Exports. Here is what sets us apart.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-2">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-dark mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-dark mb-6">Ready to start your export journey?</h2>
                    <p className="text-slate-500 mb-8">Join hundreds of satisfied clients who trust DND Global Exports for their agricultural needs.</p>
                    <a href="/contact" className="btn-primary inline-flex items-center gap-2">
                        Get In Touch
                    </a>
                </div>
            </section>
        </div>
    );
}
