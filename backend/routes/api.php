<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware(['web'])->group(function () {
    Route::get('/data', function () {
        return response()->json(['message' => 'hi how are you man']);
    });

    Route::post('/register', [UserController::class, 'register']);

    Route::post('/login', [UserController::class, 'login']);

    //route to logout user
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth');
    Route::get('/users', [UserController::class, 'getUsers'])->middleware('auth');
});
