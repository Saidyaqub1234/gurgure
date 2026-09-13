<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_option_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('print_products')->cascadeOnDelete();
            $table->string('name');
            $table->string('type', 20)->default('radio');
            $table->boolean('required')->default(false);
            $table->integer('order')->default(0);
            $table->json('translations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_option_groups');
    }
};