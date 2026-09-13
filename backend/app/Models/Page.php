<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Page extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'slug', 'title', 'content', 'sections', 'meta_title', 'meta_description', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'sections' => 'array',
        'is_published' => 'boolean',
    ];
}
