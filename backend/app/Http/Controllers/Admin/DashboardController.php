<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Service;
use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'pages' => Page::count(),
                'services' => Service::count(),
                'projects' => Project::count(),
                'contacts' => Contact::count(),
                'unread_contacts' => Contact::where('is_read', false)->count(),
            ]
        ]);
    }
}
