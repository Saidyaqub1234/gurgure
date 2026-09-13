<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp,pdf,doc,docx|max:10240',
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json([
            'data' => [
                'url' => Storage::url($path),
                'path' => $path,
            ],
            'message' => 'File uploaded successfully.',
            'success' => true,
        ]);
    }
}
