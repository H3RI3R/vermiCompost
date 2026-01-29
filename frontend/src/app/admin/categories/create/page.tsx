"use client";

import CategoryForm from '@/components/admin/CategoryForm';

export default function CreateCategoryPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Add Category</h1>
            </div>
            <CategoryForm />
        </div>
    );
}
