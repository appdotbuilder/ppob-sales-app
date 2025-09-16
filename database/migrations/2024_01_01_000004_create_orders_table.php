<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order identifier');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->string('customer_phone')->comment('Customer phone number for delivery');
            $table->string('customer_email')->nullable()->comment('Customer email for notifications');
            $table->string('customer_name')->comment('Customer name');
            $table->decimal('amount', 12, 2)->comment('Order amount');
            $table->decimal('admin_fee', 12, 2)->default(0)->comment('Admin fee');
            $table->decimal('total_amount', 12, 2)->comment('Total amount including fees');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable()->comment('Order notes');
            $table->json('metadata')->nullable()->comment('Additional order data as JSON');
            $table->timestamp('processed_at')->nullable()->comment('When order was processed');
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('order_number');
            $table->index(['customer_phone', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};