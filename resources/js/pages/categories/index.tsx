import React from 'react';
import { MobileLayout } from '@/components/mobile-layout';
import { CategoryCard } from '@/components/category-card';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    return (
        <MobileLayout title="Semua Kategori" showBack backUrl="/">
            <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
                
                {categories.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Belum Ada Kategori
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Kategori produk akan segera tersedia
                        </p>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}