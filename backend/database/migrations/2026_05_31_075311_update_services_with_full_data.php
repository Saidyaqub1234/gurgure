<?php

use App\Models\Service;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $services = [
            [
                'slug' => 'strategic-management-advisory',
                'icon' => '📊',
                'description' => 'Strategic planning, business planning, feasibility studies, proposal development, and institutional assessments.',
                'items' => [
                    'Strategic planning & organizational development',
                    'Business planning & feasibility studies',
                    'Proposal development & technical narratives',
                    'Institutional assessments & roadmaps',
                    'Web & professional content writing',
                ],
            ],
            [
                'slug' => 'creative-design-media',
                'icon' => '🎨',
                'description' => 'Branding, visual identity, graphic design, photography, virtual tours, and media production.',
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
                'slug' => 'digital-systems-software',
                'icon' => '💻',
                'description' => 'Custom web platforms, LMS, database design, ERP solutions, and system integration.',
                'items' => [
                    'Website design & development',
                    'Learning Management Systems (LMS)',
                    'Database design & development',
                    'Custom system design & development',
                    'Enterprise Resource Planning (ERP) solutions',
                ],
            ],
            [
                'slug' => 'ict-infrastructure-consulting',
                'icon' => '🌐',
                'description' => 'Network design, system architecture, implementation, and enterprise-level infrastructure planning.',
                'items' => [
                    'LAN & WAN network design',
                    'ICT consulting & system architecture',
                    'Network implementation & optimization',
                    'Enterprise-level digital infrastructure planning',
                ],
            ],
            [
                'slug' => 'hosting-digital-infrastructure',
                'icon' => '☁️',
                'description' => 'Shared hosting, VPS solutions, server deployment, platform maintenance and support.',
                'items' => [
                    'Shared hosting & VPS solutions',
                    'Server deployment & management',
                    'Platform maintenance & support',
                ],
            ],
            [
                'slug' => 'corporate-communication-presentation',
                'icon' => '📋',
                'description' => 'Professional pitch decks, investor presentations, and visual storytelling for corporate communications.',
                'items' => [
                    'Corporate pitch development',
                    'Investor decks & presentations',
                    'Professional slide design & storytelling',
                ],
            ],
            [
                'slug' => 'trainings-capacity-building',
                'icon' => '📚',
                'description' => 'Leadership development, digital skills training, and institutional capacity building seminars.',
                'items' => [
                    'Leadership & management training programs',
                    'Digital skills & technology workshops',
                    'Institutional capacity building',
                    'Custom training curriculum development',
                    'Seminar & workshop facilitation',
                ],
            ],
            [
                'slug' => 'digital-marketing',
                'icon' => '📈',
                'description' => 'Strategic communication, social media management, SEO, and campaign management for digital growth.',
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

        foreach ($services as $data) {
            Service::where('slug', $data['slug'])->update([
                'icon' => $data['icon'],
                'description' => $data['description'],
                'items' => $data['items'],
            ]);
        }
    }

    public function down(): void
    {
        // No rollback needed
    }
};
