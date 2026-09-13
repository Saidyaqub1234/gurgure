<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class AdminProjectController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Project::orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug',
            'client' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'outcome' => 'nullable|string',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $project = Project::create($validated);

        return response()->json([
            'data' => $project,
            'message' => 'Project created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Project $project)
    {
        return response()->json(['data' => $project, 'success' => true]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'client' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'challenge' => 'nullable|string',
            'solution' => 'nullable|string',
            'outcome' => 'nullable|string',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $project->update($validated);

        return response()->json([
            'data' => $project,
            'message' => 'Project updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.',
            'success' => true,
        ]);
    }
}
