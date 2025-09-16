import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MobileLayout } from '@/components/mobile-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;

    return (
        <MobileLayout title="Dashboard">
            <div className="p-4 space-y-6">
                {/* Welcome Section */}
                <Card>
                    <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">👋</div>
                        <h1 className="text-xl font-bold mb-2">
                            Selamat Datang, {auth.user.name}!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola transaksi PPOB Anda dengan mudah
                        </p>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Menu Utama</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/">
                            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl mb-2">🏠</div>
                                    <h3 className="font-semibold text-sm">Beranda</h3>
                                    <p className="text-xs text-muted-foreground">Lihat semua kategori</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/orders">
                            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl mb-2">📋</div>
                                    <h3 className="font-semibold text-sm">Pesanan</h3>
                                    <p className="text-xs text-muted-foreground">Lihat riwayat pesanan</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/categories">
                            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl mb-2">📱</div>
                                    <h3 className="font-semibold text-sm">Kategori</h3>
                                    <p className="text-xs text-muted-foreground">Browse semua kategori</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/settings">
                            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl mb-2">⚙️</div>
                                    <h3 className="font-semibold text-sm">Pengaturan</h3>
                                    <p className="text-xs text-muted-foreground">Kelola akun Anda</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Account Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Informasi Akun</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Nama:</span>
                            <span className="font-medium">{auth.user.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{auth.user.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="text-green-600 font-medium">Aktif</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Categories */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Kategori Populer</h2>
                    <div className="grid grid-cols-3 gap-3">
                        <Link href="/categories/games" className="text-center">
                            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 mb-2">
                                <div className="text-2xl">🎮</div>
                            </div>
                            <p className="text-xs font-medium">Games</p>
                        </Link>
                        <Link href="/categories/pulsa" className="text-center">
                            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-4 mb-2">
                                <div className="text-2xl">📱</div>
                            </div>
                            <p className="text-xs font-medium">Pulsa</p>
                        </Link>
                        <Link href="/categories/pln" className="text-center">
                            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 mb-2">
                                <div className="text-2xl">⚡</div>
                            </div>
                            <p className="text-xs font-medium">PLN</p>
                        </Link>
                    </div>
                </div>

                {/* Help */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">💬</div>
                        <div>
                            <h3 className="font-semibold text-sm mb-1">Butuh Bantuan?</h3>
                            <p className="text-xs text-muted-foreground mb-3">
                                Tim customer service kami siap membantu Anda 24/7
                            </p>
                            <Button variant="outline" size="sm">
                                Hubungi CS
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}