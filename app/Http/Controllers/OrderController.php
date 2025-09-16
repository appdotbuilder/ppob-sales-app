<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index()
    {
        $orders = auth()->user()->orders()
            ->with(['product.brand.category'])
            ->latest()
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(Product $product)
    {
        $product->load(['brand.category']);

        return Inertia::render('orders/create', [
            'product' => $product
        ]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $product = Product::findOrFail($request->product_id);
        
        $adminFee = 1500; // Fixed admin fee
        $totalAmount = $product->price + $adminFee;
        
        $order = Order::create([
            'order_number' => 'ORD' . strtoupper(Str::random(8)),
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'customer_phone' => $request->customer_phone,
            'customer_email' => $request->customer_email,
            'customer_name' => $request->customer_name,
            'amount' => $product->price,
            'admin_fee' => $adminFee,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'notes' => $request->notes,
            'metadata' => [
                'customer_id' => $request->customer_id ?? null,
            ],
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order berhasil dibuat! Silakan lakukan pembayaran.');
    }

    /**
     * Display the specified order (checkout page).
     */
    public function show(Order $order)
    {
        // Ensure user can only see their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['product.brand.category']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }
}