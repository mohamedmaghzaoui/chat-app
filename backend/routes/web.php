<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


Route::post('/test', function () {
    return response()->json(['message' => 'test']);
});
Route::get("/", function () {
    return view('welcome');
});
