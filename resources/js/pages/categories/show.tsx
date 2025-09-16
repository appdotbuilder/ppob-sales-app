import React from 'react';
import { MobileLayout } from '@/components/mobile-layout';
import { BrandCard } from '@/components/brand-card';

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
    brands: Brand[];
}

interface Props {
    category: Category;
    [key: string]: unknown;
}

export default function CategoryShow({ category }: Props) {
    return (
        <MobileLayout 
            title={category.name} 
            showBack 
            backUrl="/categories"
        >
            <div className="space-y-6">
                {/* Category Header */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-6">
                    <div className="text-center">
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h1 className="text-xl font-bold mb-2">{category.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            {category.description}
                        </p>
                    </div>
                </div>

                {/* Brands */}
                <div className="px-4">
                    <h2 className="text-lg font-bold mb-4">
                        Pilih Brand {category.name}
                    </h2>
                    
                    <div className="grid gap-3">
                        {category.brands.map((brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}
                    </div>
                    
                    {category.brands.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🏷️</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum Ada Brand
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Brand untuk kategori {category.name} akan segera tersedia
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}