<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardDataTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_dashboard_data_correctly()
    {
        // Arrange: Seed database with mock data
        $this->seed(); // Assuming you have appropriate seeders

        // Act: Call the API
        $response = $this->getJson('http://localhost:8000/api/dashboard-data');

        // Assert: Check the response structure and values
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'total_active_policies',
                     'premiums_collected',
                     'policies_expiring_soon',
                 ])
                 ->assertJson([
                     'total_active_policies' => 10, // Expected values
                     'premiums_collected' => 5000,
                     'policies_expiring_soon' => 2,
                 ]);
    }
}
