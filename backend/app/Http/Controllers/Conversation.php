<?php

namespace App\Http\Controllers;

use App\Models\Conversation as ModelsConversation;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class Conversation extends Controller
{
    public function createConversation(Request $request)
    {
        // check if user id exist
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id', // Ensure the user exists
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed.',
                'messages' => $validator->errors(),
            ], 422);
        }

        //Ensure the conversation is between two users (the logged-in user and the recipient)

        if ($request->user_id == Auth::id()) {
            # code...
            return response()->json(['error' => 'You cannot start a conversation with yourself.'], 400);
        }
        // Check for an existing private conversation between the two users
        $existingConversation = ModelsConversation::where('is_group', false) // Ensure it's not a group conversation
            ->whereHas('users', function ($query) use ($request) {
                $query->where('users.id', Auth::id());
            })
            ->whereHas('users', function ($query) use ($request) {
                $query->where('users.id', $request->user_id);
            })
            ->first(); // Find the first matching conversation
        if ($existingConversation) {
            return response()->json([
                'message' => 'A conversation already exists between these two users.',
                'conversation_id' => $existingConversation->id,
            ]);
        }

        // Create the new conversation
        $conversation = ModelsConversation::create();

        // Attach the users to the conversation (both the logged-in user and the recipient)
        $conversation->users()->attach([Auth::id(), $request->user_id]);

        return response()->json(['message' => 'Conversation created successfully!', 'conversation_id' => $conversation->id], 200);
    }
    //delete conversation
    public function deleteConversation(Request $request, $conversationId)
    {
        // Check if the conversation exists
        $conversation = ModelsConversation::find($conversationId);

        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found.'], 404);
        }

        // Ensure the logged-in user is part of the conversation
        if (!$conversation->users()->where('users.id', Auth::id())->exists()) {
            return response()->json(['error' => 'You are not a part of this conversation.'], 403);
        }

        // Delete the conversation
        $conversation->users()->detach(); // Detach users from the conversation
        $conversation->delete(); // Delete the conversation 

        return response()->json(['message' => 'Conversation deleted successfully.'], 200);
    }
}
