import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
}

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/categories/${category.slug}`} className="block">
            <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                        {category.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}