<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/data', function () {
    return response()->json(['message' => 'hi how are you']);
});
Route::post('/register', [UserController::class, 'register']);
Route::get('/users', [UserController::class, 'getUsers']);
