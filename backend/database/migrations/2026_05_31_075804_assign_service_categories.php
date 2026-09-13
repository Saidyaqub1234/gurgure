<?php

use App\Models\Service;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Service::where('slug', 'strategic-management-advisory')->update(['category' => 'development']);
        Service::where('slug', 'creative-design-media')->update(['category' => 'branding']);
        Service::where('slug', 'digital-systems-software')->update(['category' => 'digital']);
        Service::where('slug', 'ict-infrastructure-consulting')->update(['category' => 'digital']);
        Service::where('slug', 'hosting-digital-infrastructure')->update(['category' => 'digital']);
        Service::where('slug', 'corporate-communication-presentation')->update(['category' => 'branding']);
        Service::where('slug', 'trainings-capacity-building')->update(['category' => 'training']);
        Service::where('slug', 'digital-marketing')->update(['category' => 'branding']);
    }

    public function down(): void
    {
        Service::query()->update(['category' => null]);
    }
};
