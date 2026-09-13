<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SoftwareProduct extends Model
{
    protected $fillable = [
        'slug', 'name', 'category', 'tagline', 'description', 'problem', 'solution',
        'features', 'screenshots', 'demo_url', 'pricing_mode', 'price', 'price_unit',
        'setup_fee', 'image', 'is_published', 'order', 'translations',
    ];

    protected $casts = [
        'features' => 'array',
        'screenshots' => 'array',
        'price' => 'float',
        'setup_fee' => 'float',
        'is_published' => 'boolean',
        'order' => 'integer',
        'translations' => 'array',
    ];

    public function toPublicArray(string $lang): array
    {
        $data = $this->toArray();
        if ($lang === 'en' || !in_array($lang, ['fa', 'ps'])) {
            return $data;
        }
        $translations = $this->translations;
        foreach (['name', 'tagline', 'description', 'problem', 'solution', 'category'] as $field) {
            $translated = $translations[$lang][$field] ?? null;
            if ($translated !== null && $translated !== '') {
                $data[$field] = $translated;
            }
        }
        return $data;
    }
}