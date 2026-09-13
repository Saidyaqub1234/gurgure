<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Blog extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'title', 'slug', 'excerpt', 'content', 'image', 'author', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'is_published' => 'boolean',
    ];
}
