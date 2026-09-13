<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Package;
use App\Models\PackageItem;
use Illuminate\Database\Seeder;

class ServicePackageSeeder extends Seeder
{
    private $createdServices = 0;
    private $createdPackages = 0;
    private $createdItems = 0;
    private $skippedServices = 0;
    private $skippedPackages = 0;

    public function run(): void
    {
        $services = $this->getServiceDefinitions();

        foreach ($services as $serviceDef) {
            $this->seedService($serviceDef);
        }

        $this->printSummary();
    }

    private function getServiceDefinitions(): array
    {
        return [
            [
                'title' => 'Strategic Management & Advisory',
                'slug' => 'strategic-management-advisory',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 1500,
                        'delivery_time' => '30 days',
                        'items' => [
                            ['name' => 'Strategic Planning', 'description' => 'Basic strategic plan (3-year)', 'price' => 1500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Business Planning', 'description' => 'Standard business plan', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Feasibility Studies', 'description' => 'Basic feasibility assessment', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Proposal Writing', 'description' => 'Technical narrative only', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Market Research', 'description' => 'Secondary research only', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Financial Modeling', 'description' => '3-year projection', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Advisory Support', 'description' => '5 hours/month', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Annual Operating Plans', 'description' => 'Basic AOP', 'price' => 500, 'pricing_type' => 'fixed', 'is_optional' => true],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 3500,
                        'delivery_time' => '45 days',
                        'items' => [
                            ['name' => 'Strategic Planning', 'description' => 'Comprehensive strategic plan (5-year)', 'price' => 3500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Business Planning', 'description' => 'Detailed business plan with financials', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Feasibility Studies', 'description' => 'Comprehensive feasibility study', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Proposal Writing', 'description' => 'Technical narrative + budget outline', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Market Research', 'description' => 'Primary + secondary research', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Financial Modeling', 'description' => '5-year projection + sensitivity analysis', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Advisory Support', 'description' => '15 hours/month', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Annual Operating Plans', 'description' => 'Basic AOP included', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Included', 'description' => '1 workshop (2 days)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 7500,
                        'delivery_time' => '60 days',
                        'items' => [
                            ['name' => 'Strategic Planning', 'description' => 'Multi-department strategic plan + OKRs', 'price' => 7500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Business Planning', 'description' => 'Investor-ready business plan + pitch summary', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Feasibility Studies', 'description' => 'Full feasibility + risk analysis + mitigation', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Proposal Writing', 'description' => 'Full proposal package + donor mapping', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Market Research', 'description' => 'Full market research + competitor analysis', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Financial Modeling', 'description' => '5-year projection + scenario planning + valuation', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Advisory Support', 'description' => 'Dedicated strategic advisor (40 hours/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Annual Operating Plans', 'description' => 'Comprehensive AOP with bottom-up budgeting', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Included', 'description' => '3 workshops (5 days total)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Organizational Development', 'description' => 'Full OD plan + governance framework', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 15000,
                        'delivery_time' => '90 days',
                        'items' => [
                            ['name' => 'Strategic Planning', 'description' => 'Full organizational transformation roadmap', 'price' => 15000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Business Planning', 'description' => 'Complete business plan suite + ongoing advisory', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Feasibility Studies', 'description' => 'Feasibility + market entry strategy + execution plan', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Proposal Writing', 'description' => 'End-to-end proposal development + submission support', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Market Research', 'description' => 'Custom research + data analytics + insights dashboard', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Financial Modeling', 'description' => 'Custom financial model + investor-grade reporting', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Advisory Support', 'description' => 'On-call executive advisory (unlimited)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Annual Operating Plans', 'description' => 'Full AOP + quarterly monitoring + variance analysis', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Included', 'description' => 'Full capacity building program (10+ days)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Organizational Development', 'description' => 'Complete institutional transformation', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Creative Design & Media Solutions',
                'slug' => 'creative-design-media',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 800,
                        'delivery_time' => '14 days',
                        'items' => [
                            ['name' => 'Brand Audit', 'description' => 'Basic audit (internal only)', 'price' => 800, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Logo Design', 'description' => '2 initial concepts, 2 rounds of revision', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Identity', 'description' => 'Basic color palette + 2 fonts', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Brand Guidelines', 'description' => 'Basic 10-page PDF', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Collateral', 'description' => 'Business cards only', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Assets', 'description' => 'Profile images only', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 2000,
                        'delivery_time' => '21 days',
                        'items' => [
                            ['name' => 'Brand Audit', 'description' => 'Comprehensive audit + competitive analysis', 'price' => 2000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Logo Design', 'description' => '3 concepts, 3 revisions', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Identity', 'description' => 'Full color palette + typography system', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Brand Guidelines', 'description' => 'Comprehensive 25-page PDF', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Collateral', 'description' => 'Business cards + letterhead + envelope', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Assets', 'description' => 'Profile images + 5 post templates', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Graphic Design', 'description' => '15 designs/month', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 5000,
                        'delivery_time' => '35 days',
                        'items' => [
                            ['name' => 'Brand Audit', 'description' => 'Full brand audit + market positioning report', 'price' => 5000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Logo Design', 'description' => '5 concepts, 5 revisions + logo variations', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Identity', 'description' => 'Complete visual identity system + usage rules', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Brand Guidelines', 'description' => 'Full 50-page brand book (print + digital)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Collateral', 'description' => 'Full stationery set + email signatures + templates', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Assets', 'description' => 'Complete social media kit (20+ templates)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Graphic Design', 'description' => '30 designs/month', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Photography', 'description' => '2 day shoot (150 photos + editing)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Virtual Tours', 'description' => '1 virtual tour (up to 10 scenes)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Creative Campaigns', 'description' => '3 integrated campaigns', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 10000,
                        'delivery_time' => '50 days',
                        'items' => [
                            ['name' => 'Brand Audit', 'description' => 'Strategic brand audit + consumer insights + recommendations', 'price' => 10000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Logo Design', 'description' => 'Unlimited concepts, unlimited revisions + complete logo system', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Identity', 'description' => 'Enterprise visual identity + brand architecture', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Brand Guidelines', 'description' => 'Premium 100+ page brand bible + training videos', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Collateral', 'description' => 'Complete collateral suite + premium printing management', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Assets', 'description' => 'Full social media system + content calendar + monthly assets', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Graphic Design', 'description' => 'Unlimited designs + dedicated designer', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => '2D & 3D Design', 'description' => 'Full 3D visualization + animation', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Photography', 'description' => 'Multi-location shoot (300+ photos + retouching)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Virtual Tours', 'description' => '3 virtual tours + 360° product photography', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Creative Campaigns', 'description' => 'Full-year campaign (quarterly) + performance tracking', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Print Management', 'description' => 'Full print production + quality control + delivery', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Digital Systems & Software Development',
                'slug' => 'digital-systems-software',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 2500,
                        'delivery_time' => '35 days',
                        'items' => [
                            ['name' => 'Custom Website', 'description' => '5-page responsive website', 'price' => 2500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'MIS', 'description' => 'Basic MIS (single department)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'HR Management', 'description' => 'Employee directory only', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Finance System', 'description' => 'Basic income/expense tracking', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Design', 'description' => 'Single-table database', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'User Accounts', 'description' => 'Up to 50 users', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 6000,
                        'delivery_time' => '55 days',
                        'items' => [
                            ['name' => 'Custom Website', 'description' => '10-page website + basic CMS', 'price' => 6000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'MIS', 'description' => 'Multi-department MIS', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'ERP', 'description' => 'Basic ERP (2 modules)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'HR Management', 'description' => 'Employee directory + attendance + leave', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Finance System', 'description' => 'Full accounting + invoicing', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Procurement & Inventory', 'description' => 'Inventory + purchase orders', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Design', 'description' => 'Multi-table database (5-10 tables)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'User Accounts', 'description' => 'Up to 200 users', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Training', 'description' => '2-hour training session', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 15000,
                        'delivery_time' => '90 days',
                        'items' => [
                            ['name' => 'Custom Website', 'description' => '20-page website + advanced CMS + blog', 'price' => 15000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'MIS', 'description' => 'Full organizational MIS + reporting dashboard', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'ERP', 'description' => 'Full ERP (5+ modules)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'HR Management', 'description' => 'Full HRIS (recruitment, performance, payroll integration)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Finance System', 'description' => 'Complete finance suite + budgeting + donor compliance', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Procurement & Inventory', 'description' => 'Full procurement + inventory + supplier management', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'LMS', 'description' => 'Full LMS (students, grading, certificates)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Design', 'description' => 'Complex database (10-20 tables) + optimization', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Automation', 'description' => '15 automated workflows + approval chains', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'User Accounts', 'description' => 'Up to 1,000 users', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Training', 'description' => '2-day training program', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 35000,
                        'delivery_time' => '150 days',
                        'items' => [
                            ['name' => 'Custom Website', 'description' => 'Unlimited pages + custom CMS + e-commerce', 'price' => 35000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'MIS', 'description' => 'Enterprise MIS + predictive analytics + BI', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'ERP', 'description' => 'Custom enterprise ERP + API integrations', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'HR Management', 'description' => 'Enterprise HRIS + talent management + succession planning', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Finance System', 'description' => 'Enterprise finance + multi-currency + audit trail', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Procurement & Inventory', 'description' => 'Supply chain management + demand forecasting', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'LMS', 'description' => 'Enterprise LMS + gamification + analytics + SCORM', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Design', 'description' => 'Enterprise database + data warehousing + ETL', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Automation', 'description' => 'Full business process automation + RPA', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'System Integration', 'description' => 'Full ecosystem integration + custom APIs', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'User Accounts', 'description' => 'Unlimited users + role-based access control', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Training', 'description' => 'Full training + certification + ongoing support', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Support', 'description' => '24/7 dedicated support + SLA (1 year)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'ICT Infrastructure & Consulting',
                'slug' => 'ict-infrastructure-consulting',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 1200,
                        'delivery_time' => '10 days',
                        'items' => [
                            ['name' => 'Network Design', 'description' => 'Basic LAN design (single office)', 'price' => 1200, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Network Implementation', 'description' => 'Basic setup + configuration', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Wireless Infrastructure', 'description' => '1-3 access points', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Network Security', 'description' => 'Basic firewall configuration', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Server Deployment', 'description' => 'Single server (basic)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 3500,
                        'delivery_time' => '21 days',
                        'items' => [
                            ['name' => 'Network Design', 'description' => 'Multi-office LAN design', 'price' => 3500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Network Implementation', 'description' => 'Full implementation + testing', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Wireless Infrastructure', 'description' => '4-10 access points', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Network Security', 'description' => 'Advanced firewall + antivirus', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Server Deployment', 'description' => 'Multi-server (2-3 servers)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Cloud Integration', 'description' => 'Basic cloud backup', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'VPS Solutions', 'description' => '2 VPS (4GB RAM, 100GB each)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 10000,
                        'delivery_time' => '45 days',
                        'items' => [
                            ['name' => 'Network Design', 'description' => 'Full WAN design (multi-location)', 'price' => 10000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Network Implementation', 'description' => 'Implementation + optimization + documentation', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Wireless Infrastructure', 'description' => '11-25 access points', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Network Security', 'description' => 'Enterprise security + IDS/IPS + VPN', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Server Deployment', 'description' => 'Server cluster (4-10 servers)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Cloud Integration', 'description' => 'Hybrid cloud setup', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'VPS Solutions', 'description' => '3 VPS (8GB RAM, 200GB each)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Technical Support', 'description' => '24/7 support (1-hour response)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Disaster Recovery', 'description' => 'Daily backups + recovery plan', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 25000,
                        'delivery_time' => '70 days',
                        'items' => [
                            ['name' => 'Network Design', 'description' => 'Enterprise network architecture (unlimited sites)', 'price' => 25000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Network Implementation', 'description' => 'Turnkey implementation + certification + handover', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Wireless Infrastructure', 'description' => '25+ access points + mesh network', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Network Security', 'description' => 'Zero-trust architecture + SOC integration', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Server Deployment', 'description' => 'Enterprise data center + virtualization', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Cloud Integration', 'description' => 'Full cloud migration + multi-cloud strategy', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'VPS Solutions', 'description' => 'Custom cluster (16GB+ RAM per node)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Technical Support', 'description' => '24/7 dedicated team (15-min response, on-site available)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Security Audits', 'description' => 'Comprehensive audit + compliance certification', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Disaster Recovery', 'description' => 'Real-time replication + DR site', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Hosting & Digital Infrastructure',
                'slug' => 'hosting-digital-infrastructure',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 120,
                        'delivery_time' => '2 days',
                        'items' => [
                            ['name' => 'Hosting Type', 'description' => 'Shared Hosting', 'price' => 120, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Storage Space', 'description' => '5 GB', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Monthly Bandwidth', 'description' => '50 GB', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Email Accounts', 'description' => '5 accounts', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Support', 'description' => '1 database (MySQL)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Domain Registration', 'description' => '1 domain (.com/.af)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SSL Certificate', 'description' => 'Standard SSL', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Uptime Guarantee', 'description' => '99.5%', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 300,
                        'delivery_time' => '3 days',
                        'items' => [
                            ['name' => 'Hosting Type', 'description' => 'Enhanced Shared Hosting', 'price' => 300, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Storage Space', 'description' => '20 GB', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Monthly Bandwidth', 'description' => '200 GB', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Email Accounts', 'description' => '25 accounts', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Support', 'description' => '5 databases (MySQL)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Domain Registration', 'description' => '2 domains', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SSL Certificate', 'description' => 'Standard SSL', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Daily Backups', 'description' => 'Daily backups (7-day retention)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Uptime Guarantee', 'description' => '99.7%', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 800,
                        'delivery_time' => '5 days',
                        'items' => [
                            ['name' => 'Hosting Type', 'description' => 'VPS (Virtual Private Server)', 'price' => 800, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Storage Space', 'description' => '100 GB SSD', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Monthly Bandwidth', 'description' => '1 TB', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'CPU Cores', 'description' => '2 dedicated cores', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'RAM', 'description' => '4 GB dedicated', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Email Accounts', 'description' => 'Unlimited', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Support', 'description' => '10 databases (MySQL/PostgreSQL)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Domain Registration', 'description' => '5 domains', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SSL Certificate', 'description' => 'Wildcard SSL', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Daily Backups', 'description' => 'Daily backups (30-day retention)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Uptime Guarantee', 'description' => '99.9%', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Load Time', 'description' => '< 2 seconds', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'CDN', 'description' => 'Basic CDN', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 2000,
                        'delivery_time' => '7 days',
                        'items' => [
                            ['name' => 'Hosting Type', 'description' => 'Dedicated Server / Custom', 'price' => 2000, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Storage Space', 'description' => '500 GB+ NVMe SSD', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Monthly Bandwidth', 'description' => 'Unlimited (10+ TB)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'CPU Cores', 'description' => '8+ dedicated cores', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'RAM', 'description' => '32 GB+ dedicated', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Email Accounts', 'description' => 'Unlimited + enterprise mail', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Database Support', 'description' => 'Unlimited + optimization', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Domain Registration', 'description' => 'Unlimited domains', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SSL Certificate', 'description' => 'EV SSL + Extended Validation', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Daily Backups', 'description' => 'Real-time backups (90-day retention)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Uptime Guarantee', 'description' => '99.99% + SLA credits', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Load Time', 'description' => '< 1 second', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'CDN', 'description' => 'Global CDN + optimization', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Staging Environment', 'description' => 'Full staging + version control', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Corporate Communication & Presentation Design',
                'slug' => 'corporate-communication-presentation',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 300,
                        'delivery_time' => '5 days',
                        'items' => [
                            ['name' => 'Pitch Deck', 'description' => '5 slides (basic template)', 'price' => 300, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Company Profile', 'description' => '5-page PDF template', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Presentations', 'description' => 'Basic template (3 designs)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Revisions', 'description' => '2 rounds', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 800,
                        'delivery_time' => '8 days',
                        'items' => [
                            ['name' => 'Pitch Deck', 'description' => '10 slides (custom design)', 'price' => 800, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Investor Decks', 'description' => 'Basic investor deck', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Sales Decks', 'description' => '10-slide sales deck', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Company Profile', 'description' => '10-page custom design', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Presentations', 'description' => 'Custom template (5 designs)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Storytelling', 'description' => 'Custom infographics', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Revisions', 'description' => '3 rounds', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 2000,
                        'delivery_time' => '12 days',
                        'items' => [
                            ['name' => 'Pitch Deck', 'description' => '15-20 slides (fully custom)', 'price' => 2000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Investor Decks', 'description' => 'Comprehensive investor deck + financials', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Sales Decks', 'description' => '15-slide sales deck + case studies', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Company Profile', 'description' => '20-page comprehensive profile + infographics', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Presentations', 'description' => 'Full presentation system (10 templates)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Executive Materials', 'description' => 'Executive summary + board materials', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Storytelling', 'description' => 'Data visualization + narrative framework', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Revisions', 'description' => '5 rounds', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Training', 'description' => '1-day presentation skills workshop', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 5000,
                        'delivery_time' => '18 days',
                        'items' => [
                            ['name' => 'Pitch Deck', 'description' => '25+ slides (premium design + animation)', 'price' => 5000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Investor Decks', 'description' => 'Enterprise-grade investor deck + data room setup', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Sales Decks', 'description' => '20+ slide sales system + battle cards', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Company Profile', 'description' => '30+ page premium profile + interactive PDF', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Presentations', 'description' => 'Enterprise presentation suite (custom branding)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Executive Materials', 'description' => 'Complete executive communication package', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Visual Storytelling', 'description' => 'Premium visual storytelling + motion graphics', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Animation', 'description' => 'Advanced motion graphics + interactive elements', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Revisions', 'description' => 'Unlimited rounds', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Research Support', 'description' => 'Full research + custom data + messaging strategy', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training', 'description' => 'Executive coaching + speaker training', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 400,
                        'delivery_time' => '7 days',
                        'items' => [
                            ['name' => 'Digital Marketing Strategy', 'description' => 'Basic 1-page strategy', 'price' => 400, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Management', 'description' => '1 platform (5 posts/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Content Creation', 'description' => 'Basic graphics', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Branding', 'description' => 'Profile optimization', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SEO', 'description' => 'Basic on-page SEO', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 1000,
                        'delivery_time' => '14 days',
                        'items' => [
                            ['name' => 'Digital Marketing Strategy', 'description' => 'Comprehensive 10-page strategy', 'price' => 1000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Management', 'description' => '2 platforms (15 posts/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Content Creation', 'description' => 'Custom graphics + captions', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Branding', 'description' => 'Profile + cover images', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SEO', 'description' => 'On-page + keyword research', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Content Marketing', 'description' => '4 blog posts + newsletter', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Campaign Management', 'description' => '2 campaigns (1 month each)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 2500,
                        'delivery_time' => '30 days',
                        'items' => [
                            ['name' => 'Digital Marketing Strategy', 'description' => 'Full strategic roadmap + quarterly planning', 'price' => 2500, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Management', 'description' => '3 platforms (30 posts/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Content Creation', 'description' => 'Video content + blog posts', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Branding', 'description' => 'Complete social media identity', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SEO', 'description' => 'Full SEO (on-page + off-page + technical)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Content Marketing', 'description' => '8 blog posts + newsletter + lead magnets', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Campaign Management', 'description' => '4 campaigns (quarterly)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Paid Advertising', 'description' => 'Managed ads ($2,000/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Analytics & Reporting', 'description' => 'Weekly deep-dive + recommendations', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Community Management', 'description' => 'Active engagement + sentiment monitoring', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 6000,
                        'delivery_time' => '45 days',
                        'items' => [
                            ['name' => 'Digital Marketing Strategy', 'description' => 'Enterprise strategy + annual roadmap + KPIs', 'price' => 6000, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Management', 'description' => '4+ platforms (daily posts + stories + reels)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Content Creation', 'description' => 'Premium video + interactive content', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Social Media Branding', 'description' => 'Enterprise social media system', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'SEO', 'description' => 'Enterprise SEO + local SEO + analytics', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Content Marketing', 'description' => 'Weekly content + whitepapers + e-books', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Campaign Management', 'description' => '12 campaigns (year-round)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Paid Advertising', 'description' => 'Full-scale ads ($5,000+/month)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Email Marketing', 'description' => 'Full email marketing + segmentation + automation', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Analytics & Reporting', 'description' => 'Real-time dashboard + executive summary + ROI tracking', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Community Management', 'description' => '24/7 community management + crisis response', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Influencer Partnerships', 'description' => 'Full influencer program + management', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Corporate Messaging', 'description' => 'Brand voice guide + executive communications', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Competitor Analysis', 'description' => 'Continuous competitive intelligence', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Trainings & Capacity Building',
                'slug' => 'trainings-capacity-building',
                'packages' => [
                    [
                        'name' => 'Basic',
                        'level' => 'basic',
                        'description' => 'Basic (Standard)',
                        'base_price' => 500,
                        'delivery_time' => '5 days',
                        'items' => [
                            ['name' => 'Training Topics', 'description' => '1 topic (pre-selected)', 'price' => 500, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Program Duration', 'description' => '1 day (4-6 hours)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Participants', 'description' => 'Up to 10 participants', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Delivery Format', 'description' => 'On-site OR virtual', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Materials', 'description' => 'Basic handouts', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Certification', 'description' => 'Participation certificate', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Silver',
                        'level' => 'silver',
                        'description' => 'Silver (Economy)',
                        'base_price' => 1200,
                        'delivery_time' => '10 days',
                        'items' => [
                            ['name' => 'Training Topics', 'description' => '2 topics (customizable)', 'price' => 1200, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Program Duration', 'description' => '2 days (8-12 hours)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Participants', 'description' => 'Up to 20 participants', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Delivery Format', 'description' => 'On-site + virtual options', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Materials', 'description' => 'Digital workbooks', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Certification', 'description' => 'Completion certificate', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Assessment', 'description' => 'Pre/post assessment', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Follow-up Support', 'description' => '1-month email support', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Gold',
                        'level' => 'gold',
                        'description' => 'Gold (Enterprise)',
                        'base_price' => 3000,
                        'delivery_time' => '21 days',
                        'items' => [
                            ['name' => 'Training Topics', 'description' => '3-5 topics (fully customizable)', 'price' => 3000, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Program Duration', 'description' => '5 days (30+ hours)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Participants', 'description' => 'Up to 50 participants', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Delivery Format', 'description' => 'Blended (on-site + virtual + self-paced)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Materials', 'description' => 'Printed manuals + digital resources', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Certification', 'description' => 'Accredited certificate + digital badge', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Assessment', 'description' => 'Pre/post + skills testing + feedback', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Follow-up Support', 'description' => '3 months (2 coaching sessions)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Custom Curriculum', 'description' => 'Full curriculum design', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'LMS Access', 'description' => 'Basic LMS for materials', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                        ],
                    ],
                    [
                        'name' => 'Platinum',
                        'level' => 'platinum',
                        'description' => 'Platinum (Special)',
                        'base_price' => 8000,
                        'delivery_time' => '45 days',
                        'items' => [
                            ['name' => 'Training Topics', 'description' => 'Unlimited topics (tailored curriculum)', 'price' => 8000, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Program Duration', 'description' => '10+ days (comprehensive program)', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Participants', 'description' => '50+ participants (enterprise cohort)', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Delivery Format', 'description' => 'Fully customized delivery', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Training Materials', 'description' => 'Premium materials + learning portal', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Certification', 'description' => 'Professional certification + transcript', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Assessment', 'description' => 'Comprehensive assessment + competency mapping', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Follow-up Support', 'description' => '6 months (quarterly coaching + refresher)', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Custom Curriculum', 'description' => 'Enterprise learning journey design', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'LMS Access', 'description' => 'Full LMS with progress tracking', 'price' => 0, 'pricing_type' => 'monthly', 'is_optional' => false],
                            ['name' => 'Train-the-Trainer', 'description' => 'Full internal trainer certification', 'price' => 0, 'pricing_type' => 'per_unit', 'is_optional' => false],
                            ['name' => 'Needs Assessment', 'description' => 'Organizational learning audit', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                            ['name' => 'Post-training Report', 'description' => 'Strategic L&D roadmap', 'price' => 0, 'pricing_type' => 'fixed', 'is_optional' => false],
                        ],
                    ],
                ],
            ],
        ];
    }

    private function seedService(array $serviceDef): void
    {
        $service = Service::firstOrCreate(
            ['slug' => $serviceDef['slug']],
            [
                'title' => $serviceDef['title'],
            ]
        );

        if ($service->wasRecentlyCreated) {
            $this->createdServices++;
            echo "Created service: {$service->title} (ID: {$service->id})\n";
        } else {
            $this->skippedServices++;
            echo "Service already exists: {$service->title} (ID: {$service->id})\n";
        }

        foreach ($serviceDef['packages'] as $packageDef) {
            $this->seedPackage($service->id, $packageDef);
        }
    }

    private function seedPackage(int $serviceId, array $packageDef): void
    {
        $package = Package::firstOrCreate(
            [
                'service_id' => $serviceId,
                'level' => $packageDef['level'],
            ],
            [
                'name' => $packageDef['name'],
                'description' => $packageDef['description'],
                'base_price' => $packageDef['base_price'],
                'delivery_time' => $packageDef['delivery_time'],
            ]
        );

        if ($package->wasRecentlyCreated) {
            $this->createdPackages++;
            echo "  Created package: {$packageDef['name']} (ID: {$package->id})\n";
        } else {
            $this->skippedPackages++;
            echo "  Package already exists: {$packageDef['name']} (ID: {$package->id})\n";
        }

        foreach ($packageDef['items'] as $itemDef) {
            $this->seedPackageItem($package->id, $itemDef);
        }
    }

    private function seedPackageItem(int $packageId, array $itemDef): void
    {
        $item = PackageItem::firstOrCreate(
            [
                'package_id' => $packageId,
                'name' => $itemDef['name'],
            ],
            [
                'description' => $itemDef['description'] ?? null,
                'price' => $itemDef['price'],
                'pricing_type' => $itemDef['pricing_type'],
                'is_optional' => $itemDef['is_optional'],
                'quantity_enabled' => in_array($itemDef['pricing_type'], ['per_unit', 'monthly']),
            ]
        );

        if ($item->wasRecentlyCreated) {
            $this->createdItems++;
        }
    }

    private function printSummary(): void
    {
        echo "\n";
        echo "=== Service Package Seeder Summary ===\n";
        echo "Services created: {$this->createdServices} (skipped: {$this->skippedServices})\n";
        echo "Packages created: {$this->createdPackages} (skipped: {$this->skippedPackages})\n";
        echo "Package items created: {$this->createdItems}\n";
        echo "=====================================\n";
    }
}
