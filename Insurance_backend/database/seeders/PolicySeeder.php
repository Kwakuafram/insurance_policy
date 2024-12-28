<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Policy;


class PolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Policy::create([
            'policy_number' => 'POL123456789',
            'customer_name' => 'John Doe',
            'policy_type' => 'Health',
            'status' => 'Active',
            'premium_amount' => 150.75,
            'start_date' => Carbon::now()->subMonths(6),
            'end_date' => Carbon::now()->addMonths(6),
        ]);

        Policy::create([
            'policy_number' => 'POL987654321',
            'customer_name' => 'Jane Smith',
            'policy_type' => 'Life',
            'status' => 'Pending',
            'premium_amount' => 200.50,
            'start_date' => Carbon::now()->addMonths(1),
            'end_date' => Carbon::now()->addMonths(13),
        ]);

        Policy::create([
            'policy_number' => 'POL112233445',
            'customer_name' => 'Samuel Johnson',
            'policy_type' => 'Auto',
            'status' => 'Expired',
            'premium_amount' => 250.00,
            'start_date' => Carbon::now()->subYears(1),
            'end_date' => Carbon::now()->subMonths(6),
        ]);

        Policy::create([
            'policy_number' => 'POL556677889',
            'customer_name' => 'Emily Davis',
            'policy_type' => 'Property',
            'status' => 'Active',
            'premium_amount' => 500.25,
            'start_date' => Carbon::now()->subMonths(3),
            'end_date' => Carbon::now()->addMonths(9),
        ]);

        Policy::create([
            'policy_number' => 'POL998877665',
            'customer_name' => 'Michael Brown',
            'policy_type' => 'Travel',
            'status' => 'Pending',
            'premium_amount' => 120.00,
            'start_date' => Carbon::now()->addDays(30),
            'end_date' => Carbon::now()->addMonths(6),
        ]);
    
    }
}
