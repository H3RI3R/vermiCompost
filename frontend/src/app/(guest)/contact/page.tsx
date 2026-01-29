"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        productId: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('country', formData.country);
        data.append('email', formData.email);
        data.append('message', formData.message);
        if (formData.productId) {
            data.append('productId', formData.productId);
        }

        try {
            await api.post('/enquiries', data);
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                country: '',
                email: '',
                productId: '',
                message: ''
            });
        } catch (error) {
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#0f3d2e] mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Get in touch with our team for any queries regarding our products, exports, or partnerships.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-[#0f3d2e] text-white p-10 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <MapPin size={24} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                                    <p className="text-gray-300">123 Export House, Business Park,<br />Mumbai, India - 400001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Phone size={24} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                                    <p className="text-gray-300">+91 98765 43210</p>
                                    <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9am - 6pm IST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Mail size={24} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                                    <p className="text-gray-300">info@eximroyals.com</p>
                                    <p className="text-gray-300">export@eximroyals.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <h3 className="font-semibold text-lg mb-4">Exporting To</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                USA, UK, UAE, Canada, Australia, Germany, France, and 15+ other countries.
                            </p>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#0f3d2e] mb-6">Send an Enquiry</h2>

                        {success ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                <p>Your enquiry has been submitted successfully. Our team will contact you shortly.</p>
                                <button onClick={() => setSuccess(false)} className="mt-4 text-[#0f3d2e] font-semibold hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="First Name"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Last Name"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Country"
                                        placeholder="USA"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Interest (Optional)</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                        value={formData.productId}
                                        onChange={e => setFormData({ ...formData, productId: e.target.value })}
                                    >
                                        <option value="">General Enquiry</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                                        rows={4}
                                        placeholder="Tell us about your requirements..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full text-lg" isLoading={loading}>
                                    Submit Enquiry
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
