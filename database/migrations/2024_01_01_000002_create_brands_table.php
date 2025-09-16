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
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Brand name like Telkomsel, XL, etc.');
            $table->string('slug')->unique()->comment('URL-friendly brand identifier');
            $table->string('logo')->nullable()->comment('Brand logo URL');
            $table->text('description')->nullable()->comment('Brand description');
            $table->boolean('is_active')->default(true)->comment('Brand status');
            $table->integer('sort_order')->default(0)->comment('Display order within category');
            $table->timestamps();
            
            $table->index(['category_id', 'is_active', 'sort_order']);
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};