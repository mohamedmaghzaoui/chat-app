<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthTest extends TestCase
{



    /**
     * Test user registration with valid data.
     */

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password',
            'profession' => 'Developer',
            'school' => 'University XYZ',
            'role_id' => 1, // Assign 'client' role
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['user' => ['id', 'first_name', 'last_name', 'email']]);
        $this->assertDatabaseHas('users', ['email' => 'johndoe@example.com']);
    }

    /**
     * Test login with correct credentials.
     */
    // public function test_user_can_login_with_correct_credentials()
    // {
    //     // Create a user manually with 'client' role
    //     $user = User::factory()->create([
    //         'email' => 'johndoe@example.com',
    //         'password' => Hash::make('password'),
    //         'role_id' => 1, // Assign 'client' role
    //     ]);

    //     $response = $this->postJson('/api/login', [
    //         'email' => 'johndoe@example.com',
    //         'password' => 'password',
    //     ]);

    //     $response->assertStatus(200);
    //     $response->assertJsonStructure(['message', 'user' => ['id', 'email']]);
    //     $this->assertAuthenticatedAs($user);
    // }

    // /**
    //  * Test login with incorrect credentials.
    //  */
    // public function test_login_fails_with_invalid_credentials()
    // {
    //     // Create a user manually with 'client' role
    //     User::factory()->create([
    //         'email' => 'johndoe@example.com',
    //         'password' => Hash::make('password'),
    //         'role_id' => 1, // Assign 'client' role
    //     ]);

    //     $response = $this->postJson('/login', [
    //         'email' => 'johndoe@example.com',
    //         'password' => 'wrongpassword',
    //     ]);

    //     $response->assertStatus(401);
    //     $response->assertJson(['message' => 'wrong credentials']);
    //     $this->assertGuest();
    // }
}
