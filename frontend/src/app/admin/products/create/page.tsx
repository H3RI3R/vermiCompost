"use client";

import ProductForm from '@/components/admin/ProductForm';

export default function CreateProductPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Add Product</h1>
            </div>
            <ProductForm />
        </div>
    );
}
