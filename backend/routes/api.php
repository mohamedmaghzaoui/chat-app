<?php

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
});
