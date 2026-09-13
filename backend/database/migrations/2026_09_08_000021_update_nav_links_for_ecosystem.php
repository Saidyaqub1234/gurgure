<?php

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $navLinks = [
            ['path' => '/', 'label' => 'Home'],
            ['path' => '/solutions', 'label' => 'Solutions'],
            ['path' => '/services', 'label' => 'Services'],
            ['path' => '/software', 'label' => 'Software'],
            ['path' => '/marketplace', 'label' => 'Marketplace'],
            ['path' => '/ventures', 'label' => 'Ventures'],
            ['path' => '/portfolio', 'label' => 'Work'],
            ['path' => '/blog', 'label' => 'Insights'],
            ['path' => '/about', 'label' => 'About'],
            ['path' => '/contact', 'label' => 'Contact'],
            ['path' => '/portal', 'label' => 'My GURGURE'],
        ];

        Setting::set('nav_links', json_encode($navLinks));
    }

    public function down(): void
    {
        $navLinks = [
            ['path' => '/', 'label' => 'Home'],
            ['path' => '/about', 'label' => 'About'],
            ['path' => '/services', 'label' => 'Services'],
            ['path' => '/portfolio', 'label' => 'Portfolio'],
            ['path' => '/clients', 'label' => 'Clients'],
            ['path' => '/blog', 'label' => 'Insights'],
            ['path' => '/contact', 'label' => 'Contact'],
            ['path' => '/team', 'label' => 'Team'],
            ['path' => '/faq', 'label' => 'FAQ'],
        ];

        Setting::set('nav_links', json_encode($navLinks));
    }
};