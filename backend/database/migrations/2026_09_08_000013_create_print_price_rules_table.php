<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('print_price_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('print_products')->cascadeOnDelete();
            $table->integer('min_qty');
            $table->integer('max_qty')->nullable();
            $table->decimal('unit_price', 12, 2);
            $table->timestamps();

            $table->index(['product_id', 'min_qty']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('print_price_rules');
    }
};