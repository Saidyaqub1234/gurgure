<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Client extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'name', 'slug', 'description', 'logo', 'website', 'sector', 'order', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'is_published' => 'boolean',
    ];
}
