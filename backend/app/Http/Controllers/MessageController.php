<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the messages in a conversation.
     */
    public function getAll($conversationId)
    {
        // Fetch the conversation
        $conversation = Conversation::findOrFail($conversationId);

        // Check if the authenticated user is part of the conversation
        if (!$conversation->users->contains(Auth::id())) {
            return response()->json(['message' => 'You are not a part of this conversation'], 403);
        }

        // Get all messages for the conversation
        $messages = $conversation->messages()->latest()->get();

        return response()->json($messages);
    }

    /**
     * Store a newly created message.
     */
    public function store(Request $request, $conversationId)
    {
        // Validate the incoming request
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        // Fetch the conversation
        $conversation = Conversation::findOrFail($conversationId);

        // Check if the authenticated user is part of the conversation
        if (!$conversation->users->contains(Auth::id())) {
            return response()->json(['message' => 'You are not a part of this conversation'], 403);
        }

        // Create a new message
        $message = new Message();
        $message->user_id = Auth::id();  // The message is being sent by the authenticated user
        $message->conversation_id = $conversationId;
        $message->content = $request->input('content');
        $message->is_seen = false;
        $message->save();

        // Optionally, you can send the message back with the response
        return response()->json($message, 201);
    }
}