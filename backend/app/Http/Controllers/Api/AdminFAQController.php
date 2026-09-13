<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;

class AdminFAQController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => FAQ::orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $faq = FAQ::create($validated);

        return response()->json([
            'data' => $faq,
            'message' => 'FAQ created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(FAQ $faq)
    {
        return response()->json(['data' => $faq, 'success' => true]);
    }

    public function update(Request $request, FAQ $faq)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $faq->update($validated);

        return response()->json([
            'data' => $faq,
            'message' => 'FAQ updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(FAQ $faq)
    {
        $faq->delete();

        return response()->json([
            'message' => 'FAQ deleted successfully.',
            'success' => true,
        ]);
    }
}
