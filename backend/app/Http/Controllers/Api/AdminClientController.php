<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class AdminClientController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Client::orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:clients,slug',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'website' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $client = Client::create($validated);

        return response()->json([
            'data' => $client,
            'message' => 'Client created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Client $client)
    {
        return response()->json(['data' => $client, 'success' => true]);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:clients,slug,' . $client->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'website' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $client->update($validated);

        return response()->json([
            'data' => $client,
            'message' => 'Client updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully.',
            'success' => true,
        ]);
    }
}
