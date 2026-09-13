<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Page;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    private function getSettings(): array
    {
        return [
            'site_name' => Setting::get('site_name', 'GURGURE'),
            'site_tagline' => Setting::get('site_tagline', 'Making Visible Brands'),
            'email' => Setting::get('email', 'info@gurgure.com'),
            'phone' => Setting::get('phone', '+93 700 777 480'),
            'kabul_address' => Setting::get('kabul_address', 'Afshare, Kabul, Afghanistan'),
            'kandahar_address' => Setting::get('kandahar_address', 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan'),
            'linkedin' => Setting::get('linkedin', '#'),
            'facebook' => Setting::get('facebook', '#'),
            'instagram' => Setting::get('instagram', '#'),
        ];
    }

    public function home(): Response
    {
        return Inertia::render('Public/Home', [
            'settings' => $this->getSettings(),
            'services' => Service::where('is_published', true)->orderBy('order')->get(),
            'projects' => Project::where('is_published', true)->orderBy('order')->take(4)->get(),
            'page' => Page::where('slug', 'home')->first(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Public/About', [
            'settings' => $this->getSettings(),
            'page' => Page::where('slug', 'about')->first(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('Public/Services', [
            'settings' => $this->getSettings(),
            'services' => Service::where('is_published', true)->orderBy('order')->get(),
        ]);
    }

    public function portfolio(): Response
    {
        return Inertia::render('Public/Portfolio', [
            'settings' => $this->getSettings(),
            'projects' => Project::where('is_published', true)->orderBy('order')->get(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Public/Contact', [
            'settings' => $this->getSettings(),
        ]);
    }

    public function contactSubmit(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'service_interest' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Thank you! Your message has been received. We will get back to you shortly.');
    }

    public function blog(): Response
    {
        return Inertia::render('Public/Blog', [
            'settings' => $this->getSettings(),
            'blogs' => Blog::where('is_published', true)->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function blogShow(string $slug): Response
    {
        return Inertia::render('Public/BlogShow', [
            'settings' => $this->getSettings(),
            'blog' => Blog::where('slug', $slug)->where('is_published', true)->firstOrFail(),
        ]);
    }
}
