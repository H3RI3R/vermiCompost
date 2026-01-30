"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, ArrowRight, Loader2, Globe, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(email, password);
            router.push('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Panel - Visual Branding */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105 hover:scale-110 transition-transform duration-[20s]"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542281286-9e0a56e2e1a1?auto=format&fit=crop&q=80&w=2000)' }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/90 to-slate-900/80"></div>

                <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
                    <div>
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 mb-8">
                            <span className="text-2xl font-bold font-serif text-white">D</span>
                        </div>
                        <h1 className="text-5xl font-serif font-bold leading-tight mb-6">
                            Bridging Borders,<br />
                            <span className="text-emerald-400">Connecting Worlds.</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                            Welcome to the DND Global Exports command center. Manage your premium agro-product logistics with precision and ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <Globe className="w-8 h-8 text-emerald-400 mb-4" />
                            <h3 className="font-semibold text-lg mb-1">Global Scale</h3>
                            <p className="text-sm text-slate-400">Serving clients across 30+ countries worldwide.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <ShieldCheck className="w-8 h-8 text-gold mb-4" />
                            <h3 className="font-semibold text-lg mb-1">Secure Admin</h3>
                            <p className="text-sm text-slate-400">Enterprise-grade security for your operations.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <div className="absolute top-0 right-0 p-8">
                    <div className="w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl mx-auto absolute -top-10 -right-10"></div>
                </div>

                <div className="max-w-md w-full relative z-10 w-full">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-3">Welcome Back</h2>
                        <p className="text-slate-500">Sign in to access your admin dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center shadow-sm animate-fade-in-up">
                            <span className="mr-2">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600 text-slate-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 shadow-sm group-hover:border-slate-300"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="absolute -top-2.5 left-4 px-2 bg-white text-xs font-semibold text-emerald-600 transition-all opacity-0 group-focus-within:opacity-100 transform translate-y-1 group-focus-within:translate-y-0">
                                    Email Address
                                </label>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 shadow-sm group-hover:border-slate-300"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="absolute -top-2.5 left-4 px-2 bg-white text-xs font-semibold text-emerald-600 transition-all opacity-0 group-focus-within:opacity-100 transform translate-y-1 group-focus-within:translate-y-0">
                                    Password
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-slate-500">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">Forgot password?</a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-lg font-medium bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:shadow-emerald-900/20 flex items-center justify-center group"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                        <p>© 2026 DND Global Exports. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
