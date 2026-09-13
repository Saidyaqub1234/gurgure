<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Http\Request;

class AdminPackageController extends Controller
{
    public function index(Request $request)
    {
        $query = Package::with('service');

        if ($request->has('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        $packages = $query->orderBy('service_id')->orderBy('level')->get();

        return response()->json([
            'data' => $packages,
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'level' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'delivery_time' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $package = Package::create($validated);

        return response()->json([
            'data' => $package->load('service'),
            'message' => 'Package created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Package $package)
    {
        return response()->json([
            'data' => $package->load('service'),
            'success' => true,
        ]);
    }

    public function update(Request $request, Package $package)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'level' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'delivery_time' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $package->update($validated);

        return response()->json([
            'data' => $package->load('service'),
            'message' => 'Package updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Package $package)
    {
        $package->delete();

        return response()->json([
            'message' => 'Package deleted successfully.',
            'success' => true,
        ]);
    }
}
