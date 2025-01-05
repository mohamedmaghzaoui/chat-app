<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    protected $model = Conversation::class;

    public function definition()
    {
        return [
            // Generate a random conversation (could be private or group)
            'is_group' => $this->faker->boolean(50), // 50% chance of being a group
        ];
    }

    // A custom state to generate conversations with specific users
    public function withUsers(User $user1, User $user2)
    {
        return $this->afterCreating(function (Conversation $conversation) use ($user1, $user2) {
            $conversation->users()->attach([$user1->id, $user2->id]);
        });
    }
}
