<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    $categories = Category::active()->ordered()->get();
    
    return Inertia::render('welcome', [
        'categories' => $categories,
    ]);
})->name('home');

// Category routes
Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories', 'index')->name('categories.index');
    Route::get('/categories/{category:slug}', 'show')->name('categories.show');
});

// Brand routes
Route::controller(BrandController::class)->group(function () {
    Route::get('/brands/{brand:slug}', 'show')->name('brands.show');
});

// Order routes (require authentication)
Route::middleware('auth')->controller(OrderController::class)->group(function () {
    Route::get('/orders', 'index')->name('orders.index');
    Route::get('/orders/create/{product}', 'create')->name('orders.create');
    Route::post('/orders', 'store')->name('orders.store');
    Route::get('/orders/{order}', 'show')->name('orders.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
