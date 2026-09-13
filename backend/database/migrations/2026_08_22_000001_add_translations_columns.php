<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tables = [
            'services', 'projects', 'blogs', 'testimonials', 'clients',
            'team_members', 'faqs', 'case_studies', 'packages',
            'package_items', 'pages',
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && !Schema::hasColumn($table, 'translations')) {
                Schema::table($table, function (Blueprint $blueprint) {
                    $blueprint->json('translations')->nullable();
                });
            }
        }
    }

    public function down(): void
    {
        $tables = [
            'services', 'projects', 'blogs', 'testimonials', 'clients',
            'team_members', 'faqs', 'case_studies', 'packages',
            'package_items', 'pages',
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table) && Schema::hasColumn($table, 'translations')) {
                Schema::table($table, function (Blueprint $blueprint) {
                    $blueprint->dropColumn('translations');
                });
            }
        }
    }
};
