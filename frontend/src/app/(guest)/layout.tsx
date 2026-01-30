"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Menu, X, Search, ChevronRight } from 'lucide-react';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [categories, setCategories] = useState<{ id: number, title: string }[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Fetch categories for footer
        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to fetch categories", err));

        // Handle scroll for sticky nav
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-slate-light font-sans text-slate-dark">

            {/* Modern Sticky Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-primary transition-colors">
                                D
                            </div>
                            <span className="text-2xl font-serif font-bold text-slate-dark tracking-tight group-hover:text-primary-dark transition-colors">
                                DND <span className="text-gold">Global Exports</span>
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Products', path: '/products' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Why Choose Us', path: '/why-choose-us' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <Link key={item.name} href={item.path} className="text-sm font-medium text-slate-mid hover:text-primary font-sans tracking-wide transition-colors relative group">
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}

                            <button className="text-slate-mid hover:text-primary transition-colors">
                                <Search size={20} />
                            </button>

                            <Link href="/contact" className="btn-primary text-sm px-6 py-2.5 shadow-md hover:shadow-lg">
                                Get Quote
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-slate-dark p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-slate-200 animate-fade-in-up">
                        <div className="flex flex-col p-6 space-y-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Products', path: '/products' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Why Choose Us', path: '/why-choose-us' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="text-lg font-medium text-slate-dark hover:text-primary py-2 border-b border-slate-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/contact" className="btn-primary text-center mt-4" onClick={() => setIsMenuOpen(false)}>
                                Get Quote
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-24">
                {children}
            </main>

            {/* Modern Footer */}
            <footer className="bg-slate-dark text-slate-light pt-20 pb-10 mt-auto relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-dark via-primary to-gold"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Company Info */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-serif font-bold text-white">
                                DND <span className="text-gold">Global</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Bridging the gap between Indian farmers and the world. We export premium quality agro-products with a commitment to freshness, transparency, and global standards.
                            </p>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                    <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                                        <Icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Quick Links</h4>
                            <ul className="space-y-3">
                                {['Home', 'About Us', 'Products', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-gold transition-colors flex items-center group">
                                            <ChevronRight size={14} className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Our Products</h4>
                            <ul className="space-y-3">
                                {categories.slice(0, 5).map(cat => (
                                    <li key={cat.id}>
                                        <Link href={`/products/category/${cat.id}`} className="text-slate-400 hover:text-gold transition-colors flex items-center group">
                                            <ChevronRight size={14} className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {cat.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Contact Us</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary mt-1">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-slate-400 text-sm">123 Export House, Business Park,<br />Mumbai, India - 400001</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-slate-400 text-sm hover:text-white transition-colors">+91 98765 43210</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-slate-400 text-sm hover:text-white transition-colors">info@dndglobal.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                        <p>&copy; {new Date().getFullYear()} DND Global Exports. All Rights Reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
