"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CategoryFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function CategoryForm({ initialData, isEdit }: CategoryFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (image) {
            data.append('image', image);
        }

        try {
            if (isEdit && initialData?.id) {
                await api.put(`/categories/${initialData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/categories', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            router.push('/admin/categories');
        } catch (error) {
            alert('Failed to save category');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-6">{isEdit ? 'Edit Category' : 'Create New Category'}</h2>

            <div className="space-y-4">
                <Input
                    label="Category Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setImage(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    {initialData?.imageUrl && !image && (
                        <p className="mt-2 text-xs text-gray-500">Current image: {initialData.imageUrl}</p>
                    )}
                </div>

                <div className="pt-4">
                    <Button type="submit" isLoading={loading}>
                        {isEdit ? 'Update Category' : 'Create Category'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
