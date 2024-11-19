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
        // Create the new conversation
        $conversation = ModelsConversation::create();

        // Attach the users to the conversation (both the logged-in user and the recipient)
        $conversation->users()->attach([Auth::id(), $request->user_id]);

        return response()->json(['message' => 'Conversation created successfully!', 'conversation_id' => $conversation->id], 200);
    }
}
