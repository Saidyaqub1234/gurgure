<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class AdminTestimonialController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Testimonial::latest()->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'avatar' => 'nullable|string',
            'rating' => 'integer|min:1|max:5',
            'is_published' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'data' => $testimonial,
            'message' => 'Testimonial created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(Testimonial $testimonial)
    {
        return response()->json(['data' => $testimonial, 'success' => true]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'avatar' => 'nullable|string',
            'rating' => 'integer|min:1|max:5',
            'is_published' => 'boolean',
        ]);

        $testimonial->update($validated);

        return response()->json([
            'data' => $testimonial,
            'message' => 'Testimonial updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully.',
            'success' => true,
        ]);
    }
}
