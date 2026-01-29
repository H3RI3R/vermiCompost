"use client";

import { useEffect, useState } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import api from '@/lib/api';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/products/${params.id}`);
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Product not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Product</h1>
            </div>
            <ProductForm initialData={data} isEdit />
        </div>
    );
}
