<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\CaseStudy;
use App\Models\Client;
use App\Models\Contact;
use App\Models\Customer;
use App\Models\FAQ;
use App\Models\NewsletterSubscriber;
use App\Models\Page;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    protected function lang(Request $request): string
    {
        $lang = $request->header('X-Language', 'en');
        return in_array($lang, ['fa', 'ps']) ? $lang : 'en';
    }

    public function settings(Request $request)
    {
        $defaultHeroImages = [
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
        ];

        $defaultStats = [
            ['label' => 'Projects Completed', 'end' => 150, 'suffix' => '+'],
            ['label' => 'Clients Served', 'end' => 80, 'suffix' => '+'],
            ['label' => 'Years Experience', 'end' => 10, 'suffix' => '+'],
            ['label' => 'Team Members', 'end' => 25, 'suffix' => '+'],
        ];

        $defaultNavLinks = [
            ['path' => '/', 'label' => 'Home'],
            ['path' => '/about', 'label' => 'About'],
            ['path' => '/services', 'label' => 'Services'],
            ['path' => '/portfolio', 'label' => 'Portfolio'],
            ['path' => '/clients', 'label' => 'Clients'],
            ['path' => '/blog', 'label' => 'Insights'],
            ['path' => '/contact', 'label' => 'Contact'],
        ];

        $defaultFooterServices = [
            'Strategic Management',
            'Creative Design',
            'Digital Systems',
            'ICT Infrastructure',
            'Hosting Solutions',
            'Corporate Communication',
        ];

        $defaultApproachSteps = [
            ['title' => 'Analyze', 'description' => 'We dive deep into your business, market, and competition to uncover opportunities.'],
            ['title' => 'Design', 'description' => 'We craft tailored strategies and creative concepts aligned with your vision.'],
            ['title' => 'Develop', 'description' => 'We bring ideas to life through cutting-edge technology and expert execution.'],
            ['title' => 'Deliver', 'description' => 'We deploy, monitor, and optimize to ensure lasting impact.'],
        ];

        $defaultPageHero = [
            'home' => ['title' => '', 'subtitle' => ''],
            'about' => ['title' => 'About {site_name}', 'subtitle' => 'Learn about our journey, mission, and the team behind our success.'],
            'services' => ['title' => 'What We Do', 'subtitle' => 'End-to-end solutions in management consulting, creative design, and ICT engineering.'],
            'portfolio' => ['title' => 'Our Work', 'subtitle' => 'Explore our portfolio of successful projects across various sectors.'],
            'clients' => ['title' => 'Our Clients & Partners', 'subtitle' => 'Trusted by leading organizations across Afghanistan and beyond.'],
            'blog' => ['title' => 'Insights & Articles', 'subtitle' => 'Thoughts, insights, and stories from our team.'],
            'contact' => ['title' => "Let's Connect", 'subtitle' => "Have a project in mind? We'd love to hear from you."],
            'team' => ['title' => 'Our Team', 'subtitle' => 'Meet the passionate people behind {site_name}.'],
            'faq' => ['title' => 'Frequently Asked Questions', 'subtitle' => 'Find answers to common questions about our services.'],
        ];

        $defaultCTA = [
            'home' => ['title' => 'Ready to Start Your Project?', 'subtitle' => "Let's discuss how GURGURE can help bring your vision to life.", 'button_text' => 'Get in Touch', 'button_link' => '/contact'],
            'about' => ['title' => 'Want to Work With Us?', 'subtitle' => "Let's discuss how we can help your organization grow.", 'button_text' => 'Get in Touch', 'button_link' => '/contact'],
            'services' => ['title' => 'Need a Custom Solution?', 'subtitle' => 'We tailor our services to meet your unique business requirements.', 'button_text' => 'Contact Us', 'button_link' => '/contact'],
            'portfolio' => ['title' => 'Have a Project in Mind?', 'subtitle' => "Let's create something amazing together.", 'button_text' => 'Start a Project', 'button_link' => '/contact'],
        ];

        $decode = function($key, $default) {
            $val = Setting::get($key, null);
            if (!$val) return $default;
            $decoded = json_decode($val, true);
            return is_array($decoded) ? $decoded : $default;
        };

        $lang = $this->lang($request);

        $setting = function($key, $default) use ($lang) {
            if ($lang !== 'en') {
                $localized = Setting::get($key . '_' . $lang, null);
                if ($localized !== null && $localized !== '' && $localized !== 'null') {
                    return $localized;
                }
            }
            return Setting::get($key, $default);
        };

        $data = [
            'site_name' => $setting('site_name', 'GURGURE'),
            'site_tagline' => $setting('site_tagline', 'Making Visible Brands'),
            'site_description' => $setting('site_description', ''),
            'logo' => Setting::get('logo', ''),
            'about_history' => $setting('about_history', 'Founded with a vision to bridge the gap between strategy, creativity, and technology, GURGURE has grown into a trusted multidisciplinary consultancy serving clients across Afghanistan and beyond.'),
            'about_vision' => $setting('about_vision', 'To be the leading catalyst for transformative change, empowering businesses and communities through innovative strategies, creative excellence, and technological advancement.'),
            'about_mission' => $setting('about_mission', 'To deliver integrated, impactful solutions that address complex challenges, foster sustainable growth, and create lasting value for our clients and stakeholders.'),
            'hero_title' => $setting('hero_title', 'Integrated Strategy. Creative Vision. Digital Reality.'),
            'hero_subtitle' => $setting('hero_subtitle', 'Kabul-based multidisciplinary consultancy delivering end-to-end solutions in management consulting, creative design, and ICT engineering.'),
            'email' => Setting::get('email', 'info@gurgure.com'),
            'phone' => Setting::get('phone', '+93 700 777 480'),
            'kabul_address' => $setting('kabul_address', 'Afshare, Kabul, Afghanistan'),
            'kandahar_address' => $setting('kandahar_address', 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan'),
            'linkedin' => Setting::get('linkedin', '#'),
            'facebook' => Setting::get('facebook', '#'),
            'instagram' => Setting::get('instagram', '#'),
            'twitter' => Setting::get('twitter', '#'),
            'youtube' => Setting::get('youtube', '#'),
            'hero_images' => $decode('hero_images', $defaultHeroImages),
            'home_stats' => $lang !== 'en' ? $decode('home_stats_' . $lang, $decode('home_stats', $defaultStats)) : $decode('home_stats', $defaultStats),
            'nav_links' => $decode('nav_links', $defaultNavLinks),
            'footer_services' => $lang !== 'en' ? $decode('footer_services_' . $lang, $decode('footer_services', $defaultFooterServices)) : $decode('footer_services', $defaultFooterServices),
            'approach_steps' => $lang !== 'en' ? $decode('approach_steps_' . $lang, $decode('approach_steps', $defaultApproachSteps)) : $decode('approach_steps', $defaultApproachSteps),
            'page_hero_data' => $lang !== 'en' ? $decode('page_hero_data_' . $lang, $decode('page_hero_data', $defaultPageHero)) : $decode('page_hero_data', $defaultPageHero),
            'cta_data' => $lang !== 'en' ? $decode('cta_data_' . $lang, $decode('cta_data', $defaultCTA)) : $decode('cta_data', $defaultCTA),
        ];

        return response()->json(['data' => $data, 'success' => true]);
    }

    public function page(Request $request, $slug)
    {
        $page = Page::where('slug', $slug)->where('is_published', true)->first();
        if (!$page) {
            return response()->json(['data' => null, 'success' => false], 404);
        }
        return response()->json(['data' => $page->localize($this->lang($request)), 'success' => true]);
    }

    public function services(Request $request)
    {
        $query = Service::where('is_published', true);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $services = $query->orderBy('order')->get();
        return response()->json(['data' => Service::localizeCollection($services, $this->lang($request)), 'success' => true]);
    }

    public function service($slug, Request $request)
    {
        $service = Service::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return response()->json(['data' => $service->localize($this->lang($request)), 'success' => true]);
    }

    public function projects(Request $request)
    {
        $projects = Project::where('is_published', true)->orderBy('order')->get();
        return response()->json(['data' => Project::localizeCollection($projects, $this->lang($request)), 'success' => true]);
    }

    public function project($slug, Request $request)
    {
        $project = Project::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return response()->json(['data' => $project->localize($this->lang($request)), 'success' => true]);
    }

    public function blogs(Request $request)
    {
        $blogs = Blog::where('is_published', true)->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => Blog::localizeCollection($blogs, $this->lang($request)), 'success' => true]);
    }

    public function blogShow($slug, Request $request)
    {
        $blog = Blog::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return response()->json(['data' => $blog->localize($this->lang($request)), 'success' => true]);
    }

    public function clients(Request $request)
    {
        $clients = Client::where('is_published', true)->orderBy('order')->get();
        return response()->json(['data' => Client::localizeCollection($clients, $this->lang($request)), 'success' => true]);
    }

    public function team(Request $request)
    {
        $team = TeamMember::where('is_published', true)->orderBy('order')->get();
        return response()->json(['data' => TeamMember::localizeCollection($team, $this->lang($request)), 'success' => true]);
    }

    public function testimonials(Request $request)
    {
        $testimonials = Testimonial::where('is_published', true)->latest()->get();
        return response()->json(['data' => Testimonial::localizeCollection($testimonials, $this->lang($request)), 'success' => true]);
    }

    public function caseStudies(Request $request)
    {
        $caseStudies = CaseStudy::where('is_published', true)->orderBy('order')->get();
        return response()->json(['data' => CaseStudy::localizeCollection($caseStudies, $this->lang($request)), 'success' => true]);
    }

    public function faqs(Request $request)
    {
        $faqs = FAQ::where('is_published', true)->orderBy('order')->get();
        return response()->json(['data' => FAQ::localizeCollection($faqs, $this->lang($request)), 'success' => true]);
    }

    public function contactSubmit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'service_interest' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'data' => $contact,
            'message' => 'Thank you! Your message has been received.',
            'success' => true,
        ], 201);
    }

    public function registerCustomer(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create($validated);

        return response()->json([
            'data' => $customer,
            'message' => 'Registration successful. You can now request a quotation.',
            'success' => true,
        ], 201);
    }

    public function newsletterSubscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255|unique:newsletter_subscribers,email',
        ]);

        $subscriber = NewsletterSubscriber::create($validated);

        return response()->json([
            'data' => $subscriber,
            'message' => 'Successfully subscribed to newsletter.',
            'success' => true,
        ], 201);
    }
}
