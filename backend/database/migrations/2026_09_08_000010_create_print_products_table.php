<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('category')->index();
            $table->string('short_description')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('price_mode', 20)->default('instant')->index();
            $table->decimal('base_price', 12, 2)->nullable();
            $table->decimal('setup_cost', 12, 2)->default(0);
            $table->integer('min_quantity')->default(1);
            $table->string('unit_label', 50)->nullable();
            $table->string('turnaround')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('order')->default(0);
            $table->json('translations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_products');
    }
};