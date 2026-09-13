<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
use App\Models\Page;
use App\Models\Service;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Client;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\FAQ;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user (skip if exists)
        if (!User::where('email', 'sadat@gmail.com')->exists()) {
            User::create([
                'name' => 'sadat',
                'email' => 'sadat@gmail.com',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]);
        }

        // Settings
        $settings = [
            ['key' => 'site_name', 'value' => 'GURGURE'],
            ['key' => 'site_tagline', 'value' => 'Making Visible Brands'],
            ['key' => 'site_description', 'value' => ''],
            ['key' => 'email', 'value' => 'info@gurgure.com'],
            ['key' => 'phone', 'value' => '+93 700 777 480'],
            ['key' => 'kabul_address', 'value' => 'Afshare, Kabul, Afghanistan'],
            ['key' => 'kandahar_address', 'value' => 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan'],
            ['key' => 'linkedin', 'value' => '#'],
            ['key' => 'facebook', 'value' => '#'],
            ['key' => 'instagram', 'value' => '#'],
            ['key' => 'twitter', 'value' => '#'],
            ['key' => 'youtube', 'value' => '#'],
            ['key' => 'hero_images', 'value' => json_encode([
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
            ])],
            ['key' => 'home_stats', 'value' => json_encode([
                ['label' => 'Projects Completed', 'end' => 150, 'suffix' => '+'],
                ['label' => 'Clients Served', 'end' => 80, 'suffix' => '+'],
                ['label' => 'Years Experience', 'end' => 10, 'suffix' => '+'],
                ['label' => 'Team Members', 'end' => 25, 'suffix' => '+'],
            ])],
            ['key' => 'nav_links', 'value' => json_encode([
                ['path' => '/', 'label' => 'Home'],
                ['path' => '/about', 'label' => 'About'],
                ['path' => '/services', 'label' => 'Services'],
                ['path' => '/portfolio', 'label' => 'Portfolio'],
                ['path' => '/clients', 'label' => 'Clients'],
                ['path' => '/blog', 'label' => 'Insights'],
                ['path' => '/contact', 'label' => 'Contact'],
            ])],
            ['key' => 'footer_services', 'value' => json_encode([
                'Strategic Management',
                'Creative Design',
                'Digital Systems',
                'ICT Infrastructure',
                'Hosting Solutions',
                'Corporate Communication',
            ])],
            ['key' => 'approach_steps', 'value' => json_encode([
                ['title' => 'Analyze', 'description' => 'We dive deep into your business, market, and competition to uncover opportunities.'],
                ['title' => 'Design', 'description' => 'We craft tailored strategies and creative concepts aligned with your vision.'],
                ['title' => 'Develop', 'description' => 'We bring ideas to life through cutting-edge technology and expert execution.'],
                ['title' => 'Deliver', 'description' => 'We deploy, monitor, and optimize to ensure lasting impact.'],
            ])],
            ['key' => 'page_hero_data', 'value' => json_encode([
                'home' => ['title' => '', 'subtitle' => ''],
                'about' => ['title' => 'About {site_name}', 'subtitle' => 'Learn about our journey, mission, and the team behind our success.'],
                'services' => ['title' => 'What We Do', 'subtitle' => 'End-to-end solutions in management consulting, creative design, and ICT engineering.'],
                'portfolio' => ['title' => 'Our Work', 'subtitle' => 'Explore our portfolio of successful projects across various sectors.'],
                'clients' => ['title' => 'Our Clients & Partners', 'subtitle' => 'Trusted by leading organizations across Afghanistan and beyond.'],
                'blog' => ['title' => 'Insights & Articles', 'subtitle' => 'Thoughts, insights, and stories from our team.'],
                'contact' => ['title' => "Let's Connect", 'subtitle' => "Have a project in mind? We'd love to hear from you."],
                'team' => ['title' => 'Our Team', 'subtitle' => 'Meet the passionate people behind {site_name}.'],
                'faq' => ['title' => 'Frequently Asked Questions', 'subtitle' => 'Find answers to common questions about our services.'],
            ])],
            ['key' => 'cta_data', 'value' => json_encode([
                'home' => ['title' => 'Ready to Start Your Project?', 'subtitle' => "Let's discuss how GURGURE can help bring your vision to life.", 'button_text' => 'Get in Touch', 'button_link' => '/contact'],
                'about' => ['title' => 'Want to Work With Us?', 'subtitle' => "Let's discuss how we can help your organization grow.", 'button_text' => 'Get in Touch', 'button_link' => '/contact'],
                'services' => ['title' => 'Need a Custom Solution?', 'subtitle' => 'We tailor our services to meet your unique business requirements.', 'button_text' => 'Contact Us', 'button_link' => '/contact'],
                'portfolio' => ['title' => 'Have a Project in Mind?', 'subtitle' => "Let's create something amazing together.", 'button_text' => 'Start a Project', 'button_link' => '/contact'],
            ])],
        ];
        foreach ($settings as $s) {
            Setting::firstOrCreate(['key' => $s['key']], $s);
        }

        // Services
        $services = [
            [
                'title' => 'Strategic Management & Advisory',
                'slug' => 'strategic-management-advisory',
                'description' => 'Strategic planning, business planning, feasibility studies, proposal development, and institutional assessments.',
                'icon' => '📊',
                'category' => 'development',
                'order' => 1,
                'items' => [
                    'Strategic planning & organizational development',
                    'Business planning & feasibility studies',
                    'Proposal development & technical narratives',
                    'Institutional assessments & roadmaps',
                    'Web & professional content writing',
                ],
            ],
            [
                'title' => 'Creative Design & Media Solutions',
                'slug' => 'creative-design-media',
                'description' => 'Branding, visual identity, graphic design, photography, virtual tours, and media production.',
                'icon' => '🎨',
                'category' => 'branding',
                'order' => 2,
                'items' => [
                    'Branding & corporate identity development',
                    'Logo design & visual systems',
                    'Graphic design for promotional materials',
                    '2D & 3D design services',
                    'Professional product photography',
                    '360° virtual tours',
                    'Media conversion & digital content production',
                    'Social media campaigns & sponsorship activation',
                ],
            ],
            [
                'title' => 'Digital Systems & Software Development',
                'slug' => 'digital-systems-software',
                'description' => 'Custom web platforms, LMS, database design, ERP solutions, and system integration.',
                'icon' => '💻',
                'category' => 'digital',
                'order' => 3,
                'items' => [
                    'Website design & development',
                    'Learning Management Systems (LMS)',
                    'Database design & development',
                    'Custom system design & development',
                    'Enterprise Resource Planning (ERP) solutions',
                ],
            ],
            [
                'title' => 'ICT Infrastructure & Consulting',
                'slug' => 'ict-infrastructure-consulting',
                'description' => 'Network design, system architecture, implementation, and enterprise-level infrastructure planning.',
                'icon' => '🌐',
                'category' => 'digital',
                'order' => 4,
                'items' => [
                    'LAN & WAN network design',
                    'ICT consulting & system architecture',
                    'Network implementation & optimization',
                    'Enterprise-level digital infrastructure planning',
                ],
            ],
            [
                'title' => 'Hosting & Digital Infrastructure',
                'slug' => 'hosting-digital-infrastructure',
                'description' => 'Shared hosting, VPS solutions, server deployment, platform maintenance and support.',
                'icon' => '☁️',
                'category' => 'digital',
                'order' => 5,
                'items' => [
                    'Shared hosting & VPS solutions',
                    'Server deployment & management',
                    'Platform maintenance & support',
                ],
            ],
            [
                'title' => 'Corporate Communication & Presentation Design',
                'slug' => 'corporate-communication-presentation',
                'description' => 'Professional pitch decks, investor presentations, and visual storytelling for corporate communications.',
                'icon' => '📋',
                'category' => 'branding',
                'order' => 6,
                'items' => [
                    'Corporate pitch development',
                    'Investor decks & presentations',
                    'Professional slide design & storytelling',
                ],
            ],
            [
                'title' => 'Trainings & Capacity Building',
                'slug' => 'trainings-capacity-building',
                'description' => 'Leadership development, digital skills training, and institutional capacity building seminars.',
                'icon' => '📚',
                'category' => 'training',
                'items' => [
                    'Leadership & management training programs',
                    'Digital skills & technology workshops',
                    'Institutional capacity building',
                    'Custom training curriculum development',
                    'Seminar & workshop facilitation',
                ],
            ],
            [
                'title' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'Strategic communication, social media management, SEO, and campaign management for digital growth.',
                'icon' => '📈',
                'category' => 'branding',
                'order' => 8,
                'items' => [
                    'Strategic communication planning',
                    'Social media management & content strategy',
                    'Search Engine Optimization (SEO)',
                    'Paid advertising campaign management',
                    'Brand awareness & digital growth strategies',
                    'Analytics & performance reporting',
                ],
            ],
        ];
        foreach ($services as $s) {
            Service::firstOrCreate(['slug' => $s['slug']], $s);
        }

        // Projects
        $projects = [
            [
                'title' => 'Strategic Plan for Emerging Business',
                'slug' => 'strategic-plan-emerging-business',
                'client' => 'Private Enterprise (Confidential)',
                'sector' => 'Private Enterprise',
                'service' => 'Strategic Management & Advisory',
                'challenge' => 'Needed a growth roadmap and feasibility study.',
                'solution' => 'Developed comprehensive strategic plan with financial modeling.',
                'outcome' => 'Clear 3-year roadmap, investor-ready documentation.',
                'order' => 1,
            ],
            [
                'title' => 'Corporate Branding System',
                'slug' => 'corporate-branding-system',
                'client' => 'Various Clients',
                'sector' => 'Cross-sector',
                'service' => 'Creative Design & Media Solutions',
                'challenge' => 'Lacked cohesive visual identity across platforms.',
                'solution' => 'Designed complete brand identity including logo, visual system, and guidelines.',
                'outcome' => 'Consistent brand presence across all touchpoints.',
                'order' => 2,
            ],
            [
                'title' => 'Custom LMS for Educational Institution',
                'slug' => 'custom-lms-educational',
                'client' => 'Educational Institution',
                'sector' => 'Education',
                'service' => 'Digital Systems & Software Development',
                'challenge' => 'Needed a digital platform for remote learning and course management.',
                'solution' => 'Built a custom Learning Management System with user training.',
                'outcome' => 'Successful deployment with ongoing support and adoption.',
                'order' => 3,
            ],
            [
                'title' => 'Investor Pitch Deck',
                'slug' => 'investor-pitch-deck',
                'client' => 'Startup Client',
                'sector' => 'Entrepreneurship',
                'service' => 'Corporate Communication & Presentation Design',
                'challenge' => 'Required a compelling narrative for investor fundraising.',
                'solution' => 'Developed professional slide deck with visual storytelling.',
                'outcome' => 'Investor-ready documentation with clear value proposition.',
                'order' => 4,
            ],
            [
                'title' => 'Enterprise Network Infrastructure',
                'slug' => 'enterprise-network-infrastructure',
                'client' => 'Corporate Client',
                'sector' => 'Enterprise',
                'service' => 'ICT Infrastructure & Consulting',
                'challenge' => 'Outdated network infrastructure affecting operations.',
                'solution' => 'Designed and implemented LAN/WAN network architecture.',
                'outcome' => 'Improved network performance, security, and scalability.',
                'order' => 5,
            ],
            [
                'title' => '360° Virtual Tour & Product Photography',
                'slug' => '360-virtual-tour-photography',
                'client' => 'Real Estate & Retail Clients',
                'sector' => 'Real Estate / Retail',
                'service' => 'Creative Design & Media Solutions',
                'challenge' => 'Needed immersive visual content for marketing.',
                'solution' => 'Produced high-resolution photography and interactive virtual tours.',
                'outcome' => 'Enhanced online presence and client engagement.',
                'order' => 6,
            ],
        ];
        foreach ($projects as $p) {
            Project::firstOrCreate(['slug' => $p['slug']], $p);
        }

        // Clients
        $clients = [
            ['name' => 'Client One', 'slug' => 'client-one', 'sector' => 'Technology', 'order' => 1],
            ['name' => 'Client Two', 'slug' => 'client-two', 'sector' => 'Finance', 'order' => 2],
            ['name' => 'Client Three', 'slug' => 'client-three', 'sector' => 'Education', 'order' => 3],
            ['name' => 'Client Four', 'slug' => 'client-four', 'sector' => 'Healthcare', 'order' => 4],
        ];
        foreach ($clients as $c) {
            Client::firstOrCreate(['slug' => $c['slug']], $c);
        }

        // Team Members
        $team = [
            ['name' => 'John Doe', 'slug' => 'john-doe', 'position' => 'CEO & Founder', 'bio' => 'Experienced leader.', 'order' => 1],
            ['name' => 'Jane Smith', 'slug' => 'jane-smith', 'position' => 'Creative Director', 'bio' => 'Creative visionary.', 'order' => 2],
            ['name' => 'Ali Ahmad', 'slug' => 'ali-ahmad', 'position' => 'Lead Developer', 'bio' => 'Full-stack expert.', 'order' => 3],
        ];
        foreach ($team as $t) {
            TeamMember::firstOrCreate(['slug' => $t['slug']], $t);
        }

        // Testimonials
        $testimonials = [
            ['name' => 'Client A', 'position' => 'CEO', 'company' => 'Company A', 'content' => 'Excellent service and great results.', 'rating' => 5],
            ['name' => 'Client B', 'position' => 'Manager', 'company' => 'Company B', 'content' => 'Very professional team. Highly recommended.', 'rating' => 4],
            ['name' => 'Client C', 'position' => 'Director', 'company' => 'Company C', 'content' => 'Transformed our digital presence completely.', 'rating' => 5],
        ];
        foreach ($testimonials as $t) {
            Testimonial::firstOrCreate(
                ['name' => $t['name'], 'company' => $t['company']],
                $t
            );
        }

        // FAQs
        $faqs = [
            ['question' => 'What services does GURGURE offer?', 'answer' => 'We offer strategic management, creative design, software development, ICT infrastructure, hosting, and presentation design services.', 'category' => 'General Questions', 'order' => 1],
            ['question' => 'How can I contact GURGURE?', 'answer' => 'You can reach us via email at info@gurgure.com, phone at +93 700 777 480, or visit our offices in Kabul or Kandahar.', 'category' => 'General Questions', 'order' => 2],
            ['question' => 'Do you offer international services?', 'answer' => 'Yes, we work with clients globally and deliver services remotely.', 'category' => 'General Questions', 'order' => 3],
            ['question' => 'What is the typical project timeline?', 'answer' => 'Timelines vary by project scope. We provide detailed timelines during the proposal phase.', 'category' => 'Timeline & Delivery Questions', 'order' => 4],
            ['question' => 'How do you price your services?', 'answer' => 'Our pricing depends on the scope, complexity, and timeline of each project. We offer packages at different levels (Basic, Silver, Gold, Platinum) and also provide custom quotes for unique requirements.', 'category' => 'Pricing & Investment Questions', 'order' => 5],
            ['question' => 'What is your process for starting a new project?', 'answer' => 'We begin with a discovery call to understand your needs, then provide a proposal and timeline. Once agreed, we move through our Analyze, Design, Develop, Deliver phases with regular check-ins.', 'category' => 'Process Questions', 'order' => 6],
        ];
        foreach ($faqs as $f) {
            FAQ::firstOrCreate(['question' => $f['question']], $f);
        }

        // Create home page content
        Page::firstOrCreate(['slug' => 'home'], [
            'title' => 'Home',
            'content' => 'Home page content managed from admin panel.',
            'is_published' => true,
        ]);

        $this->call([
            UpdateCompanyContentSeeder::class,
            ServicePackageSeeder::class,
            BlogSeeder::class,
            SoftwareProductsSeeder::class,
        ]);
    }
}
