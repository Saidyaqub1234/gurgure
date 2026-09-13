<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminCustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('organization_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'data' => $customers,
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $customer = Customer::create($validated);

        return response()->json([
            'data' => $customer,
            'message' => 'Customer created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Customer $customer)
    {
        return response()->json([
            'data' => $customer->load(['quotations', 'invoices', 'payments']),
            'success' => true,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        $customer->update($validated);

        return response()->json([
            'data' => $customer,
            'message' => 'Customer updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Customer $customer)
    {
        $customer->quotations()->delete();
        $customer->invoices()->delete();
        $customer->payments()->delete();
        $customer->receipts()->delete();
        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully.',
            'success' => true,
        ]);
    }
}
