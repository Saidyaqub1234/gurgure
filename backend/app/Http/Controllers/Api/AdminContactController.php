<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class AdminContactController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Contact::orderBy('created_at', 'desc')->get(),
            'success' => true,
        ]);
    }

    public function show(Contact $contact)
    {
        if (!$contact->is_read) {
            $contact->update(['is_read' => true]);
        }

        return response()->json(['data' => $contact, 'success' => true]);
    }

    public function markRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);

        return response()->json([
            'data' => $contact,
            'message' => 'Contact marked as read.',
            'success' => true,
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json([
            'message' => 'Contact deleted successfully.',
            'success' => true,
        ]);
    }
}
