import React from 'react';
import { Link } from '@inertiajs/react';
import { MobileLayout } from '@/components/mobile-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Order {
    id: number;
    order_number: string;
    customer_phone: string;
    customer_email?: string;
    customer_name: string;
    amount: number;
    admin_fee: number;
    total_amount: number;
    status: string;
    notes?: string;
    created_at: string;
    product: {
        id: number;
        name: string;
        code: string;
        specifications?: Record<string, string | number>;
        brand: {
            name: string;
            category: {
                name: string;
                icon: string;
            };
        };
    };
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function OrderShow({ order }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        🕐 Menunggu Pembayaran
                    </span>
                );
            case 'processing':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ⚡ Sedang Diproses
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Selesai
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ❌ Gagal
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        🚫 Dibatalkan
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    return (
        <MobileLayout 
            title="Checkout" 
            showBack 
            backUrl="/orders"
        >
            <div className="p-4 space-y-4">
                {/* Order Status */}
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">
                            {order.status === 'completed' ? '🎉' : order.status === 'failed' ? '😞' : '📋'}
                        </div>
                        <h1 className="text-lg font-bold mb-2">
                            {order.status === 'completed' 
                                ? 'Pesanan Berhasil!' 
                                : order.status === 'failed'
                                ? 'Pesanan Gagal'
                                : 'Review Pesanan Anda'
                            }
                        </h1>
                        <p className="text-sm text-muted-foreground mb-3">
                            No. Pesanan: <span className="font-mono font-medium">{order.order_number}</span>
                        </p>
                        <div className="flex justify-center">
                            {getStatusBadge(order.status)}
                        </div>
                    </CardContent>
                </Card>

                {/* Product Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Detail Produk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{order.product.brand.category.icon}</div>
                            <div>
                                <p className="font-semibold text-sm">{order.product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {order.product.brand.name} • {order.product.code}
                                </p>
                            </div>
                        </div>
                        
                        {order.product.specifications && (
                            <div className="space-y-1">
                                {Object.entries(order.product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                        <span className="text-muted-foreground capitalize">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Customer Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Data Customer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Nama:</span>
                            <span className="font-medium">{order.customer_name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                {order.product.brand.category.name === 'Games' ? 'User ID:' : 'HP/ID:'}
                            </span>
                            <span className="font-medium font-mono">{order.customer_phone}</span>
                        </div>
                        {order.customer_email && (
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Email:</span>
                                <span className="font-medium">{order.customer_email}</span>
                            </div>
                        )}
                        {order.notes && (
                            <div className="pt-2 border-t">
                                <p className="text-xs text-muted-foreground mb-1">Catatan:</p>
                                <p className="text-sm">{order.notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Payment Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Rincian Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Harga Produk:</span>
                            <span className="font-medium">{formatCurrency(order.amount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Biaya Admin:</span>
                            <span className="font-medium">{formatCurrency(order.admin_fee)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary border-t pt-2">
                            <span>Total:</span>
                            <span>{formatCurrency(order.total_amount)}</span>
                        </div>
                        <div className="text-xs text-muted-foreground pt-1">
                            Dibuat: {formatDate(order.created_at)}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {order.status === 'pending' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="text-yellow-500 text-lg">⏳</div>
                                <div>
                                    <p className="text-sm font-medium text-yellow-800 mb-2">
                                        Menunggu Pembayaran
                                    </p>
                                    <p className="text-xs text-yellow-700 mb-3">
                                        Silakan lakukan pembayaran sesuai dengan total yang tertera di atas.
                                    </p>
                                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                                        Bayar Sekarang
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {order.status === 'completed' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">✅</div>
                            <p className="text-sm font-medium text-green-800 mb-2">
                                Transaksi Berhasil
                            </p>
                            <p className="text-xs text-green-700">
                                Produk telah berhasil diproses dan dikirim ke tujuan.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Link href="/orders" className="flex-1">
                            <Button variant="outline" className="w-full">
                                Lihat Pesanan Lain
                            </Button>
                        </Link>
                        <Link href="/" className="flex-1">
                            <Button className="w-full">
                                Buat Pesanan Baru
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Help */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-gray-500 text-lg">💬</div>
                        <div className="text-xs text-gray-600">
                            <p className="font-medium mb-1">Butuh Bantuan?</p>
                            <p>Hubungi customer service kami jika mengalami kendala atau membutuhkan bantuan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}