import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MobileLayout } from '@/components/mobile-layout';
import { CategoryCard } from '@/components/category-card';
import { Button } from '@/components/ui/button';

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

export default function Welcome({ categories }: Props) {
    const { auth } = usePage<{ auth?: { user?: { name: string } } }>().props;

    return (
        <MobileLayout>
            <div className="space-y-6">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative px-4 py-8">
                        <div className="text-center space-y-4">
                            <div className="text-5xl">📱</div>
                            <h1 className="text-2xl font-bold">
                                PPOB Terpercaya
                            </h1>
                            <p className="text-sm opacity-90 max-w-sm mx-auto leading-relaxed">
                                Top up game, pulsa, data, PLN, voucher, dan streaming dengan mudah, cepat, dan aman
                            </p>
                            
                            {!auth?.user && (
                                <div className="flex gap-3 justify-center pt-4">
                                    <Link href="/register">
                                        <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                            Daftar Sekarang
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                            Masuk
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="px-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                        <div className="text-center space-y-3">
                            <div className="text-2xl">⚡</div>
                            <h2 className="text-lg font-bold">Kenapa Pilih Kami?</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Proses Cepat</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Harga Terjangkau</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>24/7 Online</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>100% Aman</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Pilih Kategori</h2>
                        <Link href="/categories" className="text-sm text-primary hover:underline">
                            Lihat Semua
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="px-4">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-center mb-4">Cara Pembelian</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                                <div>
                                    <p className="text-sm font-medium">Pilih Kategori & Brand</p>
                                    <p className="text-xs text-gray-600">Pilih kategori produk dan brand yang diinginkan</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                                <div>
                                    <p className="text-sm font-medium">Pilih Produk & Isi Data</p>
                                    <p className="text-xs text-gray-600">Pilih produk dan isi data customer dengan lengkap</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                                <div>
                                    <p className="text-sm font-medium">Review & Bayar</p>
                                    <p className="text-xs text-gray-600">Review pesanan dan lakukan pembayaran</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                                <div>
                                    <p className="text-sm font-medium">Selesai!</p>
                                    <p className="text-xs text-gray-600">Produk akan diproses secara otomatis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {!auth?.user && (
                    <div className="px-4">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6 text-center">
                            <div className="text-3xl mb-3">🚀</div>
                            <h2 className="text-lg font-bold mb-2">Mulai Sekarang!</h2>
                            <p className="text-sm opacity-90 mb-4">
                                Daftar gratis dan nikmati kemudahan top up
                            </p>
                            <Link href="/register">
                                <Button className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto">
                                    Daftar Gratis Sekarang
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}