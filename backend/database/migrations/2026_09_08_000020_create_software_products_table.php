<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('software_products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category')->index();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->json('features')->nullable();
            $table->json('screenshots')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('pricing_mode', 20)->default('quote')->index();
            $table->decimal('price', 12, 2)->nullable();
            $table->string('price_unit', 20)->nullable();
            $table->decimal('setup_fee', 12, 2)->default(0);
            $table->string('image')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('order')->default(0);
            $table->json('translations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('software_products');
    }
};