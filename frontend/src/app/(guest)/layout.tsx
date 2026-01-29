"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, Menu, X, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [categories, setCategories] = useState<{ id: number, title: string }[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch categories for navbar
        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Top Bar */}
            <div className="bg-[#0a291f] text-gray-300 py-2 px-4 text-xs md:text-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4">
                        <span className="flex items-center gap-1"><Mail size={14} /> info@eximroyals.com</span>
                        <span className="flex items-center gap-1"><Phone size={14} /> +91 98765 43210</span>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="#" className="hover:text-white transition"><Facebook size={14} /></Link>
                        <Link href="#" className="hover:text-white transition"><Twitter size={14} /></Link>
                        <Link href="#" className="hover:text-white transition"><Instagram size={14} /></Link>
                        <Link href="#" className="hover:text-white transition"><Linkedin size={14} /></Link>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-[#0f3d2e] tracking-tight">EXIM <span className="text-[#d4af37]">ROYALS</span></span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-800 hover:text-[#d4af37] font-medium transition">Home</Link>
                            <Link href="/about" className="text-gray-800 hover:text-[#d4af37] font-medium transition">About Us</Link>

                            <div className="relative group">
                                <button
                                    className="flex items-center text-gray-800 hover:text-[#d4af37] font-medium transition focus:outline-none"
                                >
                                    Products <ChevronDown size={16} className="ml-1" />
                                </button>
                                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="py-2">
                                        {categories.map(cat => (
                                            <Link key={cat.id} href={`/products/category/${cat.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f0fdf4] hover:text-[#0f3d2e]">
                                                {cat.title}
                                            </Link>
                                        ))}
                                        <Link href="/products" className="block px-4 py-2 text-sm text-[#d4af37] font-semibold hover:bg-gray-50 border-t border-gray-100 mt-1">
                                            View All Products
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/why-choose-us" className="text-gray-800 hover:text-[#d4af37] font-medium transition">Why Choose Us</Link>
                            <Link href="/contact" className="text-gray-800 hover:text-[#d4af37] font-medium transition">Contact Us</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="px-4 py-2 space-y-1">
                            <Link href="/" className="block py-2 text-gray-800 font-medium">Home</Link>
                            <Link href="/about" className="block py-2 text-gray-800 font-medium">About Us</Link>
                            <button
                                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                                className="w-full text-left flex justify-between items-center py-2 text-gray-800 font-medium"
                            >
                                Products <ChevronDown size={16} className={`transform transition ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isProductDropdownOpen && (
                                <div className="pl-4 space-y-1 bg-gray-50 rounded-md mb-2">
                                    {categories.map(cat => (
                                        <Link key={cat.id} href={`/products/category/${cat.id}`} className="block py-2 text-sm text-gray-600">
                                            {cat.title}
                                        </Link>
                                    ))}
                                    <Link href="/products" className="block py-2 text-sm text-[#d4af37] font-medium">All Products</Link>
                                </div>
                            )}
                            <Link href="/why-choose-us" className="block py-2 text-gray-800 font-medium">Why Choose Us</Link>
                            <Link href="/contact" className="block py-2 text-gray-800 font-medium">Contact Us</Link>
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#0f3d2e] text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">EXIM <span className="text-[#d4af37]">ROYALS</span></h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Your trusted partner in premium agro-exports. Delivering quality Indian produce to the global market with reliability and excellence.
                            </p>
                            <div className="flex space-x-4">
                                <Link href="#" className="bg-white/10 hover:bg-[#d4af37] p-2 rounded-full transition"><Facebook size={18} /></Link>
                                <Link href="#" className="bg-white/10 hover:bg-[#d4af37] p-2 rounded-full transition"><Twitter size={18} /></Link>
                                <Link href="#" className="bg-white/10 hover:bg-[#d4af37] p-2 rounded-full transition"><Linkedin size={18} /></Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-6 border-b border-[#d4af37] inline-block pb-2">Quick Links</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><Link href="/" className="hover:text-[#d4af37] transition">Home</Link></li>
                                <li><Link href="/about" className="hover:text-[#d4af37] transition">About Us</Link></li>
                                <li><Link href="/products" className="hover:text-[#d4af37] transition">Products</Link></li>
                                <li><Link href="/why-choose-us" className="hover:text-[#d4af37] transition">Why Choose Us</Link></li>
                                <li><Link href="/contact" className="hover:text-[#d4af37] transition">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-6 border-b border-[#d4af37] inline-block pb-2">Our Products</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                {categories.slice(0, 5).map(cat => (
                                    <li key={cat.id}><Link href={`/products/category/${cat.id}`} className="hover:text-[#d4af37] transition">{cat.title}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-6 border-b border-[#d4af37] inline-block pb-2">Contact Info</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                                    <span>123 Export House, Business Park,<br />Mumbai, India - 400001</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-[#d4af37] flex-shrink-0" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-[#d4af37] flex-shrink-0" />
                                    <span>info@eximroyals.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Exim Royals. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
