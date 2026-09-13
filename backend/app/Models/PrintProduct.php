<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintProduct extends Model
{
    protected $fillable = [
        'slug', 'name', 'category', 'short_description', 'description', 'image',
        'price_mode', 'base_price', 'setup_cost', 'min_quantity', 'unit_label',
        'turnaround', 'is_published', 'order', 'translations',
    ];

    protected $casts = [
        'base_price' => 'float',
        'setup_cost' => 'float',
        'min_quantity' => 'integer',
        'order' => 'integer',
        'is_published' => 'boolean',
        'translations' => 'array',
    ];

    public function optionGroups()
    {
        return $this->hasMany(PrintOptionGroup::class, 'product_id')->orderBy('order');
    }

    public function priceRules()
    {
        return $this->hasMany(PrintPriceRule::class, 'product_id')->orderBy('min_qty');
    }

    protected function localizeProduct(?array $translations, string $lang): array
    {
        $data = $this->toArray();
        if ($lang === 'en' || !in_array($lang, ['fa', 'ps'])) {
            return $data;
        }
        foreach (['name', 'short_description', 'description', 'category', 'turnaround', 'unit_label'] as $field) {
            $translated = $translations[$lang][$field] ?? null;
            if ($translated !== null && $translated !== '') {
                $data[$field] = $translated;
            }
        }
        return $data;
    }

    public function toPublicArray(string $lang): array
    {
        $data = $this->localizeProduct($this->translations, $lang);
        $data['option_groups'] = $this->optionGroups->map(fn ($g) => $g->toPublicArray($lang))->values()->all();
        $data['price_rules'] = $this->priceRules;
        return $data;
    }
}