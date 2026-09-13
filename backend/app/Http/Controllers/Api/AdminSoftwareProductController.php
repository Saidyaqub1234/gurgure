<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SoftwareProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminSoftwareProductController extends Controller
{
    public function index()
    {
        $products = SoftwareProduct::orderBy('order')->orderBy('id')->get();
        return response()->json(['data' => $products, 'success' => true]);
    }

    public function show(SoftwareProduct $softwareProduct)
    {
        return response()->json(['data' => $softwareProduct, 'success' => true]);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $product = SoftwareProduct::create($data);

        return response()->json([
            'data' => $product,
            'message' => 'Software product created successfully.',
            'success' => true,
        ], 201);
    }

    public function update(Request $request, SoftwareProduct $softwareProduct)
    {
        $data = $this->validateData($request, $softwareProduct);
        $softwareProduct->update($data);

        return response()->json([
            'data' => $softwareProduct,
            'message' => 'Software product updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(SoftwareProduct $softwareProduct)
    {
        $softwareProduct->delete();

        return response()->json([
            'message' => 'Software product deleted successfully.',
            'success' => true,
        ]);
    }

    protected function validateData(Request $request, ?SoftwareProduct $product = null): array
    {
        $unique = $product ? 'unique:software_products,slug,' . $product->id : 'unique:software_products,slug';
        $data = $request->validate([
            'slug' => 'required|string|max:255|' . $unique,
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:120',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'features' => 'nullable|array',
            'screenshots' => 'nullable|array',
            'demo_url' => 'nullable|string|max:500',
            'pricing_mode' => 'required|in:quote,one_time,subscription',
            'price' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:30',
            'setup_fee' => 'nullable|numeric|min:0',
            'image' => 'nullable|string|max:500',
            'is_published' => 'boolean',
            'order' => 'nullable|integer',
            'translations' => 'nullable|array',
        ]);

        $data['slug'] = Str::slug($data['slug']);
        $data['price'] = $data['price'] ?? null;
        $data['setup_fee'] = $data['setup_fee'] ?? 0;
        $data['order'] = $data['order'] ?? 0;
        $data['features'] = $data['features'] ?? [];
        $data['screenshots'] = $data['screenshots'] ?? [];
        return $data;
    }
}