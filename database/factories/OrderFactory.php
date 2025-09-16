<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = fake()->randomFloat(2, 5000, 500000);
        $adminFee = 1500; // Fixed admin fee
        $totalAmount = $amount + $adminFee;
        
        return [
            'order_number' => 'ORD' . fake()->unique()->numerify('########'),
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
            'customer_phone' => fake()->phoneNumber(),
            'customer_email' => fake()->optional()->safeEmail(),
            'customer_name' => fake()->name(),
            'amount' => $amount,
            'admin_fee' => $adminFee,
            'total_amount' => $totalAmount,
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'failed']),
            'notes' => fake()->optional()->sentence(),
            'metadata' => [
                'payment_method' => fake()->randomElement(['bank_transfer', 'e_wallet', 'credit_card']),
                'customer_id' => fake()->optional()->numerify('####'),
            ],
            'processed_at' => fake()->optional()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'processed_at' => null,
        ]);
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'processed_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }
}