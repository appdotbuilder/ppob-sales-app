import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
}

interface BrandCardProps {
    brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
    return (
        <Link href={`/brands/${brand.slug}`} className="block">
            <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border hover:border-primary/40">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-200">
                            <span className="text-lg font-bold text-primary">
                                {brand.name.charAt(0)}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                                {brand.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {brand.description}
                            </p>
                        </div>
                        <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}