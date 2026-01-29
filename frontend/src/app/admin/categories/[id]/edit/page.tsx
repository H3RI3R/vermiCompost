"use client";

import { useEffect, useState } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import api from '@/lib/api';

export default function EditCategoryPage({ params }: { params: { id: string } }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/categories/${params.id}`);
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch category");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Category not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Category</h1>
            </div>
            <CategoryForm initialData={data} isEdit />
        </div>
    );
}
