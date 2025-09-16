<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['pulsa', 'data', 'game', 'pln', 'voucher', 'streaming'];
        $type = fake()->randomElement($types);
        
        $products = [
            'pulsa' => ['Pulsa 5k', 'Pulsa 10k', 'Pulsa 25k', 'Pulsa 50k', 'Pulsa 100k'],
            'data' => ['Data 1GB', 'Data 3GB', 'Data 5GB', 'Data 10GB', 'Data Unlimited'],
            'game' => ['10 Diamond', '50 Diamond', '100 Diamond', '500 Diamond', '1000 Diamond'],
            'pln' => ['Token 20k', 'Token 50k', 'Token 100k', 'Token 200k', 'Token 500k'],
            'voucher' => ['Voucher 25k', 'Voucher 50k', 'Voucher 100k', 'Voucher 250k'],
            'streaming' => ['1 Bulan', '3 Bulan', '6 Bulan', '12 Bulan'],
        ];
        
        $price = fake()->randomFloat(2, 5000, 500000);
        $cost = $price * 0.85; // 15% margin
        
        return [
            'brand_id' => Brand::factory(),
            'name' => fake()->randomElement($products[$type]),
            'code' => strtoupper(fake()->bothify('??###')),
            'description' => fake()->sentence(),
            'price' => $price,
            'cost' => $cost,
            'type' => $type,
            'specifications' => [
                'validity' => fake()->randomElement(['30 hari', '7 hari', 'Selamanya']),
                'description' => fake()->sentence(),
            ],
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 50),
        ];
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a game product.
     */
    public function game(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'game',
            'name' => fake()->randomElement(['10 Diamond', '50 Diamond', '100 Diamond', '500 Diamond']),
        ]);
    }

    /**
     * Create a pulsa product.
     */
    public function pulsa(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'pulsa',
            'name' => fake()->randomElement(['Pulsa 5k', 'Pulsa 10k', 'Pulsa 25k', 'Pulsa 50k']),
        ]);
    }
}