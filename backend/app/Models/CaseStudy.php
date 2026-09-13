<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;
use Illuminate\Support\Str;

class CaseStudy extends Model
{
    use HasTranslations;
    protected $table = 'case_studies';

    protected $fillable = [
        'translations',
        'client', 'slug', 'tag', 'challenge', 'solution', 'results', 'testimonial', 'order', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'results' => 'array',
        'is_published' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($caseStudy) {
            if (empty($caseStudy->slug)) {
                $caseStudy->slug = Str::slug($caseStudy->client);
            }
        });
    }
}
