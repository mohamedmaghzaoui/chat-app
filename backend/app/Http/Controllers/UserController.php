<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'profession' => 'nullable|string',
                'school' => 'nullable|string',
            ]);

            // Create a new user
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']), // Hash the password before saving
                'profession' => $validated['profession'],
                'school' => $validated['school'],
            ]);

            // Return response with user data
            return response()->json(['user' => $user], 201);
        } catch (ValidationException $e) {
            // Return validation errors as JSON response
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->validator->errors()
            ], 422); // HTTP status code for Unprocessable Entity
        }
    }
    //get all users for admin
    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }
    //login a user
    public function Login(Request $request)
    {
        $credentials = $request->only("email", "password");
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => "user authenticated avec success", 'user' => Auth::user()]);
        }
        return response()->json(['message' => "wrong credentials"], 401);
    }
    //logout user
    public function Logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'logout avec success']);
    }
}
