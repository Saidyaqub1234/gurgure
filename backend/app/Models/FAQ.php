<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class FAQ extends Model
{
    use HasTranslations;
    protected $table = 'faqs';

    protected $fillable = [
        'translations',
        'question', 'answer', 'category', 'order', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'is_published' => 'boolean',
    ];
}
