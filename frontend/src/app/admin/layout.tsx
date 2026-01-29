"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const user = authService.getCurrentUser();
        if (!user) {
            router.push('/admin/login');
        }
    }, [router]);

    if (!mounted) return null;

    const handleLogout = () => {
        authService.logout();
        router.push('/admin/login');
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Categories', href: '/admin/categories' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Enquiries', href: '/admin/enquiries' },
    ];

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="p-6">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>Exim Royals</h2>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Admin Panel</p>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith(item.href)
                                    ? 'bg-green-50 text-green-800 border-l-4 border-green-800' // rudimentary active state
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            style={pathname.startsWith(item.href) ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: '#f0fdf4' } : {}}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 mt-8 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
