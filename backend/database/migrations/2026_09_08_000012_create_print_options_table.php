<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->constrained('print_option_groups')->cascadeOnDelete();
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->string('price_type', 20)->default('none');
            $table->boolean('is_default')->default(false);
            $table->integer('order')->default(0);
            $table->json('translations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_options');
    }
};