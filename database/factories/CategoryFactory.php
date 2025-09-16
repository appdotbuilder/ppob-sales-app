<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Games', 'icon' => '🎮', 'description' => 'Top up game favorit kamu'],
            ['name' => 'Pulsa', 'icon' => '📱', 'description' => 'Pulsa semua operator'],
            ['name' => 'Data', 'icon' => '🌐', 'description' => 'Paket data internet'],
            ['name' => 'PLN', 'icon' => '⚡', 'description' => 'Token listrik PLN'],
            ['name' => 'Voucher', 'icon' => '🎫', 'description' => 'Voucher belanja online'],
            ['name' => 'Streaming', 'icon' => '📺', 'description' => 'Langganan streaming video'],
        ];
        
        $category = fake()->randomElement($categories);
        $name = $category['name'];
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => $category['icon'],
            'description' => $category['description'],
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}