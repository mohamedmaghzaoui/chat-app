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
                'role_id' => 1,

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
    // Update user information
    public function updateUser(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'profession' => 'nullable|string',
            'school' => 'nullable|string',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Update user details
        if ($validated['first_name']) {
            $user->first_name = $validated['first_name'];
        }
        if ($validated['last_name']) {
            $user->last_name = $validated['last_name'];
        }


        if ($validated['profession']) {
            $user->profession = $validated['profession'];
        }
        if ($validated['school']) {
            $user->school = $validated['school'];
        }

        // Save the updated user
        $user->save();

        // Return response with updated user data
        return response()->json(['user' => $user], 200);
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
    public function getUser()
    {
        $user = Auth::user()->load('role');

        return response()->json(['user' => $user]);
    }

    public function deleteUser()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Delete the user from the database
        $user->delete();

        return response()->json([
            'message' => 'User successfully deleted',
        ], 200);
    }
}