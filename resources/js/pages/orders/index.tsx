import React from 'react';
import { Link } from '@inertiajs/react';
import { MobileLayout } from '@/components/mobile-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Order {
    id: number;
    order_number: string;
    customer_phone: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
    product: {
        name: string;
        brand: {
            name: string;
            category: {
                name: string;
                icon: string;
            };
        };
    };
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    orders: PaginatedOrders;
    [key: string]: unknown;
}

export default function OrdersIndex({ orders }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                    </span>
                );
            case 'processing':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Proses
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Selesai
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Gagal
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    return (
        <MobileLayout title="Pesanan Saya" showBack backUrl="/dashboard">
            <div className="p-4 space-y-4">
                {orders.data.length > 0 ? (
                    <>
                        <div className="space-y-3">
                            {orders.data.map((order) => (
                                <Card key={order.id} className="transition-all duration-200 hover:shadow-md">
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-lg">{order.product.brand.category.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-sm">
                                                        {order.product.name}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {order.product.brand.name}
                                                    </p>
                                                </div>
                                            </div>
                                            {getStatusBadge(order.status)}
                                        </div>
                                        
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">No. Pesanan:</span>
                                                <span className="font-mono">{order.order_number}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Customer:</span>
                                                <span>{order.customer_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total:</span>
                                                <span className="font-semibold text-primary">
                                                    {formatCurrency(order.total_amount)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Tanggal:</span>
                                                <span>{formatDate(order.created_at)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 pt-3 border-t">
                                            <Link href={`/orders/${order.id}`}>
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Lihat Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {orders.last_page > 1 && (
                            <div className="flex justify-center space-x-2 pt-4">
                                {orders.current_page > 1 && (
                                    <Link href={`/orders?page=${orders.current_page - 1}`}>
                                        <Button variant="outline" size="sm">
                                            Sebelumnya
                                        </Button>
                                    </Link>
                                )}
                                
                                <span className="flex items-center px-3 py-2 text-sm">
                                    Halaman {orders.current_page} dari {orders.last_page}
                                </span>
                                
                                {orders.current_page < orders.last_page && (
                                    <Link href={`/orders?page=${orders.current_page + 1}`}>
                                        <Button variant="outline" size="sm">
                                            Selanjutnya
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Belum Ada Pesanan
                        </h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Anda belum memiliki pesanan. Mulai berbelanja sekarang!
                        </p>
                        <Link href="/">
                            <Button>
                                Mulai Belanja
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}