<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class AdminTeamController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => TeamMember::orderBy('order')->get(),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:team_members,slug',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $member = TeamMember::create($validated);

        return response()->json([
            'data' => $member,
            'message' => 'Team member created successfully.',
            'success' => true,
        ], 201);
    }

    public function show(TeamMember $teamMember)
    {
        return response()->json(['data' => $teamMember, 'success' => true]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'translations' => 'nullable|array',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:team_members,slug,' . $teamMember->id,
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'order' => 'integer|min:0',
            'is_published' => 'boolean',
        ]);

        $teamMember->update($validated);

        return response()->json([
            'data' => $teamMember,
            'message' => 'Team member updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();

        return response()->json([
            'message' => 'Team member deleted successfully.',
            'success' => true,
        ]);
    }
}
