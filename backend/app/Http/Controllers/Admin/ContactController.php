<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => Contact::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function show(Contact $contact): Response
    {
        if (!$contact->is_read) {
            $contact->update(['is_read' => true]);
        }
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact
        ]);
    }

    public function markRead(Contact $contact): RedirectResponse
    {
        $contact->update(['is_read' => true]);
        return back();
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();
        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
