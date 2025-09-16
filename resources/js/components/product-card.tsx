import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    code: string;
    description?: string;
    price: number;
    specifications?: Record<string, string | number>;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {product.code}
                    </span>
                </div>
                
                {product.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}
                
                {product.specifications && (
                    <div className="space-y-1 mb-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-xs">
                                <span className="text-muted-foreground capitalize">{key}:</span>
                                <span className="font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                        {formatCurrency(product.price)}
                    </p>
                </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
                <Link href={`/orders/create/${product.id}`} className="w-full">
                    <Button className="w-full" size="sm">
                        Beli Sekarang
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}