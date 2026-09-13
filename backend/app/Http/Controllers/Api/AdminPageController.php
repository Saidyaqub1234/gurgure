<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class AdminPageController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Page::orderBy('created_at', 'desc')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'content' => 'nullable|string',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $page = Page::create($validated);

        return response()->json([
            'data' => $page,
            'message' => 'Page created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Page $page)
    {
        return response()->json(['data' => $page, 'success' => true]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'nullable|string',
            'sections' => 'nullable|array',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $page->update($validated);

        return response()->json([
            'data' => $page,
            'message' => 'Page updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return response()->json([
            'message' => 'Page deleted successfully.',
            'success' => true,
        ]);
    }
}
