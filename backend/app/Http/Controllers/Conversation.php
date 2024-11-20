<?php

namespace App\Http\Controllers;

use App\Models\Conversation as ModelsConversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Conversation extends Controller
{
    public function createConversation(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id', // Correct table name is 'users'
        ]);

        //Ensure the conversation is between two users (the logged-in user and the recipient)


        if ($request->user_id == Auth::id()) {
            # code...
            return response()->json(['error' => 'You cannot start a conversation with yourself.'], 400);
        }
        //prevent the creation of multiple conversation between the same two users

        $existingConversation = ModelsConversation::whereHas('users', function ($query) use ($request) {
            // Check if a conversation between the logged-in user and the recipient already exists
            $query->whereIn('users.id', [Auth::id(), $request->user_id])
                ->where('conversations.is_group', 0); // Make sure it's not a group conversation
        })->exists(); // Check if such a conversation exists

        if ($existingConversation > 0) {
            return response()->json(['error' => 'A conversation already exists between these two users.'], 400);
        }

        // Create the new conversation
        $conversation = ModelsConversation::create();

        // Attach the users to the conversation (both the logged-in user and the recipient)
        $conversation->users()->attach([Auth::id(), $request->user_id]);

        return response()->json(['message' => 'Conversation created successfully!', 'conversation_id' => $conversation->id], 200);
    }
}