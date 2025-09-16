import React from 'react';
import { useForm } from '@inertiajs/react';
import { MobileLayout } from '@/components/mobile-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Product {
    id: number;
    name: string;
    code: string;
    description?: string;
    price: number;
    specifications?: Record<string, string | number>;
    brand: {
        id: number;
        name: string;
        category: {
            id: number;
            name: string;
            icon: string;
        };
    };
}

interface OrderFormData {
    product_id: number;
    customer_phone: string;
    customer_email: string;
    customer_name: string;
    customer_id: string;
    notes: string;
    [key: string]: string | number;
}

interface Props {
    product: Product;
    [key: string]: unknown;
}

export default function OrderCreate({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm<OrderFormData>({
        product_id: product.id,
        customer_phone: '',
        customer_email: '',
        customer_name: '',
        customer_id: '',
        notes: '',
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const adminFee = 1500;
    const totalAmount = product.price + adminFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <MobileLayout 
            title="Buat Pesanan" 
            showBack 
            backUrl={`/brands/${product.brand.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <div className="p-4 space-y-4">
                {/* Product Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Detail Produk</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{product.brand.category.icon}</div>
                            <div>
                                <p className="font-semibold text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {product.brand.name} • {product.code}
                                </p>
                            </div>
                        </div>
                        
                        {product.specifications && (
                            <div className="space-y-1">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                        <span className="text-muted-foreground capitalize">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="border-t pt-3 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Harga Produk:</span>
                                <span className="font-medium">{formatCurrency(product.price)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Biaya Admin:</span>
                                <span className="font-medium">{formatCurrency(adminFee)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-primary border-t pt-1">
                                <span>Total:</span>
                                <span>{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Data Customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="customer_name">Nama Customer *</Label>
                                <Input
                                    id="customer_name"
                                    type="text"
                                    value={data.customer_name}
                                    onChange={(e) => setData('customer_name', e.target.value)}
                                    placeholder="Masukkan nama customer"
                                    required
                                />
                                {errors.customer_name && (
                                    <p className="text-xs text-red-500">{errors.customer_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customer_phone">Nomor HP/ID Customer *</Label>
                                <Input
                                    id="customer_phone"
                                    type="text"
                                    value={data.customer_phone}
                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                    placeholder={
                                        product.brand.category.name === 'Games' 
                                            ? 'Masukkan User ID game'
                                            : product.brand.category.name === 'PLN'
                                            ? 'Masukkan ID Pelanggan PLN'
                                            : 'Masukkan nomor HP'
                                    }
                                    required
                                />
                                {errors.customer_phone && (
                                    <p className="text-xs text-red-500">{errors.customer_phone}</p>
                                )}
                            </div>

                            {product.brand.category.name === 'Games' && (
                                <div className="space-y-2">
                                    <Label htmlFor="customer_id">Zone ID (Opsional)</Label>
                                    <Input
                                        id="customer_id"
                                        type="text"
                                        value={data.customer_id}
                                        onChange={(e) => setData('customer_id', e.target.value)}
                                        placeholder="Masukkan Zone ID"
                                    />
                                    {errors.customer_id && (
                                        <p className="text-xs text-red-500">{errors.customer_id}</p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="customer_email">Email (Opsional)</Label>
                                <Input
                                    id="customer_email"
                                    type="email"
                                    value={data.customer_email}
                                    onChange={(e) => setData('customer_email', e.target.value)}
                                    placeholder="Masukkan email untuk notifikasi"
                                />
                                {errors.customer_email && (
                                    <p className="text-xs text-red-500">{errors.customer_email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Catatan (Opsional)</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Tambahkan catatan jika diperlukan"
                                    rows={3}
                                />
                                {errors.notes && (
                                    <p className="text-xs text-red-500">{errors.notes}</p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full" 
                                disabled={processing}
                                size="lg"
                            >
                                {processing ? 'Memproses...' : `Bayar ${formatCurrency(totalAmount)}`}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-blue-500 text-lg">ℹ️</div>
                        <div className="text-xs text-blue-700">
                            <p className="font-medium mb-1">Perhatian:</p>
                            <ul className="space-y-1">
                                <li>• Pastikan data yang dimasukkan sudah benar</li>
                                <li>• Proses otomatis setelah pembayaran berhasil</li>
                                <li>• Hubungi CS jika ada kendala</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}