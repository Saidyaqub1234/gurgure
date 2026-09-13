<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $customer = Customer::create($validated);

        $token = $customer->createToken('customer-token', ['customer'])->plainTextToken;

        return response()->json([
            'data' => [
                'customer' => $customer->makeVisible(['email']),
                'token' => $token,
            ],
            'message' => 'Registration successful.',
            'success' => true,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $customer->createToken('customer-token', ['customer'])->plainTextToken;

        return response()->json([
            'data' => [
                'customer' => $customer->makeVisible(['email']),
                'token' => $token,
            ],
            'message' => 'Login successful.',
            'success' => true,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
            'success' => true,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'data' => $request->user()->makeVisible(['email']),
            'success' => true,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            return response()->json([
                'message' => 'If the email exists, a reset link has been generated.',
                'success' => true,
            ]);
        }

        // Generate a 6-digit code and store it
        $code = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
        $customer->update([
            'password_reset_token' => $code,
            'password_reset_expires_at' => Carbon::now()->addMinutes(30),
        ]);

        // Since mail is not configured (MAIL_MAILER=log), return the code in response
        return response()->json([
            'message' => 'If the email exists, a reset code has been generated.',
            'code' => $code, // Remove this line when email is configured
            'success' => true,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'token' => 'required|string|size:6',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $customer = Customer::where('email', $validated['email'])->first();

        if (
            !$customer ||
            $customer->password_reset_token !== $validated['token'] ||
            !$customer->password_reset_expires_at ||
            Carbon::parse($customer->password_reset_expires_at)->isPast()
        ) {
            return response()->json([
                'message' => 'Invalid or expired reset code.',
                'success' => false,
            ], 422);
        }

        $customer->update([
            'password' => Hash::make($validated['password']),
            'password_reset_token' => null,
            'password_reset_expires_at' => null,
        ]);

        // Revoke all existing tokens for this customer
        $customer->tokens()->delete();

        return response()->json([
            'message' => 'Password reset successfully. Please log in with your new password.',
            'success' => true,
        ]);
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $customer = $request->user();

        $customer->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json([
            'message' => 'Password changed successfully.',
            'success' => true,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $request->user()->id,
            'phone' => 'nullable|string|max:50',
            'organization_name' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'avatar' => 'nullable|string|max:500',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'data' => $request->user()->fresh(),
            'message' => 'Profile updated successfully.',
            'success' => true,
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json([
            'data' => Storage::url($path),
            'message' => 'File uploaded successfully.',
            'success' => true,
        ]);
    }
}
