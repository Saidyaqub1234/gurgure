<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Project extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'title', 'slug', 'client', 'sector', 'service', 'challenge', 'solution', 'outcome',
        'image', 'images', 'order', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'images' => 'array',
        'is_published' => 'boolean',
    ];
}
