<?php

namespace Tests\Feature;

use App\Models\Role;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class userTest extends TestCase
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


    //test user can login
    public function test_user_can_login()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'johndoe@example.com',
            'password' => 'password',
        ]);
        $response->assertStatus(200); // Assert login success
    }
    public function test_user_can_delete()
    {
        $response1 = $this->postJson('/api/login', [
            'email' => 'johndoe@example.com',
            'password' => 'password',
        ]);
        $response2 = $this->delete('/api/user', []);
        $response1->assertStatus(200); // Assert login success
        $response2->assertStatus(200); // Assert login success
    }
}
