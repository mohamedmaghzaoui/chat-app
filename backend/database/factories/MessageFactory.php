<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'content' => $this->faker->sentence(),
            'is_seen' => $this->faker->boolean(),
            'user_id' => User::factory(), // Create a random user for each message
            'conversation_id' => Conversation::factory(), // Create a random conversation for each message
        ];
    }
}
