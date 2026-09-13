<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class AdminBlogController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Blog::orderBy('created_at', 'desc')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $blog = Blog::create($validated);

        return response()->json([
            'data' => $blog,
            'message' => 'Blog created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Blog $blog)
    {
        return response()->json(['data' => $blog, 'success' => true]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $blog->id,
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        $blog->update($validated);

        return response()->json([
            'data' => $blog,
            'message' => 'Blog updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully.',
            'success' => true,
        ]);
    }
}
