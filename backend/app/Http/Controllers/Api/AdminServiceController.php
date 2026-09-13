<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class AdminServiceController extends Controller
{
public function index()
    {
        return response()->json([
            'data' => Service::with(['packages' => function ($query) {
                $query->where('is_active', true)->orderBy('base_price');
            }])->orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'items' => 'nullable|array',
            'category' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $service = Service::create($validated);

        return response()->json([
            'data' => $service,
            'message' => 'Service created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Service $service)
    {
        return response()->json(['data' => $service, 'success' => true]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services,slug,' . $service->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'items' => 'nullable|array',
            'category' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $service->update($validated);

        return response()->json([
            'data' => $service,
            'message' => 'Service updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully.',
            'success' => true,
        ]);
    }
}
