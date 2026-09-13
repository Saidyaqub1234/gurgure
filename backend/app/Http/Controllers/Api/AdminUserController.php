<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::orderBy('created_at', 'desc')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|min:8',
            'is_admin' => 'boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json([
            'data' => $user,
            'message' => 'User created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(User $user)
    {
        return response()->json(['data' => $user, 'success' => true]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8',
            'is_admin' => 'boolean',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'data' => $user,
            'message' => 'User updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id === request()->user()->id) {
            return response()->json([
                'message' => 'You cannot delete yourself.',
                'success' => false,
            ], 422);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
            'success' => true,
        ]);
    }
}
