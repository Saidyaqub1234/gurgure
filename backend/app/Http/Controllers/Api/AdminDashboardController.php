<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\CaseStudy;
use App\Models\Client;
use App\Models\Contact;
use App\Models\Customer;
use App\Models\FAQ;
use App\Models\Invoice;
use App\Models\NewsletterSubscriber;
use App\Models\Package;
use App\Models\Page;
use App\Models\Project;
use App\Models\Quotation;
use App\Models\Receipt;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json(['data' => [
            'pages' => Page::count(),
            'services' => Service::count(),
            'customers' => Customer::count(),
            'packages' => Package::count(),
            'projects' => Project::count(),
            'blogs' => Blog::count(),
            'clients' => Client::count(),
            'team_members' => TeamMember::count(),
            'testimonials' => Testimonial::count(),
            'faqs' => FAQ::count(),
            'case_studies' => CaseStudy::count(),
            'contacts' => Contact::count(),
            'unread_contacts' => Contact::where('is_read', false)->count(),
            'subscribers' => NewsletterSubscriber::count(),
            'quotations' => Quotation::count(),
            'invoices' => Invoice::count(),
            'receipts' => Receipt::count(),
        ], 'success' => true]);
    }
}
