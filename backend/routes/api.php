<?php

use App\Http\Controllers\Conversation;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['web'])->group(function () {
    //test to get data
    Route::get('/data', function () {
        return response()->json(['message' => 'hi how are you man']);
    });
    //register a user
    Route::post('/register', [UserController::class, 'register']);
    //login user
    Route::post('/login', [UserController::class, 'login']);

    //route to logout user
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth');
    //get all users for admin
    Route::get('/users', [UserController::class, 'getUsers'])->middleware('auth');
    //get  current login user
    Route::get('/user', [UserController::class, 'getUser'])->middleware('auth');
    Route::delete('/user', [UserController::class, 'deleteUser'])->middleware('auth');
    Route::get('/conversations/{conversationId}/messages', [MessageController::class, 'getAll']);

    // Store a new message
    Route::post('/conversations/{conversationId}/messages', [MessageController::class, 'store']);

    //route to create a conversation
    Route::post('/conversations', [Conversation::class, 'createConversation'])->middleware('auth');
});
