<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        $categories = Category::active()
            ->ordered()
            ->get();

        return Inertia::render('categories/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Display the specified category with its brands.
     */
    public function show(Category $category)
    {
        $category->load(['brands' => function ($query) {
            $query->active()->ordered();
        }]);

        return Inertia::render('categories/show', [
            'category' => $category
        ]);
    }
}