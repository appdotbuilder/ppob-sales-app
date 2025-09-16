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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Product name like Pulsa 10k, Data 1GB, etc.');
            $table->string('code')->unique()->comment('Product code for API integration');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 12, 2)->comment('Product price');
            $table->decimal('cost', 12, 2)->comment('Product cost from provider');
            $table->string('type')->comment('Product type: pulsa, data, pln, voucher, etc.');
            $table->json('specifications')->nullable()->comment('Product specifications as JSON');
            $table->boolean('is_active')->default(true)->comment('Product status');
            $table->integer('sort_order')->default(0)->comment('Display order within brand');
            $table->timestamps();
            
            $table->index(['brand_id', 'is_active', 'sort_order']);
            $table->index(['type', 'is_active']);
            $table->index('code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};