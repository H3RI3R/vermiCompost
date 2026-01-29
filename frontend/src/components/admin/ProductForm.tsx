"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

interface Category {
    id: number;
    title: string;
}

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [pdf, setPdf] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories for dropdown
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to fetch categories");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                categoryId: initialData.category?.id || '',
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('categoryId', formData.categoryId);

        if (image) {
            data.append('image', image);
        }
        if (pdf) {
            data.append('pdf', pdf);
        }

        try {
            if (isEdit && initialData?.id) {
                await api.put(`/products/${initialData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            router.push('/admin/products');
        } catch (error) {
            alert('Failed to save product');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Create New Product'}</h2>

            <div className="space-y-4">
                <Input
                    label="Product Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files && setImage(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        {initialData?.imageUrl && !image && (
                            <p className="mt-2 text-xs text-gray-500 truncate" title={initialData.imageUrl}>Current: ...{initialData.imageUrl.slice(-15)}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product PDF (Optional)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => e.target.files && setPdf(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        {initialData?.pdfUrl && !pdf && (
                            <p className="mt-2 text-xs text-gray-500 truncate" title={initialData.pdfUrl}>Current: ...{initialData.pdfUrl.slice(-15)}</p>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" isLoading={loading}>
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
