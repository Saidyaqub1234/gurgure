<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Testimonial extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'name', 'position', 'company', 'content', 'avatar', 'rating', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'is_published' => 'boolean',
        'rating' => 'integer',
    ];
}
