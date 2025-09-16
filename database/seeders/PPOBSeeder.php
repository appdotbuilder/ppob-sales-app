<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class PPOBSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $categories = [
            [
                'name' => 'Games',
                'slug' => 'games',
                'icon' => '🎮',
                'description' => 'Top up game favorit kamu dengan mudah dan cepat',
                'sort_order' => 1,
            ],
            [
                'name' => 'Pulsa',
                'slug' => 'pulsa',
                'icon' => '📱',
                'description' => 'Isi pulsa semua operator di Indonesia',
                'sort_order' => 2,
            ],
            [
                'name' => 'Data',
                'slug' => 'data',
                'icon' => '🌐',
                'description' => 'Paket data internet untuk semua operator',
                'sort_order' => 3,
            ],
            [
                'name' => 'PLN',
                'slug' => 'pln',
                'icon' => '⚡',
                'description' => 'Beli token listrik PLN secara online',
                'sort_order' => 4,
            ],
            [
                'name' => 'Voucher',
                'slug' => 'voucher',
                'icon' => '🎫',
                'description' => 'Voucher belanja online terpopuler',
                'sort_order' => 5,
            ],
            [
                'name' => 'Streaming',
                'slug' => 'streaming',
                'icon' => '📺',
                'description' => 'Berlangganan layanan streaming favorit',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);

            // Create brands for each category
            $brands = $this->getBrandsForCategory($category->slug);
            
            foreach ($brands as $brandData) {
                $brand = Brand::create([
                    'category_id' => $category->id,
                    'name' => $brandData['name'],
                    'slug' => $brandData['slug'],
                    'description' => $brandData['description'],
                    'sort_order' => $brandData['sort_order'],
                ]);

                // Create products for each brand
                $products = $this->getProductsForBrand($category->slug, $brand->slug);
                
                foreach ($products as $productData) {
                    Product::create([
                        'brand_id' => $brand->id,
                        'name' => $productData['name'],
                        'code' => $productData['code'],
                        'description' => $productData['description'],
                        'price' => $productData['price'],
                        'cost' => $productData['cost'],
                        'type' => $category->slug,
                        'specifications' => $productData['specifications'],
                        'sort_order' => $productData['sort_order'],
                    ]);
                }
            }
        }
    }

    public function getBrandsForCategory(string $categorySlug): array
    {
        return match ($categorySlug) {
            'games' => [
                ['name' => 'Mobile Legends', 'slug' => 'mobile-legends', 'description' => 'Top up diamond Mobile Legends', 'sort_order' => 1],
                ['name' => 'PUBG Mobile', 'slug' => 'pubg-mobile', 'description' => 'Top up UC PUBG Mobile', 'sort_order' => 2],
                ['name' => 'Free Fire', 'slug' => 'free-fire', 'description' => 'Top up diamond Free Fire', 'sort_order' => 3],
                ['name' => 'Valorant', 'slug' => 'valorant', 'description' => 'Top up VP Valorant', 'sort_order' => 4],
                ['name' => 'Genshin Impact', 'slug' => 'genshin-impact', 'description' => 'Top up Genesis Crystal', 'sort_order' => 5],
            ],
            'pulsa' => [
                ['name' => 'Telkomsel', 'slug' => 'telkomsel', 'description' => 'Pulsa Telkomsel', 'sort_order' => 1],
                ['name' => 'Indosat', 'slug' => 'indosat', 'description' => 'Pulsa Indosat Ooredoo', 'sort_order' => 2],
                ['name' => 'XL Axiata', 'slug' => 'xl-axiata', 'description' => 'Pulsa XL Axiata', 'sort_order' => 3],
                ['name' => 'Tri', 'slug' => 'tri', 'description' => 'Pulsa Tri Indonesia', 'sort_order' => 4],
                ['name' => 'Smartfren', 'slug' => 'smartfren', 'description' => 'Pulsa Smartfren', 'sort_order' => 5],
            ],
            'data' => [
                ['name' => 'Telkomsel', 'slug' => 'telkomsel-data', 'description' => 'Paket data Telkomsel', 'sort_order' => 1],
                ['name' => 'Indosat', 'slug' => 'indosat-data', 'description' => 'Paket data Indosat', 'sort_order' => 2],
                ['name' => 'XL Axiata', 'slug' => 'xl-data', 'description' => 'Paket data XL', 'sort_order' => 3],
                ['name' => 'Tri', 'slug' => 'tri-data', 'description' => 'Paket data Tri', 'sort_order' => 4],
            ],
            'pln' => [
                ['name' => 'PLN Prabayar', 'slug' => 'pln-prabayar', 'description' => 'Token listrik PLN', 'sort_order' => 1],
            ],
            'voucher' => [
                ['name' => 'Tokopedia', 'slug' => 'tokopedia', 'description' => 'Voucher Tokopedia', 'sort_order' => 1],
                ['name' => 'Shopee', 'slug' => 'shopee', 'description' => 'Voucher Shopee', 'sort_order' => 2],
                ['name' => 'Blibli', 'slug' => 'blibli', 'description' => 'Voucher Blibli', 'sort_order' => 3],
                ['name' => 'Lazada', 'slug' => 'lazada', 'description' => 'Voucher Lazada', 'sort_order' => 4],
            ],
            'streaming' => [
                ['name' => 'Netflix', 'slug' => 'netflix', 'description' => 'Berlangganan Netflix', 'sort_order' => 1],
                ['name' => 'Disney+', 'slug' => 'disney-plus', 'description' => 'Berlangganan Disney+', 'sort_order' => 2],
                ['name' => 'YouTube Premium', 'slug' => 'youtube-premium', 'description' => 'Berlangganan YouTube Premium', 'sort_order' => 3],
                ['name' => 'Spotify', 'slug' => 'spotify', 'description' => 'Berlangganan Spotify Premium', 'sort_order' => 4],
            ],
            default => []
        };
    }

    public function getProductsForBrand(string $categorySlug, string $brandSlug): array
    {
        return match ($categorySlug) {
            'games' => [
                ['name' => '10 Diamond', 'code' => strtoupper($brandSlug) . '10', 'price' => 3000, 'cost' => 2500, 'description' => '10 Diamond/UC/VP', 'specifications' => ['amount' => '10'], 'sort_order' => 1],
                ['name' => '50 Diamond', 'code' => strtoupper($brandSlug) . '50', 'price' => 15000, 'cost' => 12500, 'description' => '50 Diamond/UC/VP', 'specifications' => ['amount' => '50'], 'sort_order' => 2],
                ['name' => '100 Diamond', 'code' => strtoupper($brandSlug) . '100', 'price' => 28000, 'cost' => 23500, 'description' => '100 Diamond/UC/VP', 'specifications' => ['amount' => '100'], 'sort_order' => 3],
                ['name' => '500 Diamond', 'code' => strtoupper($brandSlug) . '500', 'price' => 135000, 'cost' => 113000, 'description' => '500 Diamond/UC/VP', 'specifications' => ['amount' => '500'], 'sort_order' => 4],
                ['name' => '1000 Diamond', 'code' => strtoupper($brandSlug) . '1000', 'price' => 270000, 'cost' => 226000, 'description' => '1000 Diamond/UC/VP', 'specifications' => ['amount' => '1000'], 'sort_order' => 5],
            ],
            'pulsa' => [
                ['name' => 'Pulsa 5.000', 'code' => strtoupper($brandSlug) . '5K', 'price' => 6000, 'cost' => 5200, 'description' => 'Pulsa reguler 5 ribu', 'specifications' => ['amount' => '5000'], 'sort_order' => 1],
                ['name' => 'Pulsa 10.000', 'code' => strtoupper($brandSlug) . '10K', 'price' => 11000, 'cost' => 10200, 'description' => 'Pulsa reguler 10 ribu', 'specifications' => ['amount' => '10000'], 'sort_order' => 2],
                ['name' => 'Pulsa 25.000', 'code' => strtoupper($brandSlug) . '25K', 'price' => 25500, 'cost' => 24700, 'description' => 'Pulsa reguler 25 ribu', 'specifications' => ['amount' => '25000'], 'sort_order' => 3],
                ['name' => 'Pulsa 50.000', 'code' => strtoupper($brandSlug) . '50K', 'price' => 50500, 'cost' => 49700, 'description' => 'Pulsa reguler 50 ribu', 'specifications' => ['amount' => '50000'], 'sort_order' => 4],
                ['name' => 'Pulsa 100.000', 'code' => strtoupper($brandSlug) . '100K', 'price' => 100500, 'cost' => 99700, 'description' => 'Pulsa reguler 100 ribu', 'specifications' => ['amount' => '100000'], 'sort_order' => 5],
            ],
            'data' => [
                ['name' => 'Data 1GB', 'code' => strtoupper($brandSlug) . 'D1G', 'price' => 12000, 'cost' => 10500, 'description' => 'Paket data 1GB berlaku 30 hari', 'specifications' => ['quota' => '1GB', 'validity' => '30 hari'], 'sort_order' => 1],
                ['name' => 'Data 3GB', 'code' => strtoupper($brandSlug) . 'D3G', 'price' => 25000, 'cost' => 22000, 'description' => 'Paket data 3GB berlaku 30 hari', 'specifications' => ['quota' => '3GB', 'validity' => '30 hari'], 'sort_order' => 2],
                ['name' => 'Data 5GB', 'code' => strtoupper($brandSlug) . 'D5G', 'price' => 40000, 'cost' => 35500, 'description' => 'Paket data 5GB berlaku 30 hari', 'specifications' => ['quota' => '5GB', 'validity' => '30 hari'], 'sort_order' => 3],
                ['name' => 'Data 10GB', 'code' => strtoupper($brandSlug) . 'D10G', 'price' => 75000, 'cost' => 67000, 'description' => 'Paket data 10GB berlaku 30 hari', 'specifications' => ['quota' => '10GB', 'validity' => '30 hari'], 'sort_order' => 4],
            ],
            'pln' => [
                ['name' => 'Token 20.000', 'code' => 'PLN20K', 'price' => 21000, 'cost' => 20200, 'description' => 'Token listrik senilai 20 ribu', 'specifications' => ['amount' => '20000'], 'sort_order' => 1],
                ['name' => 'Token 50.000', 'code' => 'PLN50K', 'price' => 51000, 'cost' => 50200, 'description' => 'Token listrik senilai 50 ribu', 'specifications' => ['amount' => '50000'], 'sort_order' => 2],
                ['name' => 'Token 100.000', 'code' => 'PLN100K', 'price' => 101000, 'cost' => 100200, 'description' => 'Token listrik senilai 100 ribu', 'specifications' => ['amount' => '100000'], 'sort_order' => 3],
                ['name' => 'Token 200.000', 'code' => 'PLN200K', 'price' => 201000, 'cost' => 200200, 'description' => 'Token listrik senilai 200 ribu', 'specifications' => ['amount' => '200000'], 'sort_order' => 4],
            ],
            'voucher' => [
                ['name' => 'Voucher 25.000', 'code' => strtoupper($brandSlug) . 'V25K', 'price' => 27000, 'cost' => 25200, 'description' => 'Voucher belanja senilai 25 ribu', 'specifications' => ['amount' => '25000'], 'sort_order' => 1],
                ['name' => 'Voucher 50.000', 'code' => strtoupper($brandSlug) . 'V50K', 'price' => 52000, 'cost' => 50200, 'description' => 'Voucher belanja senilai 50 ribu', 'specifications' => ['amount' => '50000'], 'sort_order' => 2],
                ['name' => 'Voucher 100.000', 'code' => strtoupper($brandSlug) . 'V100K', 'price' => 102000, 'cost' => 100200, 'description' => 'Voucher belanja senilai 100 ribu', 'specifications' => ['amount' => '100000'], 'sort_order' => 3],
            ],
            'streaming' => [
                ['name' => '1 Bulan', 'code' => strtoupper($brandSlug) . '1M', 'price' => 55000, 'cost' => 50000, 'description' => 'Berlangganan 1 bulan', 'specifications' => ['duration' => '1 bulan'], 'sort_order' => 1],
                ['name' => '3 Bulan', 'code' => strtoupper($brandSlug) . '3M', 'price' => 150000, 'cost' => 135000, 'description' => 'Berlangganan 3 bulan', 'specifications' => ['duration' => '3 bulan'], 'sort_order' => 2],
                ['name' => '6 Bulan', 'code' => strtoupper($brandSlug) . '6M', 'price' => 280000, 'cost' => 250000, 'description' => 'Berlangganan 6 bulan', 'specifications' => ['duration' => '6 bulan'], 'sort_order' => 3],
                ['name' => '12 Bulan', 'code' => strtoupper($brandSlug) . '12M', 'price' => 500000, 'cost' => 450000, 'description' => 'Berlangganan 12 bulan', 'specifications' => ['duration' => '12 bulan'], 'sort_order' => 4],
            ],
            default => []
        };
    }
}