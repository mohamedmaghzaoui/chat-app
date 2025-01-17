<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function testDatabaseConnection()
    {
        $database = DB::connection()->getDatabaseName();
        $this->assertEquals('/var/www/database/database_test.sqlite', $database);
    }
}
