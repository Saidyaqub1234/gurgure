<?php

namespace Database\Seeders;

use App\Models\SoftwareProduct;
use Illuminate\Database\Seeder;

class SoftwareProductsSeeder extends Seeder
{
    public function run(): void
    {
        $this->create([
            'slug' => 'gurgure-erp',
            'name' => 'GURGURE ERP',
            'category' => 'Business Systems',
            'tagline' => 'End-to-end enterprise resource planning for growing organizations.',
            'description' => 'A modular ERP platform covering financials, operations, inventory, procurement and reporting — configurable to the way your organization already works.',
            'problem' => 'Organizations manage operations across scattered spreadsheets, disconnected tools and paper records. Data is inconsistent, approvals are slow, and there is no single source of truth for decision making.',
            'solution' => 'GURGURE ERP unifies finance, inventory, procurement and HR in one secure system with role-based access, approval workflows and real-time reports — deployed, hosted and supported by GURGURE itself.',
            'features' => ['Accounting & financials', 'Inventory management', 'Procurement & purchase orders', 'Payroll & HR records', 'Approval workflows', 'Real-time dashboards & reports'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 1,
        ]);

        $this->create([
            'slug' => 'gurgure-crm',
            'name' => 'GURGURE CRM',
            'category' => 'Business Systems',
            'tagline' => 'Manage leads, customers and follow-ups in one place.',
            'description' => 'A customer relationship management system for tracking leads, managing pipelines, scheduling follow-ups and keeping every client interaction organized.',
            'problem' => 'Sales teams rely on memory, notebooks and personal devices to track leads, losing opportunities when communication slips through the cracks.',
            'solution' => 'GURGURE CRM gives every team a shared view of customers, pipelines, tasks and appointments — so no lead is forgotten and every follow-up is on time.',
            'features' => ['Lead & contact management', 'Sales pipeline stages', 'Task & follow-up reminders', 'Activity history', 'Team assignment', 'Basic reporting'],
            'demo_url' => null,
            'pricing_mode' => 'subscription',
            'price' => 500,
            'price_unit' => 'monthly',
            'setup_fee' => 150,
            'order' => 2,
        ]);

        $this->create([
            'slug' => 'gurgure-lms',
            'name' => 'GURGURE LMS',
            'category' => 'Education Systems',
            'tagline' => 'Learning management for training centers, universities and enterprises.',
            'description' => 'A learning management system with courses, lessons, assignments, assessments and certificates — built on GURGURE\'s proven LMS experience.',
            'problem' => 'Training providers struggle to deliver, track and certify learning at scale using manual registrations, paper tests and email attachments.',
            'solution' => 'GURGURE LMS digitizes the full learning cycle — enrollment, content delivery, quizzes, progress tracking and digital certificates — in one familiar platform.',
            'features' => ['Course & lesson management', 'Enrollment & student groups', 'Quizzes & assessments', 'Progress tracking', 'Digital certificates', 'Instructor & student dashboards'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 3,
        ]);

        $this->create([
            'slug' => 'gurgure-sis',
            'name' => 'GURGURE SIS',
            'category' => 'Education Systems',
            'tagline' => 'Student information and examination management for schools.',
            'description' => 'A student information system for registration, attendance, grading, examinations and report cards.',
            'problem' => 'Schools manage student records, attendance and results on paper, making it hard to track performance or produce consistent report cards.',
            'solution' => 'GURGURE SIS centralizes student data, attendance and exam scores, and generates standardized report cards and transcripts automatically.',
            'features' => ['Student registration & profiles', 'Class & section management', 'Attendance tracking', 'Examination & grading', 'Report cards & transcripts', 'Teacher access'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 4,
        ]);

        $this->create([
            'slug' => 'gurgure-mis-meal',
            'name' => 'GURGURE MIS / MEAL',
            'category' => 'Institutional Systems',
            'tagline' => 'Monitoring, evaluation and data management for NGOs and programs.',
            'description' => 'A management information system with MEAL workflows for projects, indicators, activity tracking, beneficiary data and donor reporting.',
            'problem' => 'NGOs and program teams scatter beneficiary records and indicator data across Excel files, making donor reporting slow and error-prone.',
            'solution' => 'GURGURE MIS/MEAL keeps projects, activities, beneficiaries and indicators in one database with clear data-entry forms and export-ready reports.',
            'features' => ['Project & activity tracking', 'Indicator & target management', 'Beneficiary database', 'Data entry forms', 'Donor report exports', 'User roles & permissions'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 5,
        ]);

        $this->create([
            'slug' => 'gurgure-ecommerce',
            'name' => 'GURGURE E-Commerce',
            'category' => 'Digital Platforms',
            'tagline' => 'Online stores and client portals for businesses.',
            'description' => 'A customizable e-commerce platform with product catalogs, cart, checkout and order tracking — ideal for retail businesses and service organizations.',
            'problem' => 'Businesses without a storefront struggle to sell online or give clients a place to browse products and track their orders.',
            'solution' => 'GURGURE E-Commerce delivers a branded online store with catalog management, customer accounts and order history, hosted and maintained by GURGURE.',
            'features' => ['Product catalog', 'Shopping cart & checkout', 'Customer accounts', 'Order tracking', 'Order management dashboard', 'Local payment flows'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 6,
        ]);

        $this->create([
            'slug' => 'gurgure-database-solutions',
            'name' => 'GURGURE Database Solutions',
            'category' => 'Database Solutions',
            'tagline' => 'Structured databases for employees, customers, projects, beneficiaries and research.',
            'description' => 'Tailored database systems designed around your data — from employee records to beneficiary registries and research data, with secure access and reporting.',
            'problem' => 'Organizations collect valuable data but cannot retrieve, analyze or secure it, because it lives in unstructured files and personal stores.',
            'solution' => 'GURGURE designs a structured database matching your exact fields, with controlled access, validation, search and the exports your team needs.',
            'features' => ['Custom schema design', 'Secure role-based access', 'Data validation & import', 'Search & filters', 'Excel/CSV exports', 'Ongoing hosting & support'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 7,
        ]);

        $this->create([
            'slug' => 'gurgure-portal',
            'name' => 'GURGURE Client & Membership Portals',
            'category' => 'Digital Platforms',
            'tagline' => 'Member, client and service portals that connect your organization with its audience.',
            'description' => 'Web portals for members, clients and service beneficiaries — with accounts, requests, documents and activity in one branded space.',
            'problem' => 'Organizations serve members and clients through email and phone, with no central way for them to view status, documents or their own activity.',
            'solution' => 'GURGURE Portals give each user a personal account to submit requests, view documents and track status — reducing staff workload and improving service.',
            'features' => ['User accounts & profiles', 'Request & service submission', 'Document upload & viewing', 'Status tracking', 'Admin management panel', 'Notifications'],
            'demo_url' => null,
            'pricing_mode' => 'quote',
            'price' => null,
            'price_unit' => null,
            'setup_fee' => 0,
            'order' => 8,
        ]);
    }

    protected function create(array $data): void
    {
        SoftwareProduct::firstOrCreate(['slug' => $data['slug']], $data);
    }
}