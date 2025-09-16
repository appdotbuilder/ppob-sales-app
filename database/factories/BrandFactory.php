<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = [
            'Mobile Legends', 'PUBG Mobile', 'Free Fire', 'Valorant', 'Genshin Impact',
            'Telkomsel', 'Indosat', 'XL Axiata', 'Tri', 'Smartfren',
            'Netflix', 'Disney+', 'Prime Video', 'YouTube Premium', 'Spotify',
            'Tokopedia', 'Shopee', 'Blibli', 'Lazada', 'Bukalapak'
        ];
        
        $name = fake()->randomElement($brands);
        
        return [
            'category_id' => Category::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'logo' => null,
            'description' => fake()->sentence(),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }

    /**
     * Indicate that the brand is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}