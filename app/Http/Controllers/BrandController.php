<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display the specified brand with its products.
     */
    public function show(Brand $brand)
    {
        $brand->load([
            'category',
            'products' => function ($query) {
                $query->active()->ordered();
            }
        ]);

        return Inertia::render('brands/show', [
            'brand' => $brand
        ]);
    }
}