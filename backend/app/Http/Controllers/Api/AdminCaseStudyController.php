<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use Illuminate\Http\Request;

class AdminCaseStudyController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => CaseStudy::orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'client' => 'required|string|max:255',
            'tag' => 'nullable|string|max:255',
            'challenge' => 'required|string',
            'solution' => 'required|string',
            'results' => 'nullable|array',
            'results.*' => 'string',
            'testimonial' => 'nullable|string',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $caseStudy = CaseStudy::create($validated);

        return response()->json([
            'data' => $caseStudy,
            'message' => 'Case study created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(CaseStudy $caseStudy)
    {
        return response()->json(['data' => $caseStudy, 'success' => true]);
    }

    public function update(Request $request, CaseStudy $caseStudy)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'client' => 'required|string|max:255',
            'tag' => 'nullable|string|max:255',
            'challenge' => 'required|string',
            'solution' => 'required|string',
            'results' => 'nullable|array',
            'results.*' => 'string',
            'testimonial' => 'nullable|string',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $caseStudy->update($validated);

        return response()->json([
            'data' => $caseStudy,
            'message' => 'Case study updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(CaseStudy $caseStudy)
    {
        $caseStudy->delete();

        return response()->json([
            'message' => 'Case study deleted successfully.',
            'success' => true,
        ]);
    }
}
