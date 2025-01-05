<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ChatTest extends TestCase
{
    private $user1;
    private $user2;
    private $conversation;

    public function setUp(): void
    {
        parent::setUp();

        // Create two users before each test
        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();

        // Create a conversation between the two users
        $this->conversation = Conversation::create();
        $this->conversation->users()->attach([$this->user1->id, $this->user2->id]);
    }

    /** @test */
    public function test_it_creates_a_message_in_a_conversation()
    {
        // Log in as user1
        Auth::login($this->user1);

        // Send a message in the conversation
        $response = $this->postJson('/api/conversations/' . $this->conversation->id . '/messages', [
            'content' => 'Hello, user2!',
        ]);

        // Assert that the message was created successfully
        $response->assertStatus(201)
            ->assertJson([
                'content' => 'Hello, user2!',
            ]);

        // Assert that the message exists in the database
        $this->assertDatabaseHas('messages', [
            'content' => 'Hello, user2!',
            'conversation_id' => $this->conversation->id,
            'user_id' => $this->user1->id,
        ]);
    }

    /** @test */
    public function test_it_updates_a_message()
    {
        // Log in as user1
        Auth::login($this->user1);

        // Send a message in the conversation first
        $messageResponse = $this->postJson('/api/conversations/' . $this->conversation->id . '/messages', [
            'content' => 'Initial message',
        ]);

        $messageId = $messageResponse->json('id'); // Get the message ID from the response

        // Now, update the message
        $updateResponse = $this->putJson('/api/messages/' . $messageId, [
            'content' => 'Updated message content',
        ]);

        // Assert the message was updated successfully
        $updateResponse->assertStatus(200)
            ->assertJson([
                'message' => 'Message updated successfully',
                'data' => [
                    'content' => 'Updated message content',
                ],
            ]);

        // Assert that the message was updated in the database
        $this->assertDatabaseHas('messages', [
            'id' => $messageId,
            'content' => 'Updated message content',
        ]);
    }

    /** @test */
    public function test_it_deletes_a_message()
    {
        // Log in as user1
        Auth::login($this->user1);

        // Send a message in the conversation first
        $messageResponse = $this->postJson('/api/conversations/' . $this->conversation->id . '/messages', [
            'content' => 'Message to be deleted',
        ]);

        $messageId = $messageResponse->json('id'); // Get the message ID from the response

        // Now, delete the message
        $deleteResponse = $this->deleteJson('/api/messages/' . $messageId);

        // Assert the message was deleted successfully
        $deleteResponse->assertStatus(200)
            ->assertJson([
                'message' => 'Message deleted successfully',
            ]);

        // Assert that the message no longer exists in the database
        $this->assertDatabaseMissing('messages', [
            'id' => $messageId,
        ]);
    }
    /** @test */
    public function test_it_deletes_all_users_and_conversations()
    {
        // Assert that users exist in the database
        $this->assertDatabaseHas('users', [
            'id' => $this->user1->id,
        ]);
        $this->assertDatabaseHas('users', [
            'id' => $this->user2->id,
        ]);

        // Assert that the conversation exists in the database
        $this->assertDatabaseHas('conversations', [
            'id' => $this->conversation->id,
        ]);

        // Delete all users
        User::truncate();

        // Delete all conversations
        Conversation::truncate();

        // Assert that no users exist in the database
        $this->assertDatabaseMissing('users', [
            'id' => $this->user1->id,
        ]);
        $this->assertDatabaseMissing('users', [
            'id' => $this->user2->id,
        ]);

        // Assert that no conversations exist in the database
        $this->assertDatabaseMissing('conversations', [
            'id' => $this->conversation->id,
        ]);
    }
}
