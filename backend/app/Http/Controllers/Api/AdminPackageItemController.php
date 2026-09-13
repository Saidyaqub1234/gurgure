<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PackageItem;
use Illuminate\Http\Request;

class AdminPackageItemController extends Controller
{
    public function index(Request $request)
    {
        $query = PackageItem::with('package');

        if ($request->has('package_id')) {
            $query->where('package_id', $request->package_id);
        }

        $items = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'data' => $items,
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'package_id' => 'required|exists:packages,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'pricing_type' => 'nullable|string|max:255',
            'quantity_enabled' => 'boolean',
            'is_optional' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $item = PackageItem::create($validated);

        return response()->json([
            'data' => $item->load('package'),
            'message' => 'Package item created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(PackageItem $packageItem)
    {
        return response()->json([
            'data' => $packageItem->load('package'),
            'success' => true,
        ]);
    }

    public function update(Request $request, PackageItem $packageItem)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'package_id' => 'required|exists:packages,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'pricing_type' => 'nullable|string|max:255',
            'quantity_enabled' => 'boolean',
            'is_optional' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $packageItem->update($validated);

        return response()->json([
            'data' => $packageItem->load('package'),
            'message' => 'Package item updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(PackageItem $packageItem)
    {
        $packageItem->delete();

        return response()->json([
            'message' => 'Package item deleted successfully.',
            'success' => true,
        ]);
    }
}
