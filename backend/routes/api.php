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
    //upadate user
    Route::put("/user", [UserController::class, 'updateUser']);
    //login user
    Route::post('/login', [UserController::class, 'login']);

    //route to logout user
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth');
    //get all users for admin
    Route::get('/users', [UserController::class, 'getUsers'])->middleware('auth');
    //get  current login user
    Route::get('/user', [UserController::class, 'getUser'])->middleware('auth');
    Route::delete('/user', [UserController::class, 'deleteUser'])->middleware('auth');
    Route::get('/conversations/{conversationId}/messages', [MessageController::class, 'getAll'])->middleware('auth');

    // Store a new message
    Route::post('/conversations/{conversationId}/messages', [MessageController::class, 'store'])->middleware('auth');

    //route to create a conversation
    Route::post('/conversations', [Conversation::class, 'createConversation'])->middleware('auth');
    Route::put('/messages/{messageId}', [MessageController::class, 'update'])->middleware('auth');
    Route::delete('/messages/{messageId}', [MessageController::class, 'destroy'])->middleware('auth');
});
