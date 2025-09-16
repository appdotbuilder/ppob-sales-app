import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface MobileLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBack?: boolean;
    backUrl?: string;
}

export function MobileLayout({ children, title, showBack = false, backUrl }: MobileLayoutProps) {
    const { auth } = usePage<{ auth?: { user?: { name: string; email: string } } }>().props;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
                <div className="flex items-center justify-between h-14 px-4">
                    <div className="flex items-center space-x-3">
                        {showBack && (
                            <Link href={backUrl || '/'} className="p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                        )}
                        {title ? (
                            <h1 className="text-lg font-bold truncate">{title}</h1>
                        ) : (
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">P</span>
                                </div>
                                <span className="font-bold text-lg">PPOB</span>
                            </Link>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {auth?.user ? (
                            <div className="flex items-center space-x-2">
                                <Link href="/orders">
                                    <Button variant="ghost" size="sm">
                                        Orders
                                    </Button>
                                </Link>
                                <Link href="/dashboard">
                                    <Button variant="outline" size="sm">
                                        {auth.user.name.split(' ')[0]}
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">
                                        Daftar
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pb-20">
                {children}
            </main>

            {/* Bottom Navigation (for authenticated users) */}
            {auth?.user && (
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
                    <div className="flex">
                        <Link 
                            href="/" 
                            className="flex-1 flex flex-col items-center py-3 text-xs hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m8 7 4-4 4 4" />
                            </svg>
                            <span>Home</span>
                        </Link>
                        <Link 
                            href="/categories" 
                            className="flex-1 flex flex-col items-center py-3 text-xs hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H5m14 8H5" />
                            </svg>
                            <span>Kategori</span>
                        </Link>
                        <Link 
                            href="/orders" 
                            className="flex-1 flex flex-col items-center py-3 text-xs hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Pesanan</span>
                        </Link>
                        <Link 
                            href="/dashboard" 
                            className="flex-1 flex flex-col items-center py-3 text-xs hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile</span>
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    );
}