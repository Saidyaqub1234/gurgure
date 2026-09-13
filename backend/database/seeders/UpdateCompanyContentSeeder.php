<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Client;
use App\Models\Testimonial;
use App\Models\FAQ;
use App\Models\Project;
use App\Models\Page;
use Illuminate\Database\Seeder;

class UpdateCompanyContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Settings updates using updateOrCreate
        $settings = [
            ['key' => 'home_stats', 'value' => json_encode([
                ['label' => 'Projects Completed', 'end' => 450, 'suffix' => '+'],
                ['label' => 'Clients Served', 'end' => 500, 'suffix' => '+'],
                ['label' => 'Years Experience', 'end' => 20, 'suffix' => '+'],
                ['label' => 'Team Members', 'end' => 50, 'suffix' => '+'],
            ])],
            ['key' => 'site_tagline', 'value' => 'Integrated Strategy. Creative Vision. Digital Reality.'],
            ['key' => 'phone2', 'value' => '+93 790686467'],
            ['key' => 'phone3', 'value' => '+93 781777304'],
            ['key' => 'about_history', 'value' => 'GURGURE Company was founded with a single conviction: organizations need more than isolated services. They need integrated solutions that connect strategy, branding, technology, communication, and organizational growth. Today, we are a multidisciplinary consultancy and digital solutions firm dedicated to helping businesses, institutions, NGOs, educational organizations, and entrepreneurs turn ideas into structured systems, visible brands, and sustainable growth models. We work at the intersection of Business Development, Strategic Management, Creative Design, Digital Transformation, and Capacity Building — providing modern, tailored solutions for today\'s competitive, technology-driven environment.'],
            ['key' => 'about_mission', 'value' => 'To empower organizations with integrated strategies, powerful brands, smart systems, and capable teams — so they can grow with clarity and confidence.'],
            ['key' => 'about_vision', 'value' => 'To be the leading catalyst for transformative change, empowering businesses and communities through innovative strategies, creative excellence, and technological advancement.'],
            ['key' => 'approach_steps', 'value' => json_encode([
                ['title' => 'Discover', 'description' => 'Needs assessment & discovery workshops; Current state analysis; Stakeholder interviews & market research; Opportunity identification'],
                ['title' => 'Design', 'description' => 'Strategic roadmap development; Brand identity & creative direction; System architecture & technical design; Communication & marketing strategy'],
                ['title' => 'Build', 'description' => 'Brand asset creation & guidelines; System development; Content & campaign production; Training material development'],
                ['title' => 'Activate', 'description' => 'Implementation & go-live support; Training & capacity building; Campaign launches & brand rollouts; Change management'],
                ['title' => 'Scale', 'description' => 'Performance monitoring & reporting; Iterative improvements; Ongoing advisory; Strategic pivots & scaling support'],
            ])],
            ['key' => 'footer_services', 'value' => json_encode([
                'Strategic Management & Advisory',
                'Creative Design & Media Solutions',
                'Digital Systems & Software Development',
                'ICT Infrastructure & Consulting',
                'Hosting & Digital Infrastructure',
                'Corporate Communication & Presentation Design',
                'Digital Marketing',
                'Trainings & Capacity Building',
            ])],
            ['key' => 'nav_links', 'value' => json_encode([
                ['path' => '/', 'label' => 'Home'],
                ['path' => '/about', 'label' => 'About'],
                ['path' => '/services', 'label' => 'Services'],
                ['path' => '/portfolio', 'label' => 'Portfolio'],
                ['path' => '/clients', 'label' => 'Clients'],
                ['path' => '/insights', 'label' => 'Insights'],
                ['path' => '/contact', 'label' => 'Contact'],
                ['path' => '/team', 'label' => 'Team'],
                ['path' => '/faq', 'label' => 'FAQ'],
            ])],
            ['key' => 'hero_title', 'value' => 'Integrated Strategy. Creative Vision. Digital Reality.'],
            ['key' => 'hero_subtitle', 'value' => 'Kabul-based multidisciplinary consultancy delivering end-to-end solutions in management consulting, creative design, and ICT engineering.'],
        ];
        foreach ($settings as $s) {
            Setting::updateOrCreate(['key' => $s['key']], ['value' => $s['value']]);
        }

        // 2. Services - add new ones if they don't exist
        $services = [
            [
                'title' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'Social media management, campaign development, content strategy, SEO, and paid advertising to increase your visibility and engagement.',
                'icon' => '📱',
                'order' => 7,
                'items' => [
                    'Digital Marketing Strategy',
                    'Social Media Management',
                    'Content Creation',
                    'Campaign Management',
                    'SEO (Search Engine Optimization)',
                    'Paid Advertising',
                    'Email Marketing',
                    'Analytics & Reporting',
                ],
            ],
            [
                'title' => 'Trainings & Capacity Building',
                'slug' => 'trainings-capacity-building',
                'description' => 'Leadership development, digital skills training, institutional capacity building, and professional development programs tailored to your team.',
                'icon' => '🎓',
                'order' => 8,
                'items' => [
                    'Leadership & Management Development',
                    'Technical & Digital Skills',
                    'Institutional Capacity Building',
                    'Professional & Soft Skills',
                    'Custom Curriculum Design',
                    'Train-the-Trainer Programs',
                ],
            ],
        ];
        foreach ($services as $s) {
            Service::firstOrCreate(['slug' => $s['slug']], $s);
        }

        // 3. Team Members - update existing, add new
        $teamMembers = [
            [
                'slug' => 'john-doe',
                'name' => 'Gh. Mustafa Baedaar',
                'position' => 'Founder & Managing Director',
                'bio' => '25+ years in strategic management, organizational development, business transformation. Leads vision and client partnerships across Afghanistan and beyond.',
                'order' => 1,
            ],
            [
                'slug' => 'jane-smith',
                'name' => 'Head of Strategy',
                'position' => 'Head of Strategy & Business Development',
                'bio' => 'Former consultant for international NGOs. Specializes in feasibility studies, donor proposals, institutional roadmaps.',
                'order' => 2,
            ],
            [
                'slug' => 'ali-ahmad',
                'name' => 'Creative Director',
                'position' => 'Creative Director',
                'bio' => 'Award-winning designer. Expertise in branding, visual identity, campaign development. Leads creative strategy and visual innovation.',
                'order' => 3,
            ],
            [
                'slug' => 'head-digital-transformation',
                'name' => 'Head of Digital Transformation',
                'position' => 'Head of Digital Transformation & ICT',
                'bio' => 'Full-stack engineer, systems architect. Leads custom ERP, MIS, automation for enterprises and NGOs.',
                'order' => 4,
            ],
            [
                'slug' => 'marketing-lead',
                'name' => 'Marketing Lead',
                'position' => 'Digital Marketing & Communications Lead',
                'bio' => 'Data-driven marketer specializing in social media strategy, content marketing, campaign management.',
                'order' => 5,
            ],
            [
                'slug' => 'learning-manager',
                'name' => 'Learning Manager',
                'position' => 'Learning & Development Manager',
                'bio' => 'Certified trainer with 10+ years in leadership development, digital skills, institutional capacity building.',
                'order' => 6,
            ],
        ];
        foreach ($teamMembers as $t) {
            TeamMember::updateOrCreate(['slug' => $t['slug']], $t);
        }

        // 4. Clients - update existing with real names, add new ones
        $clients = [
            ['slug' => 'client-one', 'name' => 'Estedaad'],
            ['slug' => 'client-two', 'name' => 'Qasemi Group'],
            ['slug' => 'client-three', 'name' => 'Moraa Educational Complex'],
            ['slug' => 'client-four', 'name' => 'Hadith Academy'],
            ['slug' => 'sarvari-group', 'name' => 'Sarvari Group', 'sector' => 'Conglomerate', 'order' => 5],
            ['slug' => 'amini-roshandel', 'name' => 'Amini Roshandel Group', 'sector' => 'Conglomerate', 'order' => 6],
            ['slug' => 'mids', 'name' => 'MIDS', 'sector' => 'Consulting', 'order' => 7],
            ['slug' => 'rokham-services', 'name' => 'Rokham Services', 'sector' => 'Services', 'order' => 8],
            ['slug' => 'shinwari-aluminum', 'name' => 'Shinwari Aluminum Factory', 'sector' => 'Manufacturing', 'order' => 9],
            ['slug' => 'danish-press', 'name' => 'Danish Press', 'sector' => 'Media', 'order' => 10],
            ['slug' => 'pajhwok', 'name' => 'Pajhwok', 'sector' => 'Media', 'order' => 11],
        ];
        foreach ($clients as $c) {
            Client::updateOrCreate(['slug' => $c['slug']], $c);
        }

        // 5. Testimonials - update existing, add new
        $testimonials = [
            [
                '_match' => ['name' => 'Client A', 'company' => 'Company A'],
                'name' => 'Senior Manager',
                'company' => 'Estedaad',
                'position' => 'Senior Manager',
                'content' => 'The training delivered by GURGURE transformed how our team approaches project management. The combination of theory, practical exercises, and real examples from our context made all the difference.',
                'rating' => 5,
            ],
            [
                '_match' => ['name' => 'Client B', 'company' => 'Company B'],
                'name' => 'CEO',
                'company' => 'Qasemi Group',
                'position' => 'CEO',
                'content' => 'GURGURE delivered a complete digital transformation that exceeded our expectations. Our reporting efficiency improved by 40% and we now have real-time financial control.',
                'rating' => 5,
            ],
            [
                '_match' => ['name' => 'Client C', 'company' => 'Company C'],
                'name' => 'Founder',
                'company' => 'Startup Client',
                'position' => 'Founder',
                'content' => 'The strategic plan and pitch deck GURGURE developed helped us secure $200k in seed funding. Their understanding of our vision was remarkable.',
                'rating' => 5,
            ],
        ];
        foreach ($testimonials as $t) {
            $match = $t['_match'];
            unset($t['_match']);
            Testimonial::updateOrCreate($match, $t);
        }

        Testimonial::firstOrCreate(
            ['name' => 'Director', 'company' => 'Moraa Educational Complex'],
            [
                'position' => 'Academic Director',
                'content' => 'Our brand identity and LMS system have completely transformed how students and parents perceive our institution. Professional, modern, and effective.',
                'rating' => 5,
            ]
        );

        // 6. FAQs - add more comprehensive FAQs
        $faqs = [
            [
                'question' => 'What makes GURGURE different from other consultancies?',
                'answer' => 'Unlike single-service providers, GURGURE offers fully integrated solutions. We connect strategy, branding, technology, and training under one roof. This means your brand, systems, and people work together seamlessly — not in isolation. You get one partner, one relationship, and one integrated growth engine.',
                'category' => 'General Questions',
                'order' => 7,
                'is_published' => true,
            ],
            [
                'question' => 'What types of organizations do you work with?',
                'answer' => 'We work with businesses, NGOs, educational institutions, entrepreneurs, and donor-funded projects. Whether you are a startup, an established enterprise, or a growing nonprofit, our solutions are tailored to your specific context and needs.',
                'category' => 'General Questions',
                'order' => 8,
                'is_published' => true,
            ],
            [
                'question' => 'Are you based only in Afghanistan?',
                'answer' => 'Our headquarters is in Kabul, Afghanistan, and we specialize in the local market context. However, we work with organizations regionally and can deliver virtual services — including strategy, training, and digital development — to clients anywhere.',
                'category' => 'General Questions',
                'order' => 9,
                'is_published' => true,
            ],
            [
                'question' => 'How does your engagement process work?',
                'answer' => 'We follow a 5-phase framework: Discover, Design, Build, Activate, Scale. We start with a discovery conversation to understand your needs, then propose a tailored scope of work. Once engaged, we work collaboratively with your team through each phase, ensuring transparency and measurable outcomes at every step.',
                'category' => 'Process Questions',
                'order' => 10,
                'is_published' => true,
            ],
            [
                'question' => 'Do you work on-site or remotely?',
                'answer' => 'Both. We offer on-site engagements in Kabul and select locations, as well as virtual delivery for strategy, training, and digital projects. We adapt to your preferences and operational realities in Afghanistan and beyond.',
                'category' => 'Process Questions',
                'order' => 11,
                'is_published' => true,
            ],
            [
                'question' => 'How involved will my team need to be?',
                'answer' => 'We believe in partnership, not handoff. Your team input is essential for context and buy-in. We typically schedule regular check-ins, reviews, and training sessions. However, we handle the heavy lifting — you stay focused on running your organization.',
                'category' => 'Process Questions',
                'order' => 12,
                'is_published' => true,
            ],
            [
                'question' => 'Do you offer discounts for NGOs or nonprofits?',
                'answer' => 'Yes. We work with many NGOs and social enterprises and offer flexible, mission-aligned pricing. We will discuss options during your consultation based on your budget and project scope.',
                'category' => 'Pricing & Investment Questions',
                'order' => 13,
                'is_published' => true,
            ],
            [
                'question' => 'Is there a consultation fee?',
                'answer' => 'No. Our initial discovery consultation is completely free. We will learn about your needs, answer your questions, and provide recommendations — with no obligation to move forward.',
                'category' => 'Pricing & Investment Questions',
                'order' => 14,
                'is_published' => true,
            ],
            [
                'question' => 'How long does a typical project take?',
                'answer' => 'It varies by scope. A brand identity project might take 4-6 weeks. A strategic plan typically takes 6-8 weeks. A custom ERP system can take 3-6 months. We provide clear timelines in every proposal and work in phases to deliver value quickly.',
                'category' => 'Timeline & Delivery Questions',
                'order' => 15,
                'is_published' => true,
            ],
            [
                'question' => 'Do you provide ongoing support after project completion?',
                'answer' => 'Absolutely. We offer maintenance retainers, annual strategy reviews, and on-call advisory services. Many of our clients work with us as long-term partners, not just for one project.',
                'category' => 'Timeline & Delivery Questions',
                'order' => 16,
                'is_published' => true,
            ],
        ];
        foreach ($faqs as $f) {
            FAQ::updateOrCreate(['question' => $f['question']], $f);
        }

        // 7. Projects - update existing with more detail, add new ones
        $existingStrategic = Project::where('slug', 'strategic-plan-emerging-business')->first();
        if ($existingStrategic) {
            $existingStrategic->update([
                'challenge' => 'The business needed a comprehensive growth roadmap and detailed feasibility study to secure investor confidence and guide expansion.',
                'solution' => 'Developed a full strategic plan including market analysis, financial modeling, competitive positioning, and a 3-year implementation roadmap with KPIs.',
                'outcome' => 'Clear 3-year strategic roadmap, investor-ready documentation, and a structured growth framework adopted across all departments.',
            ]);
        }

        $existingBranding = Project::where('slug', 'corporate-branding-system')->first();
        if ($existingBranding) {
            $existingBranding->update([
                'challenge' => 'The organization lacked a cohesive visual identity across platforms, resulting in inconsistent brand communication and weak market recognition.',
                'solution' => 'Designed a complete brand identity system including logo, color palette, typography, visual guidelines, and application templates for digital and print.',
                'outcome' => 'Consistent and recognizable brand presence across all touchpoints, with a comprehensive brand guidelines document for ongoing use.',
            ]);
        }

        $projects = [
            [
                'title' => 'NGO Digital Transformation',
                'slug' => 'ngo-digital-transformation',
                'client' => 'Confidential NGO',
                'sector' => 'Nonprofit',
                'service' => 'Digital Systems & Software Development',
                'challenge' => 'Fragmented manual systems across departments with no integration, causing delays in donor reporting',
                'solution' => 'Implemented full ERP system with finance, HR, procurement, and program management modules with team training',
                'outcome' => '40% faster donor reporting and real-time financial control across all departments',
                'order' => 7,
            ],
            [
                'title' => 'Retail Rebrand & Web Overhaul',
                'slug' => 'retail-rebrand-web',
                'client' => 'Retail Client',
                'sector' => 'Retail',
                'service' => 'Creative Design & Media Solutions',
                'challenge' => 'Outdated brand identity and slow, non-responsive website losing customer engagement',
                'solution' => 'Complete rebrand with new visual identity, responsive website, and integrated social media campaign',
                'outcome' => '3x website traffic + 150% engagement on social media within 4 months',
                'order' => 8,
            ],
            [
                'title' => 'Startup Strategic Plan & Pitch Deck',
                'slug' => 'startup-strategic-plan',
                'client' => 'Tech Startup',
                'sector' => 'Entrepreneurship',
                'service' => 'Corporate Communication & Presentation Design',
                'challenge' => 'Needed comprehensive business plan and compelling investor pitch to secure funding',
                'solution' => 'Developed strategic plan with financial modeling and designed investor pitch deck with visual storytelling',
                'outcome' => 'Secured $200k seed funding after GURGURE-led investor narrative',
                'order' => 9,
            ],
        ];
        foreach ($projects as $p) {
            Project::firstOrCreate(['slug' => $p['slug']], $p);
        }

        // 8. Pages - create additional pages
        $pages = [
            ['slug' => 'about', 'title' => 'About Us', 'content' => 'Company history and mission managed from admin panel.', 'is_published' => true],
            ['slug' => 'services', 'title' => 'Services', 'content' => 'Services overview managed from admin panel.', 'is_published' => true],
            ['slug' => 'faq', 'title' => 'FAQ', 'content' => 'FAQ page content managed from admin panel.', 'is_published' => true],
            ['slug' => 'team', 'title' => 'Team', 'content' => 'Team page content managed from admin panel.', 'is_published' => true],
        ];
        foreach ($pages as $p) {
            Page::firstOrCreate(['slug' => $p['slug']], $p);
        }
    }
}
