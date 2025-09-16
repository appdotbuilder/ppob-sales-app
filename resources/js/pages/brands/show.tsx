import React from 'react';
import { MobileLayout } from '@/components/mobile-layout';
import { ProductCard } from '@/components/product-card';

interface Product {
    id: number;
    name: string;
    code: string;
    description?: string;
    price: number;
    specifications?: Record<string, string | number>;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
    category: Category;
    products: Product[];
}

interface Props {
    brand: Brand;
    [key: string]: unknown;
}

export default function BrandShow({ brand }: Props) {
    return (
        <MobileLayout 
            title={brand.name} 
            showBack 
            backUrl={`/categories/${brand.category.slug}`}
        >
            <div className="space-y-6">
                {/* Brand Header */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 py-6">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl font-bold text-primary">
                                {brand.name.charAt(0)}
                            </span>
                        </div>
                        <h1 className="text-xl font-bold mb-2">{brand.name}</h1>
                        <p className="text-sm text-muted-foreground mb-2">
                            {brand.description}
                        </p>
                        <div className="inline-flex items-center space-x-2 text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                            <span>{brand.category.icon}</span>
                            <span>{brand.category.name}</span>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="px-4">
                    <h2 className="text-lg font-bold mb-4">
                        Daftar Harga {brand.name}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {brand.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    
                    {brand.products.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum Ada Produk
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Produk untuk {brand.name} akan segera tersedia
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}